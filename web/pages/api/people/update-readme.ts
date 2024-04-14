import { NextApiRequest, NextApiResponse } from "next";
import { SANITIZE_OPTIONS } from "@marvel/ui/utils";
import sanitize from "sanitize-html";
import dbClient from "../../../utils/dbConnector";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { supabaseStorageClient } from "@marvel/ui/utils/supabaseStorageClient";

export default async function profile_readMe_editor(
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    const slug = req.query?.slug;

    const condition =
      slug === session?.user?.slug ||
      session?.user?.scope?.map((s) => s.scope)?.includes("ADMIN");

    if (!condition) return res.status(403).json({ message: "Access denied" });

    const content = req.body?.content;
    const cleanContent = sanitize(content, SANITIZE_OPTIONS);

    const filePath = `readme/${slug}.md`;
    await supabaseStorageClient.upload(
      filePath,
      new Blob([cleanContent], { type: "text/markdown" }),
      { upsert: true }
    );
    const readMeURL = await supabaseStorageClient.getPublicUrl(filePath);

    await dbClient.people.update({
      where: {
        slug: slug as string,
      },
      data: {
        readMe: readMeURL.data.publicUrl,
      },
    });

    await res.revalidate(`/u/${slug}`);
    return res.json({
      status: 201,
      message: "profile readMe updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Couldn't update profile readMe.",
      error: error?.message,
    });
  }
}
