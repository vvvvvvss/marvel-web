import { NextApiRequest, NextApiResponse } from "next";
import { SANITIZE_OPTIONS } from "@marvel/ui/utils";
import sanitize from "sanitize-html";
import dbClient from "../../../utils/dbConnector";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { ReviewStatus } from "@prisma/client";
import { supabaseStorageClient } from "@marvel/ui/utils/supabaseStorageClient";

export default async function create_level_report(
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    const formData = req.body.formData;

    const work = await dbClient.work.findFirst({
      where: {
        id: req.query?.workId as string,
      },
      select: {
        People: {
          where: {
            AND: [{ role: "AUTHOR" }, { status: "ACTIVE" }],
          },
        },
        courseCode: true,
        id: true,
        typeOfWork: true,
        totalLevels: true,
        Reports: {
          select: {
            reviewStatus: true,
          },
        },
      },
    });
    const senderIsActiveAuthor = work?.People?.map((p) => p?.personId).includes(
      session?.user?.id as string
    );

    if (!senderIsActiveAuthor)
      return res.status(403).json({ message: "Access denied" });

    if (
      work?.typeOfWork === "COURSE" &&
      work?.Reports?.length + 1 > Number(work?.totalLevels)
    ) {
      return res.status(400).json({
        message: "All the reports are already written",
      });
    }

    if (
      ["PENDING", "FLAGGED"].some((e: ReviewStatus) =>
        work?.Reports?.map((r) => r?.reviewStatus).includes(e)
      )
    ) {
      return res.status(400).json({
        message: "Check if all the previous reports are approved already",
      });
    }
    const cleanContent = sanitize(formData.content, SANITIZE_OPTIONS);

    if (formData?.title?.length > 60 || cleanContent?.length > 15_000) {
      return res.status(400).json({
        message: "Invalid form data. too big.",
      });
    }

    const createdReport = await dbClient.report.create({
      data: {
        title: formData?.title,
        content: "",
        reviewStatus: "PENDING",
        isOverview: work?.Reports?.length === 0 ? true : false,
        work: {
          connect: {
            id: work?.id,
          },
        },
      },
      select: {
        id: true,
        isOverview: true,
      },
    });

    const filePath = `report/${
      work?.typeOfWork == "PROJECT" ? "project" : work?.courseCode
    }/${createdReport?.id}.md`;
    await supabaseStorageClient.upload(
      filePath,
      new Blob([cleanContent], { type: "text/markdown" })
    );
    const uploadedFileURL = await supabaseStorageClient.getPublicUrl(filePath);

    await dbClient.report.update({
      where: {
        id: createdReport?.id,
      },
      data: {
        content: uploadedFileURL?.data.publicUrl,
      },
    });

    await res.revalidate(
      `/work/${work?.id}/${createdReport?.isOverview ? "" : createdReport?.id}`
    );
    return res.json({
      status: 201,
      message: `level report created successfully`,
      reportId: createdReport?.isOverview ? "" : createdReport?.id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: `Couldn't create level report`,
      error: error?.message,
    });
  }
}
