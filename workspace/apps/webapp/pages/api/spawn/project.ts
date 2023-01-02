import { NextApiRequest, NextApiResponse } from 'next';
import { projectWork, people } from '@marvel/web-utils';
import connectToDB from 'apps/webapp/utils/dbConnector';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function spawn_new_course(
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    await connectToDB();
    //@ts-ignore
    const session = await unstable_getServerSession(req, res, authOptions);
    const formData = req.body?.formData;

    //if session user is *not* CRDN or ADMIN
    const condition = !['CRDN', 'ADMIN'].some((e: any) =>
      session?.user?.scope?.includes(e)
    );

    if (condition) return res.json({ message: 'Access denied', status: '403' });

    const author = await people
      //@ts-ignore
      .findOne({ slug: formData?.authorSlug })
      .select('-_id id slug name profilePic')
      .lean();

    if (!author || !formData?.projectName?.trim())
      return res.json({ status: '404', message: 'Something went wrong.' });
    //@ts-ignore
    const work = new projectWork({
      authors: [
        {
          id: author?.id,
          slug: author?.slug,
          name: author?.name,
          profilePic: author?.profilePic,
          roleType: 'WRITER',
        },
      ],
      name: formData?.projectName,
      displayName: formData?.projectName,
      coordinators: [
        {
          id: session?.user?.id,
          slug: session?.user?.slug,
          name: session?.user?.name,
          profilePic: session?.user?.profilePic,
        },
      ],
    });
    await work.save();
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
