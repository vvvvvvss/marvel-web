import { NextApiRequest, NextApiResponse } from "next";
import dbClient from "../../../utils/dbConnector";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { v2 as cloudinary } from "cloudinary";
import { WorkFormData } from "../../../types";

export default async function edit_meta(
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    cloudinary.config({
      cloud_name: process.env.CLDNRY_CLOUD_NAME,
      api_key: process.env.CLDNRY_API_KEY,
      api_secret: process.env.CLDNRY_API_SECRET,
      secure: true,
    });
    const session = await getServerSession(req, res, authOptions);
    const formData: WorkFormData & { totalLevels?: number } = req.body;

    if (
      formData?.name?.length > 60 ||
      (formData?.note && formData?.note?.length > 200)
    ) {
      return res.status(400).json({
        message: "Invalid form data.",
      });
    }

    const work = await dbClient.work.findUnique({
      where: {
        id: req?.query?.workId as string,
      },
      select: {
        coverPhoto: true,
        id: true,
        typeOfWork: true,
        People: {
          where: {
            status: "ACTIVE",
          },
          select: {
            personId: true,
          },
        },
        _count: {
          select: {
            Reports: true,
          },
        },
      },
    });

    const condition =
      (work?.typeOfWork === "COURSE" &&
        session?.user?.scope?.map((s) => s.scope)?.includes("CRDN")) ||
      (work?.typeOfWork === "PROJECT" &&
        work?.People?.map((p) => p.personId)?.includes(
          session?.user?.id as string
        )) ||
      session?.user?.scope?.map((s) => s.scope).includes("ADMIN");
    if (!condition) {
      return res.status(403).json({ message: "Access denied." });
    }

    let coverPhoto: string | null;
    if (formData?.coverPhoto && formData?.coverPhoto !== work?.coverPhoto) {
      coverPhoto = (
        await cloudinary.uploader.upload(formData?.coverPhoto as string, {
          public_id: work?.id,
          folder: "work_covers",
          resource_type: "image",
          overwrite: true,
          secure: true,
        })
      ).secure_url;
    } else if (
      (!formData?.coverPhoto || formData?.coverPhoto == "") &&
      (work?.coverPhoto || work?.coverPhoto !== "")
    ) {
      await cloudinary.uploader.destroy(`work_covers/${work?.id}`);
      coverPhoto = null;
    } else {
      coverPhoto = work?.coverPhoto as string;
    }

    if (
      work?.typeOfWork == "COURSE" &&
      formData?.totalLevels &&
      (formData?.totalLevels > 6 ||
        formData?.totalLevels < work?._count?.Reports)
    ) {
      return res
        .status(400)
        .json({
          message:
            "Invalid number of levels. Either it's too large or less than the number of existing reports.",
        });
    }

    await dbClient?.work?.update({
      where: {
        id: work?.id,
      },
      data: {
        coverPhoto: coverPhoto,
        name: formData?.name,
        note: formData?.note,
        ...(work?.typeOfWork == "COURSE"
          ? { totalLevels: Number(formData?.totalLevels) }
          : {}),
      },
    });

    await res.revalidate(`/work/${work?.id}`);
    return res.status(201).json({
      message: "meta data updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Couldn't update meta data`,
      error: error?.message,
    });
  }
}
