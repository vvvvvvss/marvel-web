import { MarkdownRender, Paper } from '@marvel/web-ui';
import dbClient from 'apps/webapp/utils/dbConnector';
import axios from 'axios';
import ContentsIndex from './ContentsIndex';

const getSyllabus = async (courseCode: string) => {
  const course = await dbClient.course.findUnique({
    where: {
      courseCode: courseCode,
    },
    select: {
      repoURL: true,
      totalLevels: true,
    },
  });
  const repoName = course?.repoURL?.slice(
    course?.repoURL.search('github.com') + 10
  );

  const filesMetaData = (
    await axios.get(
      'https://api.github.com/repos' + repoName + '/git/trees/main?recursive=1',
      {
        headers: {
          Authorization: `Basic ${process.env?.GITHUB_CLIENT_ID}:${process.env?.GITHUB_CLIENT_SECRET}`,
        },
      }
    )
  ).data;
  const levels = filesMetaData?.['tree']?.filter((e) =>
    /^LEVEL\d+\.md$/.test(e?.['path'])
  );
  if (course?.totalLevels !== levels?.length) {
    await dbClient.course.update({
      where: {
        courseCode: courseCode,
      },
      data: {
        totalLevels: levels?.length,
      },
    });
  }

  const content = (
    await Promise.all(
      levels?.map((l) =>
        axios.get(
          'https://raw.githubusercontent.com' + repoName + '/main/' + l?.path
        )
      )
    )
  ).map((response) => Buffer.from(response?.data).toString());

  return { content, course };
};

export default async function page({ params }) {
  const { content, course } = await getSyllabus(params?.courseCode);
  return (
    <div className="flex flex-col w-full gap-5 items-center">
      <div className="w-full max-w-2xl mt-5">
        <ContentsIndex course={course} />
        {content?.map((c, i) => (
          <div key={i} className="w-full">
            <hr className="border-p-4 my-5" />
            <h1 id={'#' + i} className="text-xl font-mono text-p-6">
              Level {i + 1}
            </h1>
            <hr className="border-p-4 my-5" />
            <MarkdownRender content={c} />
          </div>
        ))}
      </div>
    </div>
  );
}
