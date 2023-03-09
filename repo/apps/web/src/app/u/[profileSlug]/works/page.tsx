import { Paper, Tab, TabGroup } from 'ui';
import Link from 'next/link';
import dbClient from 'webapp/utils/dbConnector';
import Spawner from './Spawner';

const getUserWorksBySlug = async (slug: string) => {
  const works = await dbClient.work.findMany({
    where: {
      People: {
        some: {
          person: {
            slug: slug,
          },
        },
      },
    },
    select: {
      id: true,
      name: true,
      courseCode: true,
      typeOfWork: true,
    },
  });
  console.log({ info: 'find() on works' });
  return works;
};

export default async function page({ params, searchParams }) {
  const works = await getUserWorksBySlug(params?.profileSlug as string);
  return (
    <div className="flex flex-col pb-36">
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
      <Paper shadow border className="flex mt-5 p-5 rounded-lg gap-5 flex-wrap">
        {works.length == 0 ? (
          <h1 className="text-4xl">No works</h1>
        ) : (
          <>
            {works.map((w, i) => (
              <Link className="flex-auto" key={i} href={`/work/${w?.id}`}>
                <Paper
                  border
                  shadow={'hover'}
                  elevateOnHover
                  className="p-5 bg-p-1 rounded-lg min-w-fit cursor-pointer"
                >
                  {w?.typeOfWork === 'COURSE' ? (
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
      </Paper>
    </div>
  );
}
