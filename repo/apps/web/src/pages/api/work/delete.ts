import { NextApiRequest, NextApiResponse } from "next";
import dbClient from "../../../utils/dbConnector";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { v2 as cloudinary } from "cloudinary";
import { WorkFormData } from "../../../types";

export default async function delete_work(
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    const work = await dbClient.work.findUnique({
      where: {
        id: req?.query?.id as string,
      },
      select: {
        id: true,
        typeOfWork: true,
        People: {
          select: {
            person: {
              select: {
                slug: true,
              },
            },
            personId: true,
            status: true,
          },
        },
      },
    });

    const condition =
      work?.People?.filter((p) => p?.status === "ACTIVE")
        ?.map((p) => p.personId)
        ?.includes(session?.user?.id as string) ||
      session?.user?.scope?.map((s) => s.scope).includes("ADMIN");
    if (!condition) {
      return res.status(403).json({ message: "Access denied." });
    }

    await dbClient?.report?.deleteMany({
      where: {
        workId: work?.id,
      },
    });
    await dbClient.peopleOnWork?.deleteMany({
      where: {
        workId: work?.id,
      },
    });
    await dbClient?.work?.delete({
      where: {
        id: work?.id,
      },
    });

    await Promise.all(
      work?.People?.map((p) => res.revalidate(`/u/${p?.person?.slug}/works`))
    );
    return res.status(201).json({
      message: "deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Couldn't delete`,
      error: error?.message,
    });
  }
}
