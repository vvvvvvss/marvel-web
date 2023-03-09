import { NextApiRequest, NextApiResponse } from 'next';
import dbClient from '../../../utils/dbConnector';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

type Action = 'approve' | 'feedback';

export default async function level_report_action(
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);

    const action: Action = req?.query?.action as Action;
    const existingReport = await dbClient.report.findFirst({
      where: {
        id: req.query?.id as string,
      },
      select: {
        id: true,
        workId: true,
        reviewStatus: true,
        feedback: true,
        isOverview: true,
        work: {
          select: {
            typeOfWork: true,
            People: {
              where: {
                AND: [{ role: 'COORDINATOR' }, { status: 'ACTIVE' }],
              },
              select: {
                personId: true,
                role: true,
                status: true,
              },
            },
          },
        },
      },
    });

    if (!existingReport?.id || existingReport?.reviewStatus !== 'PENDING')
      return res.status(400).json({
        message:
          'That report does not exist or it is not supposed to be reviewed.',
      });

    const condition =
      //work is project and session user is one of the coordinators
      (existingReport?.work?.typeOfWork === 'PROJECT' &&
        existingReport?.work?.People.map((p) => p?.personId).includes(
          session?.user?.id as string
        )) ||
      //work is coursework and session user is a coordinator
      (existingReport?.work?.typeOfWork === 'COURSE' &&
        session?.user?.scope?.map((s) => s.scope).includes('CRDN')) ||
      //session user is an admin
      session?.user?.scope?.map((s) => s.scope)?.includes('ADMIN');
    if (!condition) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    if (action === 'approve') {
      await dbClient.report.update({
        where: {
          id: existingReport?.id,
        },
        data: {
          reviewStatus: 'APPROVED',
          feedback: '',
        },
      });
    } else if (action === 'feedback') {
      if (req.body?.content?.length > 500)
        return res.status(400).json({ message: 'Feedback too big.' });
      // mark as flagged and put feedback
      await dbClient.report.update({
        where: {
          id: existingReport?.id,
        },
        data: {
          reviewStatus: 'FLAGGED',
          feedback: req?.body?.content,
        },
      });
    }

    //revalidate the page
    await res.revalidate(
      `/work/${existingReport?.workId}${
        existingReport?.isOverview ? '' : `/${existingReport?.id}`
      }`
    );
    if (action === 'approve') {
      await res.revalidate('/work/' + existingReport?.workId + '/new');
    }

    return res.status(201).json({
      message: `level report updated successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Couldn't review level report`,
      error: error?.message,
    });
  }
}
