import { NextApiRequest, NextApiResponse } from "next";
import { SANITIZE_OPTIONS } from "@marvel/ui/utils";
import sanitize from "sanitize-html";
import dbClient from "../../../utils/dbConnector";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { v2 as cloudinary } from "cloudinary";
import { ArticleFormData } from "../../../types";
import { supabaseStorageClient } from "@marvel/ui/utils/supabaseStorageClient";

export default async function edit_article(
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
    const formData: ArticleFormData = req.body;
    const existingArticle = await dbClient.article.findUnique({
      where: {
        id: req?.query?.id as string,
      },
      select: {
        id: true,
        title: true,
        typeOfArticle: true,
        coverPhoto: true,
        Courses: {
          select: { courseId: true },
        },
        People: {
          select: {
            personId: true,
          },
        },
      },
    });

    const condition =
      existingArticle?.People?.map((p) => p.personId)?.includes(
        session?.user?.id as string
      ) || session?.user?.scope?.map((s) => s?.scope)?.includes("ADMIN");

    if (!condition) return res.status(403).json({ message: "Access denied" });

    const cleanContent = sanitize(formData.content, SANITIZE_OPTIONS);

    if (formData?.title?.length >= 60 || cleanContent?.length >= 15_000) {
      return res.status(400).json({
        message: "Invalid form data.",
      });
    }

    let coverPhoto: string | null;
    if (
      formData?.coverPhoto &&
      formData?.coverPhoto !== existingArticle?.coverPhoto
    ) {
      coverPhoto = (
        await cloudinary.uploader.upload(formData?.coverPhoto as string, {
          public_id: existingArticle?.id,
          folder: "article_covers",
          resource_type: "image",
          overwrite: true,
          secure: true,
        })
      ).secure_url;
    } else if (
      (!formData?.coverPhoto || formData?.coverPhoto == "") &&
      (!existingArticle?.coverPhoto || existingArticle?.coverPhoto !== "")
    ) {
      await cloudinary.uploader.destroy(
        `article_covers/${existingArticle?.id}`
      );
      coverPhoto = null;
    } else {
      coverPhoto = existingArticle?.coverPhoto as string;
    }

    let coursesToAdd: string[] = [];
    let coursesToDelete: string[] = [];
    if (existingArticle?.typeOfArticle === "RESOURCE") {
      const oldListOfCourses = existingArticle?.Courses?.map(
        (c) => c?.courseId
      );
      const newListOfCourses = formData?.courseIds;
      coursesToAdd =
        newListOfCourses?.filter((c) => !oldListOfCourses?.includes(c)) || [];
      coursesToDelete =
        oldListOfCourses?.filter((c) => !newListOfCourses?.includes(c)) || [];
    }

    const filePath = `article/${existingArticle?.id}.md`;
    await supabaseStorageClient.upload(
      filePath,
      new Blob([cleanContent], { type: "text/markdown" }),
      { upsert: true }
    );
    await dbClient.article.update({
      where: {
        id: existingArticle?.id,
      },
      data: {
        title: formData?.title,
        caption: formData?.caption,
        coverPhoto: coverPhoto,
        reviewStatus: "PENDING",
        ...(existingArticle?.typeOfArticle === "RESOURCE"
          ? {
              Courses: {
                create: coursesToAdd?.map((c) => ({ courseId: c })),
                delete: coursesToDelete?.map((c) => ({
                  articleId_courseId: {
                    articleId: existingArticle?.id,
                    courseId: c,
                  },
                })),
              },
            }
          : null),
        feedback: "",
      },
    });

    await res.revalidate(`/article/${existingArticle?.id}`);
    if (formData?.title !== existingArticle?.title) {
      await res.revalidate(`/u/${session?.user?.slug}/writings`);
    }
    return res.status(201).json({
      message: `${existingArticle?.typeOfArticle} post updated successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Couldn't update article`,
      error: error?.message,
    });
  }
}
