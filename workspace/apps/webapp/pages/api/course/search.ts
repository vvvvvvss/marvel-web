import { NextApiRequest, NextApiResponse } from 'next';
import dbClient from 'apps/webapp/utils/dbConnector';

export default async function (
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    const courses = await dbClient.course.findMany({
      where: {
        OR: [
          {
            courseCode: {
              contains: req?.query?.q as string,
            },
          },
          {
            caption: {
              contains: req?.query?.q as string,
            },
          },
        ],
      },
      select: {
        id: true,
        courseCode: true,
        caption: true,
        totalLevels: true,
        courseDuration: true,
      },
      take: 12,
      skip: Number(req?.query?.skip) || 0,
    });

    return res.json({
      data: courses,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Couldn't fetch course list",
      error: error?.message,
    });
  }
}
