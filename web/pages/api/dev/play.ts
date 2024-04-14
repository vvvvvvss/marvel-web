import { NextApiRequest, NextApiResponse } from "next";
import dbClient from "../../../utils/dbConnector";
import {
  Article,
  ArticleToCourse,
  ArticleToPeople,
  Course,
  People,
  Report,
  Scope,
  Work,
} from "@prisma/client";
import { supabaseStorageClient } from "@marvel/ui/utils/supabaseStorageClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    return res.status(200).send({});
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
}
