import { NextApiRequest, NextApiResponse } from 'next';
import dbClient from 'apps/webapp/utils/dbConnector';

export default async function (
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    const works = await dbClient.work.findMany({
      where: {
        OR: [
          {
            name: {
              contains: req?.query?.q as string,
            },
          },
          {
            courseCode: {
              contains: req?.query?.q as string,
            },
          },
        ],
      },
      select: {
        name: true,
        id: true,
        courseCode: true,
        typeOfWork: true,
        People: {
          select: {
            person: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      take: 12,
      skip: Number(req?.query?.skip) || 0,
    });

    return res.json({
      data: works,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Couldn't fetch work list",
      error: error?.message,
    });
  }
}
