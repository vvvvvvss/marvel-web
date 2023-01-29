import { Window, Paper, Button } from '@marvel/web-ui';
import { Avatar } from '../../../components/Avatar';
import dbClient from 'apps/webapp/utils/dbConnector';
import Link from 'next/link';
import Tabs from './Tabs';

const getCoursework = async (_id: string) => {
  try {
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
      },
    });
    console.info({ info: 'findOne() on coursework' });
    return courseWork;
  } catch (error) {
    throw new Error("Couldn't get data.");
  }
};

export async function generateStaticParams() {
  return [];
}
export const dynamicParams = true;

export default async function layout({ children, params }) {
  const courseWork = await getCoursework(params?.courseworkId);

  return (
    <Window className="pt-5 md:pt-12 pb-40">
      {/* whole thing  */}
      <div className="w-full max-w-5xl flex flex-col items-center px-5">
        {/* hero box  */}
        <Paper
          shadow
          border
          className="w-full flex flex-col md:flex-row mx-5 min-h-[250px] h-fit"
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
                {courseWork?.level === courseWork?.totalLevels + 1
                  ? 'Completed'
                  : `Lv ${courseWork?.level}`}
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
        <Tabs courseWork={courseWork} />
        <div className="w-full">{children}</div>
      </div>
    </Window>
  );
}
