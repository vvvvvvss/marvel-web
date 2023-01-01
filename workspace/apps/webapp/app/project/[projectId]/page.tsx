import { Paper, TabGroup, Tab } from '@marvel/web-ui';
import connectToDB from 'apps/webapp/utils/dbConnector';
import { stageReport } from '@marvel/web-utils';

const getOverview = async (_id: string) => {
  await connectToDB();
  const overview = await stageReport
    //@ts-ignore
    .findOne({ $and: [{ parentId: _id }, { isOverview: true }] })
    .select('-_id')
    .lean()
    .exec();
  console.log({ info: 'findOne() on articles' });
  return overview;
};

export default async function page({ params, searchParams }) {
  const overview = await getOverview(params?.projectId as string);
  return (
    <div className="flex flex-col w-full rounded-lg gap-5 justify-center">
      {/* toggle buttons  */}
      <h1 className="text-4xl">{overview?.content}</h1>
    </div>
  );
}
