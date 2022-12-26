import { NextApiRequest, NextApiResponse } from 'next';
import { course } from '@marvel/web-utils';
import connectToDB from 'apps/webapp/utils/dbConnector';

export default async function (
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    await connectToDB();

    const courseList = await course
      //@ts-ignore
      .find({})
      .select('-_id domainName courseCode totalLevels caption')
      .lean()
      .exec();

    return res.json({
      courseList: courseList,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "Couldn't fetch course list",
      error: error?.message,
    });
  }
}
