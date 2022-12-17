import { Paper, Tab, TabGroup } from '@marvel/web-ui';
import Link from 'next/link';
import connectToDB from 'apps/webapp/utils/dbConnector';
import { work } from '@marvel/web-utils';

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
      <TabGroup className="place-self-center">
        <Link href={`/${params?.profileSlug}/`}>
          <Tab>ReadMe</Tab>
        </Link>
        <Link href={`/${params?.profileSlug}/works`}>
          <Tab active>Works</Tab>
        </Link>
        <Link href={`/${params?.profileSlug}/writings`}>
          <Tab>Writings</Tab>
        </Link>
      </TabGroup>
      <Paper shadow border className="mt-5">
        {works.length == 0 ? (
          <h1 className="text-4xl p-5">No works</h1>
        ) : (
          works.map((w) => <h1>{w?._id}</h1>)
        )}
      </Paper>
    </div>
  );
}
