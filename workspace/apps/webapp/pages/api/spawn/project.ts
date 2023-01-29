import { NextApiRequest, NextApiResponse } from 'next';
import dbClient from 'apps/webapp/utils/dbConnector';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function spawn_new_course(
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    const formData = req.body?.formData;

    //if session user is *not* CRDN or ADMIN
    const condition = !['CRDN', 'ADMIN'].some((e: any) =>
      session?.user?.scope?.includes(e)
    );

    if (condition) return res.json({ message: 'Access denied', status: '403' });

    const author = await dbClient.people.findUnique({
      where: {
        slug: formData?.slug,
      },
      select: {
        googleId: true,
        slug: true,
        name: true,
        profilePic: true,
      },
    });

    if (!author || !formData?.projectName?.trim())
      return res.json({ status: '404', message: 'Something went wrong.' });

    await dbClient.work.create({
      data: {
        typeOfWork: 'PROJECT',
        name: formData?.projectName,
        authors: [
          {
            googleId: author.googleId,
            slug: author.slug,
            name: author.name,
            profilePic: author.profilePic,
            role: 'WRITER',
          },
        ],
        coordinators: [
          {
            googleId: session.user.googleId,
            slug: session.user.slug,
            name: session.user.name,
            profilePic: session.user.profilePic,
          },
        ],
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
