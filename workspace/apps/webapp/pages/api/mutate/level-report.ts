import { NextApiRequest, NextApiResponse } from 'next';
import { SANITIZE_OPTIONS } from '@marvel/web-utils';
import sanitize from 'sanitize-html';
import dbClient from 'apps/webapp/utils/dbConnector';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function create_level_report(
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    const formData = req.body.formData;

    const existingReport = await dbClient.report.findFirst({
      where: {
        id: req.query?.reportId as string,
      },
      select: {
        id: true,
        workId: true,
        title: true,
        level: true,
      },
    });

    if (!existingReport?.id)
      return res.json({ message: 'That report does not exist', status: '400' });

    const work = await dbClient.work.findFirst({
      where: {
        id: existingReport.workId,
      },
      select: {
        authors: true,
        level: true,
        courseCode: true,
        id: true,
        pending: true,
        flagged: true,
      },
    });
    const senderIsWriter =
      work.authors.find((a) => a.role === 'WRITER').googleId ===
      session.user.googleId;

    if (!senderIsWriter)
      return res.json({ message: 'Access denied', status: '403' });

    const cleanContent = sanitize(formData.content, SANITIZE_OPTIONS);

    if (formData?.title?.length > 60 || cleanContent?.length > 15_000) {
      return res.json({
        status: 403,
        message: 'Invalid form data. too big.',
      });
    }

    await dbClient.report.update({
      where: {
        id: existingReport.id,
      },
      data: {
        title: formData?.title,
        content: formData?.content,
      },
    });

    if (existingReport.title !== formData?.title) {
      await dbClient.work.update({
        where: {
          id: work.id,
        },
        data: {
          searchTerms: {
            push: formData?.title,
          },
          flagged: work?.flagged?.filter((r) => r?.id !== existingReport?.id),
          pending: work?.pending?.some((r) => r?.id === existingReport?.id)
            ? work?.pending
            : [
                ...work?.pending,
                { id: existingReport?.id, level: existingReport?.level },
              ],
        },
      });
    }

    await res.revalidate(
      `/coursework/${work.id}${work?.level === 1 ? '' : `/${work.level}`}`
    );
    return res.json({
      status: 201,
      message: `level report updated successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: `Couldn't updated level report`,
      error: error?.message,
    });
  }
}
