import { NextApiRequest, NextApiResponse } from 'next';
import { course } from '@marvel/web-utils';
import dbClient from 'apps/webapp/utils/dbConnector';

export default async function (
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    const work = await dbClient.work.findFirst({
      where: {
        id: req.query?.id as string,
      },
      select: {
        authors: {
          select: {
            googleId: true,
            name: true,
            role: true,
            slug: true,
          },
        },
        coordinators: {
          select: {
            googleId: true,
            name: true,
            role: true,
            slug: true,
          },
        },
        courseCode: true,
        id: true,
        level: true,
        name: true,
        totalLevels: true,
        typeOfWork: true,
      },
    });

    return res.json({
      work: work,
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
