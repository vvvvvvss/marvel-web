import { NextApiRequest, NextApiResponse } from 'next';
import dbClient from 'apps/webapp/utils/dbConnector';

export default async function (
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    const people = await dbClient.people.findMany({
      where: {
        AND: [
          {
            name: {
              contains: req?.query?.q as string,
            },
          },
          {
            scope: {
              some: {
                scope: 'PROFILE',
              },
            },
          },
        ],
      },
      select: {
        name: true,
        slug: true,
        profilePic: true,
        id: true,
      },
      take: Number(req?.query?.limit) || 10,
    });

    return res.json({
      people: people,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Couldn't fetch people list",
      error: error?.message,
    });
  }
}
