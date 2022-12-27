import { Paper, Tab, TabGroup } from '@marvel/web-ui';
import Link from 'next/link';
import connectToDB from 'apps/webapp/utils/dbConnector';
import { work } from '@marvel/web-utils';
import Spawner from './Spawner';

const getUserWorksBySlug = async (slug: String) => {
  await connectToDB();
  const works = await work
    //@ts-ignore
    .find({ $in: { 'authors.slug': slug } })
    .select('-_id')
    .lean()
    .exec();
  console.log({ info: 'find() on works' });
  return works;
};

export default async function page({ params, searchParams }) {
  const works = await getUserWorksBySlug(params?.profileSlug);
  console.log(works);
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
      <div className="flex mt-5 gap-5 flex-wrap">
        {works.length == 0 ? (
          <h1 className="text-4xl">No works</h1>
        ) : (
          <>
            {works.map((w, i) => (
              <Link
                key={i}
                href={`/${w?._type === 'courseWork' ? 'cw' : 'pw'}/${w?.slug}`}
              >
                <Paper
                  border
                  shadow
                  className="p-5 rounded-lg flex-1 min-w-fit cursor-pointer"
                >
                  {w?._type === 'courseWork' ? (
                    <>
                      <h6 className="text-xs tracking-widest">COURSE WORK</h6>
                      <h1 className="text-2xl">{w?.courseCode} Course Work</h1>
                    </>
                  ) : (
                    <>
                      <h6 className="text-xs tracking-widest">PROJECT WORK</h6>
                      <h1 className="text-2xl">{w?.name}</h1>
                    </>
                  )}
                </Paper>
              </Link>
            ))}
          </>
        )}
        <Spawner authorSlug={params?.profileSlug} />
      </div>
    </div>
  );
}
