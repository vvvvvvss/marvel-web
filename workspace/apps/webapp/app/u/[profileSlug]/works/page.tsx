import { Button, Paper, Tab, TabGroup } from '@marvel/web-ui';
import Link from 'next/link';
import connectToDB from 'apps/webapp/utils/dbConnector';
import { work } from '@marvel/web-utils';
import Spawner from './Spawner';

const getUserWorksBySlug = async (slug: String) => {
  await connectToDB();
  const works = await work
    //@ts-ignore
    .find({ $in: { 'authors.slug': slug } })
    .lean()
    .exec();
  console.log({ info: 'fetched works of user in profile page' });
  return works;
};

export default async function page({ params, searchParams }) {
  const works = await getUserWorksBySlug(params?.profileSlug);
  return (
    <div className="flex flex-col">
      {/* toggle buttons  */}
      <TabGroup className="self-center md:self-start">
        <Link href={`/u/${params?.profileSlug}/`}>
          <Tab>ReadMe</Tab>
        </Link>
        <Link href={`/u/${params?.profileSlug}/works`}>
          <Tab active>Works</Tab>
        </Link>
        <Link href={`/u/${params?.profileSlug}/writings`}>
          <Tab>Writings</Tab>
        </Link>
      </TabGroup>
      <Paper shadow border className="flex mt-5 rounded-lg p-5 gap-5 flex-wrap">
        {works.length == 0 ? (
          <h1 className="text-4xl">No works</h1>
        ) : (
          <>
            {works.map((w) => (
              <h1>{w?._id}</h1>
            ))}
          </>
        )}
        <Spawner authorSlug={params?.profileSlug} />
      </Paper>
    </div>
  );
}
