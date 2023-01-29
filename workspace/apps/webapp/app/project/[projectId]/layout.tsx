import { Window, Paper, Button } from '@marvel/web-ui';
import { Avatar } from '../../../components/Avatar';
import dbClient from 'apps/webapp/utils/dbConnector';
import Link from 'next/link';
import Tabs from './Tabs';

const getProject = async (_id: string) => {
  try {
    const projectWork = await dbClient.work.findFirst({
      where: {
        id: _id,
      },
      select: {
        id: true,
        name: true,
        coverPhoto: true,
        authors: true,
        coordinators: true,
        pending: true,
        flagged: true,
        note: true,
        Report: {
          select: {
            id: true,
          },
        },
      },
    });
    console.info({ info: 'findOne() on projectwork' });
    return projectWork;
  } catch (error) {
    throw new Error("Couldn't get data.");
  }
};

export async function generateStaticParams() {
  return [];
}
export const dynamicParams = true;

export default async function layout({ children, params }) {
  const projectWork = await getProject(params?.projectId);
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
          {/* left box  */}
          <Paper className="relative bg-p-1 w-full md:w-1/2 md:h-full p-5 ">
            <Button
              variant="outlined"
              className="absolute top-2 right-2 text-sm"
            >
              Edit
            </Button>
            <div>
              <p className="text-p-6 tracking-widest">PROJECT</p>
              <h1 className="text-4xl my-2">{projectWork?.name}</h1>
              <p className="text-p-8">{projectWork?.note}</p>
            </div>
            <div>
              <p className="text-p-6 text-sm m-2">By:</p>
              <div className="flex flex-wrap gap-5">
                {projectWork?.authors?.map((author, i) => (
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
              <p className="text-p-6 text-sm m-2">Coordinated by:</p>
              <div className="flex flex-wrap gap-5">
                {projectWork?.coordinators?.map((coordinator, i) => (
                  <Link href={`/u/${coordinator?.slug}`} key={i}>
                    <Button
                      variant={'standard'}
                      className="pl-[0.5rem] flex items-center gap-3"
                    >
                      <Avatar
                        alt={coordinator?.name}
                        src={coordinator?.profilePic}
                        className="w-6"
                      />
                      {coordinator?.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </Paper>
          <Paper className="p-5 w-full md:w-1/2 h-1/2 md:h-full flex-1">
            <img src={projectWork?.coverPhoto} alt={projectWork?.name} />
          </Paper>
        </Paper>
        <Tabs courseWork={projectWork} />
        <div className="w-full">{children}</div>
      </div>
    </Window>
  );
}
