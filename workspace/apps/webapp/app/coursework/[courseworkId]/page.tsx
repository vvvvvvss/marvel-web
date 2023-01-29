import { MarkdownRender, Paper } from '@marvel/web-ui';
import dbClient from 'apps/webapp/utils/dbConnector';
import ReportWriter from './ReportWriter';
import ReportEditor from './ReportEditor';
import ReportReviewer from './ReportReviewer';

const getFirstLevelReport = async (id: string) => {
  const report = await dbClient.report.findFirst({
    where: {
      workId: id,
    },
    orderBy: {
      level: 'asc',
    },
    take: 1,
    select: {
      title: true,
      content: true,
      id: true,
      feedback: true,
      reviewStatus: true,
      level: true,
      workId: true,
    },
  });

  console.log({ info: 'findOne() on reports' });
  return report;
};

export default async function page({ params, searchParams }) {
  const report = await getFirstLevelReport(params?.courseworkId);
  return (
    <div className="flex flex-col w-full rounded-lg gap-5 items-center px-5">
      {/* toggle buttons  */}
      {!report ? (
        <div className="w-full flex flex-col items-center mx-5 max-w-3xl gap-5">
          <h1 className="text-2xl">{'Level 1 report is yet to be written.'}</h1>
          <img
            className="rounded-lg max-w-full"
            src="https://media.tenor.com/w-L80nXWEjoAAAAd/pen-in-flames-umineko.gif"
            alt="Level 1 report is yet to be written"
          />
          <ReportWriter workId={params?.courseworkId} />
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          {['PENDING', 'FLAGGED'].includes(report.reviewStatus) && (
            <Paper
              border
              className="rounded-lg p-5 mb-5 bg-[#ffdf7f] text-[#4b4b00] dark:bg-[#3a3a00] dark:text-[#ffd262]"
            >
              {report.reviewStatus === 'PENDING' ? (
                <>This Report is yet to be approved by a Coordinator.</>
              ) : (
                <>
                  This Report is flagged by a Coordinator and it probably
                  requires some changes to be approved.
                </>
              )}
            </Paper>
          )}
          <h2 className="text-4xl">{report?.title}</h2>
          <hr className="my-5 border-p-3" />
          <MarkdownRender content={report?.content} />
          <div className="w-full flex justify-end gap-5 flex-wrap">
            <ReportEditor report={report} />
            <ReportReviewer report={report} />
          </div>
        </div>
      )}
    </div>
  );
}
