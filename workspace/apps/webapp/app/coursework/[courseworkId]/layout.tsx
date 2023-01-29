import { ReactNode } from 'react';
import { Window, Paper, Button, TabGroup, Tab } from '@marvel/web-ui';
import { Avatar } from '../../../components/Avatar';
import dbClient from 'apps/webapp/utils/dbConnector';
import Link from 'next/link';

const getProject = async (_id: string) => {
  const courseWork = await dbClient.work.findFirst({
    where: {
      id: _id,
    },
    select: {
      id: true,
      courseCode: true,
      level: true,
      authors: true,
      note: true,
      totalLevels: true,
      Report: {
        select: {
          id: true,
          level: true,
          reviewStatus: true,
        },
      },
    },
  });
  console.info({ info: 'findOne() on coursework' });
  return courseWork;
};

export async function generateStaticParams() {
  return [];
}
export const dynamicParams = true;

export default async function layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { courseworkId?: String };
}) {
  const courseWork = await getProject(params?.courseworkId as string);
  return (
    <Window className="pt-5 md:pt-12 pb-40">
      {/* whole thing  */}
      <div className="w-full max-w-5xl flex flex-col items-center">
        {/* hero box  */}
        <Paper
          shadow
          border
          className="flex flex-col md:flex-row mx-5 min-h-[250px] h-fit"
        >
          <Paper className="bg-p-1 w-full md:w-1/2 md:h-full p-5 flex flex-col gap-5 justify-between">
            <h1 className="text-4xl">
              {courseWork.authors
                .map((a) => a.name.split(' ')[0])
                .join(' and ')}
              's{' '}
              <span className="whitespace-nowrap">{courseWork.courseCode}</span>{' '}
              course work.{' '}
              <span className="text-sm bg-p-2 rounded-lg p-2">
                Lv {courseWork?.level}
              </span>
            </h1>
            <div className="flex flex-wrap gap-5">
              {courseWork?.authors?.map((author, i) => (
                <Link href={`/u/${author?.slug}`} key={i}>
                  <Button
                    variant={'standard'}
                    className="pl-[0.5rem] flex items-center gap-3"
                  >
                    <Avatar
                      alt={author.name}
                      src={author.profilePic}
                      className="w-6"
                    />
                    {author.name}
                  </Button>
                </Link>
              ))}
            </div>
          </Paper>
          <Paper className="p-5 w-full md:w-1/2 h-1/2 md:h-full flex-1">
            <p>{courseWork?.note}</p>
          </Paper>
        </Paper>
        <TabGroup className="mx-5 my-10 overflow-x-auto">
          {Array.from({ length: courseWork?.totalLevels }).map((_, k) => (
            <Tab
              key={k}
              active={k + 1 == 1}
              disabled={k + 1 > courseWork.level}
            >
              Level {k + 1}
            </Tab>
          ))}
        </TabGroup>
        <div className="w-full">{children}</div>
      </div>
    </Window>
  );
}
