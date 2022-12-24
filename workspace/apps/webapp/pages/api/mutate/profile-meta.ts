import { NextApiRequest, NextApiResponse } from 'next';
import { people } from '@marvel/web-utils';
import connectToDB from 'apps/webapp/utils/dbConnector';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function profile_meta_edit(
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    await connectToDB();
    //@ts-ignore
    const session = await unstable_getServerSession(req, res, authOptions);

    const condition =
      session?.user?.doIKnow === 'KNOWN' &&
      (session?.user?.scope?.includes('ADMIN') ||
        session?.user?.scope?.includes('DEV'));

    if (!condition)
      return res.json({ message: 'Access denied', status: '403' });

    const incomingProfileData = req.body?.profile;

    //@ts-ignore
    await people.findOneAndUpdate(
      { slug: incomingProfileData?.slug },
      {
        doIKnow: incomingProfileData?.doIKnow,
        scope: incomingProfileData?.scope,
      }
    );
    res.revalidate(`/u/${incomingProfileData?.slug}`);
    return res.json({
      status: 201,
      message: 'profile meta-data updated successfully',
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "Couldn't update profile meta-data.",
      error: error?.message,
    });
  }
}
