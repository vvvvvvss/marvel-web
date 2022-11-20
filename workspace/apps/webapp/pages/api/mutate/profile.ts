import { NextApiRequest, NextApiResponse } from 'next';
import { people, SANITIZE_OPTIONS } from '@marvel/web-utils';
import sanitize from 'sanitize-html';
import connectToDB from 'apps/webapp/utils/dbConnector';

export default async function personHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToDB();
    const slug = req.body?.slug;
    const content = req.body?.content;
    const cleanContent = sanitize(content, SANITIZE_OPTIONS);
    //@ts-ignore
    await people.findOneAndUpdate(
      { slug: slug },
      {
        readMe: cleanContent,
      }
    );
    res.revalidate(`/u/${slug}`);
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
