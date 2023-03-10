import { NextApiRequest, NextApiResponse } from "next";
import dbClient from "../../../utils/dbConnector";
import { People, ReviewStatus, ScopeEnum, TypeOfWork } from "database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).send("Error");
  }
}
