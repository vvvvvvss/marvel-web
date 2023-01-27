import { NextApiRequest, NextApiResponse } from 'next';
import { resourceArticle, SANITIZE_OPTIONS } from '@marvel/web-utils';
import sanitize from 'sanitize-html';
import dbClient from 'apps/webapp/utils/dbConnector';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { v2 as cloudinary } from 'cloudinary';

export default async function create_rsa(
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
    //@ts-ignore
    const session = await unstable_getServerSession(req, res, authOptions);
    const formData = req.body.formData;

    const condition = session?.user?.scope?.includes('R_WRITER');

    if (!condition)
      return res.json({ message: 'Access denied', status: '403' });

    const cleanContent = sanitize(formData.content, SANITIZE_OPTIONS);

    if (
      formData?.title?.length >= 60 ||
      cleanContent?.length >= 15_000 ||
      formData?.tags?.length >= 10 ||
      !formData?.courseCodes?.length
    ) {
      return res.json({
        status: 403,
        message: 'Invalid form data.',
      });
    }

    // const newRSA = await dbClient.article.create({
    //   data:{
    //     typeOfArticle:"RESOURCE",

    //   }
    // })

    // const newRSA = new resourceArticle({
    //   authorId: session.user.id,
    //   authorName: session.user.name,
    //   authorSlug: session.user.slug,
    //   authorImage: session.user.profilePic,
    //   title: formData.title,
    //   tags: formData.tags,
    //   content: cleanContent,
    //   courseCodes: formData.courseCodes,
    //   reviewStatus: `${
    //     session.user.scope?.includes('CRDN') ||
    //     session.user.scope?.includes('ADMIN')
    //       ? 'APPROVED'
    //       : 'PENDING'
    //   }`,
    //   feedback: '',
    // });

    // if (formData.coverPhoto) {
    //   newRSA.coverPhoto = (
    //     await cloudinary.uploader.upload(formData.coverPhoto, {
    //       resource_type: 'image',
    //       public_id: `rsa/${newRSA?._id}`,
    //       overwrite: true,
    //       secure: true,
    //     })
    //   ).secure_url;
    // }

    // const createdPost = await newRSA.save();

    await res.revalidate(`/u/${session?.user?.slug}/writings`);
    return res.json({
      status: 201,
      message: 'rsa created successfully',
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "Couldn't create rsa",
      error: error?.message,
    });
  }
}
