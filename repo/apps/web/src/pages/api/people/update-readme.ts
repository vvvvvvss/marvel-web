import { NextApiRequest, NextApiResponse } from "next";
import { SANITIZE_OPTIONS } from "shared-utils";
import sanitize from "sanitize-html";
import dbClient from "../../../utils/dbConnector";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function profile_readMe_editor(
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    const slug = req.query?.slug;

    const condition =
      slug === session?.user?.slug ||
      session?.user?.scope?.map((s) => s.scope)?.includes("ADMIN");

    if (!condition) return res.status(403).json({ message: "Access denied" });

    const content = req.body?.content;
    const cleanContent = sanitize(content, SANITIZE_OPTIONS);

    await dbClient.people.update({
      where: {
        slug: slug as string,
      },
      data: {
        readMe: cleanContent,
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
