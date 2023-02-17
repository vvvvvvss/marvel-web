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
        reviewStatus: true,
        feedback: true,
        isOverview: true,
        work: {
          select: {
            typeOfWork: true,
            level: true,
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

    //check if they are coordinator of this work or if they are admin
    const condition =
      existingReport?.work?.People.map((p) => p?.personId).includes(
        session?.user?.id
      ) || session?.user?.scope?.map((s) => s.scope)?.includes('ADMIN');
    if (!condition) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    if (existingReport?.work?.typeOfWork === 'COURSE') {
      if (req.query?.action === 'approve') {
        //approve report and uprgade to next level. if work level is same as the report level
        if (existingReport?.level === existingReport?.work?.level) {
          await dbClient.report.update({
            where: {
              id: existingReport?.id,
            },
            data: {
              reviewStatus: 'APPROVED',
              feedback: '',
              work: {
                update: {
                  level: {
                    increment: 1,
                  },
                },
              },
            },
          });
          //else when an old report is being approved after an edit. just mark as approved
        } else if (existingReport?.level < existingReport?.work?.level) {
          await dbClient.report.update({
            where: {
              id: existingReport?.id,
            },
            data: {
              reviewStatus: 'APPROVED',
              feedback: '',
            },
          });
        } //end of approve
      } else if (req.query?.action === 'feedback') {
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
        `/work/${existingReport?.workId}/${
          existingReport?.level === 1 ? '' : existingReport?.id
        }`
      );
    } else if (existingReport?.work?.typeOfWork === 'PROJECT') {
      //project dont require changes to work record. just mark the report accordingly
      if (req?.query?.action === 'approve') {
        await dbClient.report.update({
          where: {
            id: existingReport?.id,
          },
          data: {
            reviewStatus: 'APPROVED',
            feedback: '',
          },
        });
      } else if (req?.query?.action === 'feedback') {
        await dbClient.report?.update({
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
        `/work/${existingReport?.workId}/${
          existingReport?.isOverview ? '' : existingReport?.id
        }`
      );
    }

    return res.status(201).json({
      message: `level report updated successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Couldn't updated level report`,
      error: error?.message,
    });
  }
}
