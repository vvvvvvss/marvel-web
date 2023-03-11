import { NextApiRequest, NextApiResponse } from 'next';
import dbClient from 'apps/webapp/utils/dbConnector';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function level_report_action(
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);

    const existingArticle = await dbClient.article.findFirst({
      where: {
        id: req.query?.id as string,
      },
      select: {
        id: true,
        reviewStatus: true,
        feedback: true,
      },
    });

    if (!existingArticle?.id || existingArticle?.reviewStatus !== 'PENDING')
      return res.status(400).json({
        message:
          'That article does not exist or it is not supposed to be reviewed.',
      });

    const condition =
      session?.user?.scope?.map((s) => s.scope).includes('CRDN') ||
      session?.user?.scope?.map((s) => s.scope)?.includes('ADMIN');
    if (!condition) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    if (req.query?.action === 'approve') {
      await dbClient.article.update({
        where: {
          id: existingArticle?.id,
        },
        data: {
          reviewStatus: 'APPROVED',
          feedback: '',
        },
      });
    } else if (req.query?.action === 'feedback') {
      if (req.body?.content?.length > 500)
        return res.status(400).json({ message: 'Feedback too big.' });
      // mark as flagged and put feedback
      await dbClient.article.update({
        where: {
          id: existingArticle?.id,
        },
        data: {
          reviewStatus: 'FLAGGED',
          feedback: req?.body?.content,
        },
      });
    }

    await res.revalidate(`/article/${existingArticle?.id}`);

    return res.status(201).json({
      message: `article reviewed successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Couldn't review level report`,
      error: error?.message,
    });
  }
}
