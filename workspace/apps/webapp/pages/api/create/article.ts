import { NextApiRequest, NextApiResponse } from 'next';
import { SANITIZE_OPTIONS, blogPost } from '@marvel/web-utils';
import sanitize from 'sanitize-html';
import dbClient from 'apps/webapp/utils/dbConnector';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { v2 as cloudinary } from 'cloudinary';
import { TypeOfArticle } from '@prisma/client';

export default async function create_article(
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  const typeOfArticle: TypeOfArticle | undefined =
    (req.query.type as string).toLowerCase() === 'resource'
      ? 'RESOURCE'
      : (req.query.type as string).toLowerCase() === 'blog'
      ? 'BLOG'
      : undefined;

  try {
    cloudinary.config({
      cloud_name: process.env.CLDNRY_CLOUD_NAME,
      api_key: process.env.CLDNRY_API_KEY,
      api_secret: process.env.CLDNRY_API_SECRET,
      secure: true,
    });

    const session = await unstable_getServerSession(req, res, authOptions);
    const formData = req.body.formData;

    const condition = session?.user?.scope?.includes('WRITER');

    if (!condition)
      return res.json({ message: 'Access denied', status: '403' });

    const cleanContent = sanitize(formData.content, SANITIZE_OPTIONS);

    if (
      formData?.title?.length >= 60 ||
      cleanContent?.length >= 15_000 ||
      formData?.tags?.length >= 10
    ) {
      return res.json({
        status: 403,
        message: 'Invalid form data.',
      });
    }

    let coverPhoto: string;
    if (formData?.coverPhoto) {
      coverPhoto = (
        await cloudinary.uploader.upload(formData.coverPhoto, {
          resource_type: 'image',
          overwrite: true,
          secure: true,
        })
      ).secure_url;
    }

    await dbClient.article.create({
      data: {
        typeOfArticle: 'BLOG',
        title: formData?.title,
        coverPhoto: coverPhoto,
        tags: formData?.tags,
        content: cleanContent,
        reviewStatus:
          session.user.scope?.includes('CRDN') ||
          session.user.scope?.includes('ADMIN')
            ? 'APPROVED'
            : 'PENDING',
        author: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    await res.revalidate(`/u/${session?.user?.slug}/writings`);
    return res.json({
      status: 201,
      message: 'Blog post created successfully',
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "Couldn't create blogpost",
      error: error?.message,
    });
  }
}
