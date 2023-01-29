import { MarkdownRender, Paper } from '@marvel/web-ui';
import dbClient from 'apps/webapp/utils/dbConnector';
import ReportWriter from './ReportWriter';
import ReportEditor from './ReportEditor';
import ReportReviewer from './ReportReviewer';

const getFirstLevelReport = async (id: string, level: string) => {
  try {
    const work = await dbClient.work.findFirst({
      where: {
        id: id,
      },
      select: {
        flagged: true,
        pending: true,
        authors: true,
        level: true,
        courseCode: true,
        totalLevels: true,
        id: true,
      },
    });
    const report = await dbClient.report.findFirst({
      where: {
        AND: [{ workId: id }, { level: Number(level) }],
      },
      select: {
        title: true,
        content: true,
        id: true,
        level: true,
      },
    });

    console.log({ info: 'findOne() on reports' });
    return { report, work };
  } catch (error) {
    return { report: null, work: null };
  }
};

export default async function page({ params, searchParams }) {
  const { report, work } = await getFirstLevelReport(
    params?.courseworkId,
    searchParams?.level || 1
  );
  return (
    <div className="flex flex-col w-full rounded-lg gap-5 items-center">
      {/* toggle buttons  */}
      {!report ? (
        <div className="w-full flex flex-col items-center mx-5 max-w-3xl gap-5">
          {searchParams?.level > work?.level ||
          Number.isNaN(Number(searchParams?.level)) ? (
            <>
              <h1 className="text-2xl">
                This Report doesn't exist. Check the URL and try again
              </h1>
            </>
          ) : (
            <>
              <h1 className="text-2xl">
                Level {searchParams?.level} report is yet to be written.
              </h1>

              <img
                className="rounded-lg max-w-full"
                src="https://media.tenor.com/w-L80nXWEjoAAAAd/pen-in-flames-umineko.gif"
                alt="Level report is yet to be written"
              />
            </>
          )}
          {Number(searchParams?.level) === work?.level && (
            <ReportWriter work={work} />
          )}
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          {work?.pending?.map((p) => p.id).includes(report?.id) ? (
            <Paper
              border
              className="rounded-lg p-5 mb-5 bg-[#ffdf7f] text-[#4b4b00] dark:bg-[#3a3a00] dark:text-[#ffd262]"
            >
              This Report is yet to be approved by a Coordinator.
            </Paper>
          ) : (
            work?.flagged?.map((f) => f.id).includes(report?.id) && (
              <Paper
                border
                className="rounded-lg p-5 mb-5 bg-[#ff7f7f] text-[#4b0000] dark:bg-[#3a0000] dark:text-[#ff6a6a]"
              >
                This Report is flagged by a Coordinator and it probably requires
                some changes to be approved.
              </Paper>
            )
          )}
          <h2 className="text-4xl">{report?.title}</h2>

          <hr className="my-5 border-p-3" />
          <MarkdownRender content={report?.content} />
          <div className="w-full flex justify-end gap-5 flex-wrap my-5">
            <ReportReviewer report={report} work={work} />
            <ReportEditor report={report} work={work} />
          </div>
        </div>
      )}
    </div>
  );
}
