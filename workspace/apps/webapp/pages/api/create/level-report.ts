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

    const work = await dbClient.work.findFirst({
      where: {
        id: req.query?.workId as string,
      },
      select: {
        authors: true,
        level: true,
        courseCode: true,
        id: true,
      },
    });
    const senderIsWriter =
      work.authors.find((a) => a.role === 'WRITER').googleId ===
      session.user.googleId;

    if (!senderIsWriter)
      return res.json({ message: 'Access denied', status: '403' });

    const existingReport = await dbClient.report.findFirst({
      where: {
        AND: [{ level: work.level }, { workId: work.id }],
      },
      select: {
        id: true,
      },
    });

    if (existingReport?.id)
      return res.json({ message: 'Report already exists', status: '400' });

    const cleanContent = sanitize(formData.content, SANITIZE_OPTIONS);

    if (formData?.title?.length > 60 || cleanContent?.length > 15_000) {
      return res.json({
        status: 403,
        message: 'Invalid form data. too big.',
      });
    }

    const createdReport = await dbClient.report.create({
      data: {
        title: formData?.title,
        content: formData?.content,
        level: work?.level,
        workId: work.id,
      },
      select: {
        id: true,
        level: true,
      },
    });

    await dbClient.work.update({
      where: {
        id: work.id,
      },
      data: {
        searchTerms: {
          push: formData?.title,
        },
        pending: {
          push: {
            id: createdReport.id,
            level: createdReport.level,
          },
        },
      },
    });

    await res.revalidate(
      `/coursework/${work.id}${work?.level === 1 ? '' : `/${work.level}`}`
    );
    return res.json({
      status: 201,
      message: `level report created successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: `Couldn't create level report`,
      error: error?.message,
    });
  }
}
