import { NextApiRequest, NextApiResponse } from 'next';
import { people, SANITIZE_OPTIONS } from '@marvel/web-utils';
import sanitize from 'sanitize-html';
import connectToDB from 'apps/webapp/utils/dbConnector';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function profile_readMe_editor(
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    await connectToDB();
    //@ts-ignore
    const session = await unstable_getServerSession(req, res, authOptions);
    const slug = req.body?.slug;

    const condition =
      req.body?.slug === session?.user?.slug ||
      session?.user?.scope?.includes('ADMIN');

    if (!condition)
      return res.json({ message: 'Access denied', status: '403' });

    const content = req.body?.content;
    const cleanContent = sanitize(content, SANITIZE_OPTIONS);
    //@ts-ignore
    await people.findOneAndUpdate(
      { slug: slug },
      {
        readMe: cleanContent,
      }
    );
    await res.revalidate(`/u/${slug}`);
    return res.json({
      status: 201,
      message: 'profile readMe updated successfully',
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "Couldn't update profile readMe.",
      error: error?.message,
    });
  }
}
