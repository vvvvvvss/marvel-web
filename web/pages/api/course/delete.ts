import { NextApiRequest, NextApiResponse } from "next";
import dbClient from "../../../utils/dbConnector";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { v2 as cloudinary } from "cloudinary";

export default async function delete_article(
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
    const existingCourse = await dbClient.course.findUnique({
      where: {
        id: req?.query?.id as string,
      },
      select: {
        id: true,
        courseCode: true,
        coverPhoto: true,
      },
    });

    if (!existingCourse)
      return res.json({ message: "Couldn't delete because it doesnt exist." });
    const condition = session?.user?.scope
      ?.map((s) => s?.scope)
      ?.includes("ADMIN");

    if (!condition) return res.status(403).json({ message: "Access denied" });

    await dbClient.articleToCourse.deleteMany({
      where: {
        courseId: existingCourse?.id,
      },
    });

    await dbClient.course.delete({
      where: {
        id: req?.query?.id as string,
      },
    });

    if (existingCourse?.coverPhoto) {
      await cloudinary.uploader.destroy(`course_covers/${existingCourse?.id}`);
    }
    await res.revalidate("/courses");

    return res.status(201).json({
      message: `deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Couldn't delete course`,
      error: error?.message,
    });
  }
}
