import { NextApiRequest, NextApiResponse } from "next";
import dbClient from "../../../utils/dbConnector";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { ScopeEnum } from "database";

export default async function manage_scope(
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);

    //if session user is *not* CRDN or ADMIN
    const condition = !["CRDN", "ADMIN"].some((e: any) =>
      session?.user?.scope?.map((s) => s.scope)?.includes(e)
    );

    //if session user is not admin and tring to add or remove CRDN or ADMIN
    const condition2 =
      !session?.user?.scope?.map((s) => s.scope)?.includes("ADMIN") &&
      ["CRDN", "ADMIN"].includes(req.query?.scope as string);
    if (condition || condition2)
      return res.status(403).json({ message: "access denied" });

    const person = await dbClient.people.findUnique({
      where: {
        slug: req?.query?.slug as string,
      },
      select: {
        id: true,
        slug: true,
      },
    });

    if (req?.query?.action === "add") {
      await dbClient.people.update({
        where: {
          id: person?.id,
        },
        data: {
          scope: {
            connectOrCreate: {
              where: {
                personId_scope: {
                  personId: person?.id as string,
                  scope: req.query?.scope as ScopeEnum,
                },
              },
              create: {
                scope: req.query?.scope as ScopeEnum,
              },
            },
          },
        },
      });
    } else if (req.query?.action === "remove") {
      await dbClient.people.update({
        where: {
          id: person?.id,
        },
        data: {
          scope: {
            delete: {
              personId_scope: {
                personId: person?.id as string,
                scope: req?.query?.scope as ScopeEnum,
              },
            },
          },
        },
      });
    } else {
      return res.status(400).json({ message: "invalid action" });
    }

    await res.revalidate(`/u/${person?.slug}`);
    return res.json({
      status: 201,
      message: "profile meta-data updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
