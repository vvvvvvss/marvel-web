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
        People: {
          where: {
            AND: [{ role: 'AUTHOR' }, { status: 'ACTIVE' }],
          },
        },
        level: true,
        courseCode: true,
        id: true,
        typeOfWork: true,
      },
    });
    const senderIsActiveAuthor = work.People?.map((p) => p?.personId).includes(
      session?.user?.id
    );

    if (!senderIsActiveAuthor)
      return res.status(403).json({ message: 'Access denied' });

    const existingReport = await dbClient.report.findFirst({
      where: {
        AND: [{ level: work.level }, { workId: work.id }],
      },
      select: {
        id: true,
      },
    });

    if (existingReport?.id)
      return res.status(400).json({ message: 'Report already exists' });

    const cleanContent = sanitize(formData.content, SANITIZE_OPTIONS);

    if (formData?.title?.length > 60 || cleanContent?.length > 15_000) {
      return res.status(400).json({
        message: 'Invalid form data. too big.',
      });
    }

    const createdReport = await dbClient.report.create({
      data: {
        title: formData?.title,
        content: formData?.content,
        ...(work?.typeOfWork == 'COURSE' && { level: work?.level }),
        reviewStatus: 'PENDING',
        work: {
          connect: {
            id: work.id,
          },
        },
      },
      select: {
        id: true,
        level: true,
      },
    });

    await res.revalidate(
      `/work/${work.id}/${createdReport?.level == 1 ? '' : createdReport?.id}`
    );
    return res.json({
      status: 201,
      message: `level report created successfully`,
      report: createdReport,
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
