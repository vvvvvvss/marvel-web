import { NextApiRequest, NextApiResponse } from "next";
import dbClient from "../../../utils/dbConnector";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { ScopeEnum } from "database";

export default async function delete_event(
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    const condition = ["ADMIN", "CRDN"].some((s) =>
      session?.user?.scope?.map((s) => s.scope)?.includes(s as ScopeEnum)
    );

    if (!condition) return res.status(403).json({ message: "Access denied" });

    const existingEvent = await dbClient.event.findUnique({
      where: {
        id: req?.query?.id as string,
      },
      select: {
        id: true,
      },
    });

    if (!existingEvent)
      return res.json({ message: "Couldn't delete because it doesnt exist." });

    await dbClient.event.delete({
      where: {
        id: existingEvent?.id,
      },
    });

    return res.status(201).json({
      message: `deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Couldn't delete event`,
      error: error?.message,
    });
  }
}
