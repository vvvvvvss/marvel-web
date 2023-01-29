import { NextApiRequest, NextApiResponse } from 'next';
import { people } from '@marvel/web-utils';
import dbClient from 'apps/webapp/utils/dbConnector';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function profile_meta_edit(
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    //@ts-ignore
    const session = await unstable_getServerSession(req, res, authOptions);
    const incomingProfileData = req.body?.profile;

    //if session user is *not* CRDN or ADMIN
    const condition = !['CRDN', 'ADMIN'].some((e: any) =>
      session?.user?.scope?.includes(e)
    );

    //if session user is not admin and tring to add CRDN or ADMIN
    const condition2 =
      !session?.user?.scope?.includes('ADMIN') &&
      ['CRDN', 'ADMIN'].some((e: any) =>
        incomingProfileData?.scope?.includes(e)
      );

    if (condition || condition2)
      return res.json({ message: 'Access denied', status: '403' });

    await dbClient.people.update({
      where: {
        slug: incomingProfileData?.slug,
      },
      data: {
        scope: incomingProfileData?.scope,
      },
    });

    await res.revalidate(`/u/${incomingProfileData?.slug}`);
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
