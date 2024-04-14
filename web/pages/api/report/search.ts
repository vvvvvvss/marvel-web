import { NextApiRequest, NextApiResponse } from "next";
import dbClient from "../../../utils/dbConnector";
import { ReviewStatus } from "@prisma/client";

export default async function (
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    const reports = await dbClient.report.findMany({
      where: {
        AND: [
          ...(req?.query?.q
            ? [
                {
                  title: {
                    contains: req?.query?.q as string,
                  },
                },
              ]
            : []),
          ...(req?.query?.reviewStatus
            ? [
                {
                  reviewStatus: req?.query?.reviewStatus as ReviewStatus,
                },
              ]
            : []),
        ],
      },
      select: {
        id: true,
        title: true,
        isOverview: true,
        workId: true,
        createdAt: true,
      },
      take: 12,
      skip: Number(req?.query?.skip) || 0,
    });

    return res.json({
      data: reports,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Couldn't fetch report list",
      error: error?.message,
    });
  }
}
