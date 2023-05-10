import { NextApiRequest, NextApiResponse } from "next";
import { SANITIZE_OPTIONS } from "shared-utils";
import sanitize from "sanitize-html";
import dbClient from "../../../utils/dbConnector";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function create_level_report(
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    const formData = req.body.formData;

    const existingReport = await dbClient.report.findFirst({
      where: {
        id: req.query?.id as string,
      },
      select: {
        id: true,
        workId: true,
        title: true,
        isOverview: true,
        work: {
          select: {
            People: {
              where: {
                status: "ACTIVE",
              },
              select: {
                personId: true,
                role: true,
                status: true,
              },
            },
          },
        },
      },
    });

    if (!existingReport?.id)
      return res.status(400).json({ message: "That report does not exist" });

    //sender should either be an admin or active member in the work
    const condition =
      session?.user?.scope?.map((s) => s.scope).includes("ADMIN") ||
      existingReport?.work?.People?.map((p) => p.personId).includes(
        session?.user?.id as string
      );

    if (!condition) return res.status(403).json({ message: "Access denied" });

    const cleanContent = sanitize(formData.content, SANITIZE_OPTIONS);

    if (formData?.title?.length > 60 || cleanContent?.length > 15_000) {
      return res.status(400).json({
        status: 403,
        message: "Invalid form data. too big.",
      });
    }

    await dbClient.report.update({
      where: {
        id: existingReport.id,
      },
      data: {
        title: formData?.title,
        content: formData?.content,
        reviewStatus: "PENDING",
      },
    });

    await res.revalidate(
      `/work/${existingReport?.workId}${
        existingReport?.isOverview ? "" : `/${existingReport?.id}`
      }`
    );

    return res.status(201).json({
      message: `level report updated successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Couldn't updated level report`,
      error: error?.message,
    });
  }
}
