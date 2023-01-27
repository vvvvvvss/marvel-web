import { ReactNode } from 'react';
import { Window, Paper, Button, Avatar } from '@marvel/web-ui';
import dbClient from '../../../utils/dbConnector';

const getProject = async (_id: string) => {
  const project = await dbClient.work.findUnique({
    where: {
      id: _id,
    },
    select: {
      name: true,
      coverPhoto: true,
      level: true,
      people: {
        select: {
          name: true,
          profilePic: true,
          slug: true,
        },
      },
      coordinators: {
        select: {
          name: true,
          profilePic: true,
          slug: true,
        },
      },
      writerId: true,
      note: true,
    },
  });
  console.info({ info: 'findOne() on project.' });
  return project;
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
  params: { projectId?: String };
}) {
  const project = await getProject(params?.projectId as string);
  return (
    <Window className="pt-10">
      {/* whole thing  */}
      <div className="w-full max-w-5xl">
        <Paper border shadow className="w-full p-5 rounded-lg">
          <h1 className="text-2xl">{project?.name}</h1>
        </Paper>
        <div className="w-full">{children}</div>
      </div>
    </Window>
  );
}
