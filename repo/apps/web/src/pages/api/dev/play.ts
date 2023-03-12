import { NextApiRequest, NextApiResponse } from "next";
import dbClient from "../../../utils/dbConnector";
import fileSystem from "fs";
import {
  Article,
  ArticleToCourse,
  ArticleToPeople,
  Course,
  People,
  Report,
  Scope,
  Work,
} from "database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
}
