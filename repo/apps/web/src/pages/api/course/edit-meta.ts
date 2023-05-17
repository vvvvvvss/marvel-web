import { NextApiRequest, NextApiResponse } from "next";
import dbClient from "../../../utils/dbConnector";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { v2 as cloudinary } from "cloudinary";
import { CourseFormData } from "../../../types";
import { ScopeEnum } from "database";

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
    const formData: CourseFormData = req.body;

    if (formData?.caption && formData?.caption?.length > 200) {
      return res.status(400).json({
        message: "Invalid form data.",
      });
    }

    const course = await dbClient.course.findUnique({
      where: {
        id: req?.query?.courseId as string,
      },
      select: {
        coverPhoto: true,
        id: true,
        courseCode: true,
      },
    });

    const condition = ["ADMIN", "CRDN"]?.some((s: ScopeEnum) =>
      session?.user?.scope?.map((s) => s?.scope)?.includes(s)
    );

    if (!condition) {
      return res.status(403).json({ message: "Access denied." });
    }

    let coverPhoto: string | null;
    if (formData?.coverPhoto && formData?.coverPhoto !== course?.coverPhoto) {
      coverPhoto = (
        await cloudinary.uploader.upload(formData?.coverPhoto as string, {
          public_id: course?.id,
          folder: "course_covers",
          resource_type: "image",
          overwrite: true,
          secure: true,
        })
      ).secure_url;
    } else if (
      (!formData?.coverPhoto || formData?.coverPhoto == "") &&
      (course?.coverPhoto || course?.coverPhoto !== "")
    ) {
      await cloudinary.uploader.destroy(`course_covers/${course?.id}`);
      coverPhoto = null;
    } else {
      coverPhoto = course?.coverPhoto as string;
    }

    await dbClient?.course?.update({
      where: {
        id: course?.id,
      },
      data: {
        coverPhoto: coverPhoto,
        caption: formData?.caption,
        courseDuration: formData?.courseDuration,
        repoURL: formData?.repoURL,
      },
    });

    await Promise.all([
      res.revalidate(`/course/${course?.courseCode}`),
      res.revalidate(`/courses`),
    ]);

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
