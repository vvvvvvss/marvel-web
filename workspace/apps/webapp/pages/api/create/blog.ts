import { NextApiRequest, NextApiResponse } from 'next';
import { SANITIZE_OPTIONS, blogPost } from '@marvel/web-utils';
import sanitize from 'sanitize-html';
import connectToDB from 'apps/webapp/utils/dbConnector';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { v2 as cloudinary } from 'cloudinary';

export default async function create_blogpost(
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    await connectToDB();
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

    const content = formData.content;
    const cleanContent = sanitize(content, SANITIZE_OPTIONS);

    const newBlogPost = new blogPost({
      authorId: session.user.id,
      authorName: session.user.name,
      authorSlug: session.user.slug,
      authorImage: session.user.profilePic,
      title: formData.title,
      tags: formData.tags,
      content: cleanContent,
      reviewStatus: `${
        session.user.scope?.includes('CRDN') ||
        session.user.scope?.includes('ADMIN')
          ? 'APPROVED'
          : 'PENDING'
      }`,
      feedback: '',
    });

    if (formData?.coverPhoto) {
      newBlogPost.coverPhoto = (
        await cloudinary.uploader.upload(formData.coverPhoto, {
          resource_type: 'image',
          public_id: `blog/${newBlogPost?._id}`,
          overwrite: true,
          secure: true,
        })
      ).secure_url;
    }

    const createdPost = await newBlogPost.save();

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
