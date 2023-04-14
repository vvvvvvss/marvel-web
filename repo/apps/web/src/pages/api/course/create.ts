import { NextApiRequest, NextApiResponse } from "next";
import dbClient from "../../../utils/dbConnector";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { v2 as cloudinary } from "cloudinary";
import { CourseFormData } from "../../../types";
import axios from "axios";

export default async function create_course(
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

    const condition = session?.user?.scope
      ?.map((s) => s.scope)
      .includes("ADMIN");

    if (!condition) {
      return res.status(403).json({ message: "Access denied." });
    }

    const repoName = formData?.repoURL?.slice(
      formData?.repoURL.search("github.com") + 11 //number of chars in github.com + 1
    );
    const owner = repoName?.split("/")?.[0];
    const repo = repoName?.split("/")?.[1];
    const filesMetaData: any = (
      await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/contents/`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_PAT}`,
          },
        }
      )
    ).data;
    const levels = filesMetaData?.filter((e) =>
      /^LEVEL\d+\.md$/.test(e?.["path"])
    );

    const createdCourse = await dbClient?.course?.create({
      data: {
        courseCode: formData?.courseCode,
        caption: formData?.caption,
        courseDuration: formData?.courseDuration,
        repoURL: formData?.repoURL,
        totalLevels: levels?.length,
      },
      select: {
        id: true,
      },
    });

    let coverPhoto: string | null;
    if (formData?.coverPhoto && formData?.coverPhoto !== "") {
      coverPhoto = (
        await cloudinary.uploader.upload(formData?.coverPhoto as string, {
          public_id: createdCourse?.id,
          folder: "course_covers",
          resource_type: "image",
          overwrite: true,
          secure: true,
        })
      ).secure_url;
      await dbClient.course.update({
        where: {
          id: createdCourse?.id,
        },
        data: {
          coverPhoto: coverPhoto,
        },
      });
    }

    await res.revalidate("/courses");

    return res.status(201).json({
      message: "created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Couldn't create`,
      error: error?.message,
    });
  }
}
