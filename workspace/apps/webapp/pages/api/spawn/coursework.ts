import { NextApiRequest, NextApiResponse } from 'next';
import { courseWork, people, course } from '@marvel/web-utils';
import dbClient from 'apps/webapp/utils/dbConnector';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function spawn_new_course(
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    //@ts-ignore
    const session = await unstable_getServerSession(req, res, authOptions);
    const formData = req.body?.formData;

    //if session user is *not* CRDN or ADMIN
    const condition = !['CRDN', 'ADMIN'].some((e: any) =>
      session?.user?.scope?.includes(e)
    );

    if (condition) return res.json({ message: 'Access denied', status: '403' });

    const author = await dbClient.people.findFirst({
      where: {
        slug: formData.authorSlug,
      },
      select: {
        googleId: true,
        slug: true,
        name: true,
        profilePic: true,
      },
    });

    const courseInQuestion = await dbClient.course.findFirst({
      where: {
        courseCode: formData?.selectedCourse,
      },
      select: {
        totalLevels: true,
        courseCode: true,
      },
    });

    if (!author || !courseInQuestion)
      return res.json({ status: '404', message: 'Something went wrong.' });

    const newWork = await dbClient.work.create({
      data: {
        typeOfWork: 'COURSE',
        authors: [
          {
            googleId: author.googleId,
            slug: author.slug,
            name: author.name,
            profilePic: author.profilePic,
            role: 'WRITER',
          },
        ],
        totalLevels: courseInQuestion?.totalLevels,
        courseCode: courseInQuestion.courseCode,
      },
    });

    await res.revalidate(`/u/${formData?.authorSlug}/works`);
    return res.json({
      status: 200,
      message: 'work created successfully',
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: 'Something went wrong',
      error: error?.message,
    });
  }
}
