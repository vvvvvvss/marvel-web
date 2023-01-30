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
              mode: 'insensitive',
            },
          },
          {
            scope: {
              has: 'PROFILE',
            },
          },
        ],
      },
      select: {
        name: true,
        slug: true,
        googleId: true,
        profilePic: true,
      },
      take: 10,
    });

    return res.json({
      people: people,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "Couldn't fetch people list",
      error: error?.message,
    });
  }
}
