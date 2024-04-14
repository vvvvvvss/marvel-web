import { NextApiRequest, NextApiResponse } from "next";
import dbClient from "../../../utils/dbConnector";
import { ScopeEnum } from "@prisma/client";

export default async function (
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    console.log(req.query);
    const people = await dbClient.people.findMany({
      where: {
        AND: [
          ...(req?.query?.q
            ? [
                {
                  name: {
                    contains: req?.query?.q as string,
                  },
                },
              ]
            : []),
          ...(req?.query?.scope
            ? [
                {
                  scope: {
                    some: {
                      OR: [
                        ...(req?.query?.scope as string)
                          ?.split(",")
                          ?.map((s) => ({
                            scope: s as ScopeEnum,
                          })),
                      ],
                    },
                  },
                },
              ]
            : []),
        ],
      },
      select: {
        name: true,
        slug: true,
        profilePic: true,
        id: true,
        scope: {
          where: {
            OR: [{ scope: "CRDN" }, { scope: "ADMIN" }],
          },
        },
      },
      take: 12,
      skip: Number(req?.query?.skip) || 0,
    });

    return res.json({
      data: people,
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
