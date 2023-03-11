import { NextApiRequest, NextApiResponse } from "next";
import dbClient from "../../../utils/dbConnector";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // await dbClient.peopleOnWork.deleteMany({
    //   where: {
    //     work: {
    //       Reports: {
    //         none: {},
    //       },
    //     },
    //   },
    // });
    // await dbClient.work.deleteMany({
    //   where: {
    //     Reports: {
    //       none: {},
    //     },
    //   },
    // });

    return res.json({ data: "successs" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
}
