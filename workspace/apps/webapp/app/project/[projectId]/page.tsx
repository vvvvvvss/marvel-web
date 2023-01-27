import dbClient from 'apps/webapp/utils/dbConnector';

const getOverview = async (id: string) => {
  const overview = await dbClient.report.findFirst({
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
    },
  });

  console.log({ info: 'findOne() on articles' });
  return overview;
};

export default async function page({ params, searchParams }) {
  const overview = await getOverview(params?.projectId as string);
  return (
    <div className="flex flex-col w-full rounded-lg gap-5 justify-center">
      {/* toggle buttons  */}
      <h1 className="text-4xl">{overview?.content || 'No overview'}</h1>
    </div>
  );
}
