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

    const existingReport = await dbClient.report.findFirst({
      where: {
        id: req.query?.id as string,
      },
      select: {
        id: true,
        workId: true,
        level: true,
        work: {
          select: {
            coordinators: true,
            courseCode: true,
            level: true,
            typeOfWork: true,
            totalLevels: true,
            pending: true,
            flagged: true,
          },
        },
      },
    });

    if (
      !existingReport?.id ||
      !existingReport?.work?.pending
        .map((i) => i.id)
        .includes(existingReport?.id)
    )
      return res.json({
        message:
          'That report does not exist or it is not supposed to be reviewed.',
        status: '400',
      });

    if (existingReport?.work?.typeOfWork === 'COURSE') {
      const condition =
        (session?.user?.scope?.includes('CRDN') &&
          session?.user?.crdnCourses?.includes(
            existingReport?.work?.courseCode
          )) ||
        session?.user?.scope?.includes('ADMIN');
      if (!condition) {
        return res.json({ status: 403, message: 'Access denied.' });
      }

      if (req.query?.type === 'approve') {
        await dbClient.work.update({
          where: {
            id: existingReport?.workId,
          },
          data: {
            level:
              existingReport?.work?.level === existingReport?.level
                ? existingReport?.level + 1
                : existingReport?.work?.level,
            pending: existingReport?.work?.pending?.filter(
              (i) => i.id !== existingReport?.id
            ),
          },
        });
      } else if (req.query?.type === 'feedback') {
        if (req.body?.content?.length > 500)
          return res.json({ staus: '400', message: 'Feedback too big.' });
        await dbClient.work.update({
          where: {
            id: existingReport?.workId,
          },
          data: {
            pending: existingReport?.work?.pending?.filter(
              (i) => i.id !== existingReport?.id
            ),
            flagged: {
              push: {
                id: existingReport?.id,
                level: existingReport?.level,
                feedback: req.body?.content,
              },
            },
          },
        });
      }
    } else if (existingReport?.work?.typeOfWork === 'PROJECT') {
    }

    await res.revalidate(
      `/coursework/${existingReport?.workId}${
        existingReport?.level === 1 ? '' : `/${existingReport?.level}`
      }`
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
