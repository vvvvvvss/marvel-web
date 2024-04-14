import { NextApiRequest, NextApiResponse } from "next";
import dbClient from "../../../utils/dbConnector";

export default async function (
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    const events = await dbClient.event.findMany({
      where: {
        AND: [
          ...(req?.query?.q?.toString()?.trim()
            ? [
                {
                  OR: [
                    {
                      title: {
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
              ]
            : []),
        ],
      },
      select: {
        id: true,
        title: true,
        typeOfEvent: true,
        caption: true,
        coverPhoto: true,
        eventStartTime: true,
        eventEndTime: true,
        registrationStartTime: true,
        registrationEndTime: true,
      },
      take: 12,
      skip: Number(req?.query?.skip) || 0,
    });

    return res.json({
      data: events,
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
