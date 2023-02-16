import { NextApiRequest, NextApiResponse } from 'next';
import dbClient from 'apps/webapp/utils/dbConnector';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { TypeOfWork } from '@prisma/client';

type FormData = {
  selectedCourse?: string;
  projectName?: string;
  authorSlug?: string;
};

export default async function spawn_new_work(
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    const sessionUser = (await unstable_getServerSession(req, res, authOptions))
      .user;
    const formData: FormData = req.body?.formData;
    const type: TypeOfWork = req.query?.type as TypeOfWork;

    console.log(formData);
    //if session user is *not* CRDN or ADMIN
    const condition = !['CRDN', 'ADMIN'].some((e: any) =>
      sessionUser?.scope?.map((s) => s.scope)?.includes(e)
    );

    if (condition) return res.status(403).json({ message: 'Access denied' });

    const author = await dbClient.people.findFirst({
      where: {
        slug: formData?.authorSlug,
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!author) return res.status(400).json({ message: 'Invalid request' });

    let course: { totalLevels: number };
    if (type == 'COURSE') {
      course = await dbClient.course.findUnique({
        where: {
          courseCode: formData?.selectedCourse,
        },
        select: {
          totalLevels: true,
        },
      });
      if (!course) {
        return res.status(400).json({ message: 'invalid course selection' });
      }
    }
    if (type == 'PROJECT' && !formData?.projectName)
      return res.status(400).json({ message: 'Invalid request' });

    await dbClient.work.create({
      data: {
        typeOfWork: type,
        ...(type === 'COURSE' && {
          course: {
            connect: {
              courseCode: formData?.selectedCourse,
            },
          },
          totalLevels: course.totalLevels,
          searchTerms: author.name + ' ' + formData?.selectedCourse,
        }),
        ...(type === 'PROJECT' && {
          name: formData?.projectName,
          searchTerms: author.name + ' ' + formData?.projectName,
        }),
        People: {
          create: [
            {
              person: {
                connect: {
                  id: author.id,
                },
              },
              role: 'AUTHOR',
              status: 'ACTIVE',
            },
            {
              person: {
                connect: {
                  id: sessionUser?.id,
                },
              },
              role: 'COORDINATOR',
            },
          ],
        },
      },
    });

    await res.revalidate(`/u/${formData?.authorSlug}/works`);
    return res.json({
      status: 200,
      message: 'work created successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Something went wrong',
      error: error?.message,
    });
  }
}
