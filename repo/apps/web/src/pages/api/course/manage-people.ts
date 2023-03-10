import { NextApiRequest, NextApiResponse } from 'next';
import dbClient from '../../../utils/dbConnector';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

type Args = {
  action: 'add-person' | 'remove-person';
  personId: string;
};

export default async function level_report_action(
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    const args: Args = req?.body;

    const course = await dbClient.course.findUnique({
      where: {
        id: req.query?.courseId as string,
      },
      select: {
        id: true,
        courseCode: true,
        Coordinators: {
          select: {
            personId: true,
          },
        },
      },
    });

    const condition =
      course?.Coordinators?.map((p) => p.personId).includes(
        session?.user?.id as string
      ) || session?.user?.scope?.map((s) => s.scope).includes('ADMIN');

    if (!condition) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    if (args?.action === 'add-person') {
      await dbClient.course.update({
        where: {
          id: course?.id,
        },
        data: {
          Coordinators: {
            create: {
              person: {
                connect: {
                  id: args?.personId,
                },
              },
            },
          },
        },
      });
    } else if (args?.action === 'remove-person') {
      await dbClient.course.update({
        where: {
          id: course?.id,
        },
        data: {
          Coordinators: {
            delete: {
              courseId_personId: {
                courseId: course?.id as string,
                personId: args?.personId,
              },
            },
          },
        },
      });
    }
    //revalidate the page
    await res.revalidate(`/course/${course?.courseCode}`);

    return res.status(201).json({
      message: `updated successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Couldn't update`,
      error: error?.message,
    });
  }
}
