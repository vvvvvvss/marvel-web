import { Window, Paper, Avatar, Button, Tab, TabGroup } from '@marvel/web-ui';
import Link from 'next/link';
import connectToDB from 'apps/webapp/utils/dbConnector';
import { article } from '@marvel/web-utils';
import Writer from './Writer';

const getUserWritingsBySlug = async (slug: String) => {
  await connectToDB();
  const writings = await article
    //@ts-ignore
    .find({ authorSlug: slug })
    .select('-_id -content -searchTerms -rankingScore')
    .lean()
    .exec();
  console.log({ info: 'find() on articles' });
  return writings;
};

export default async function page({ params, searchParams }) {
  const writings = await getUserWritingsBySlug(params?.profileSlug);
  return (
    <div className="flex flex-col">
      {/* toggle buttons  */}
      <TabGroup className="self-center md:self-start">
        <Link href={`/u/${params?.profileSlug}/`}>
          <Tab>ReadMe</Tab>
        </Link>
        <Link href={`/u/${params?.profileSlug}/works`}>
          <Tab>Works</Tab>
        </Link>
        <Link href={`/u/${params?.profileSlug}/writings`}>
          <Tab active>Writings</Tab>
        </Link>
      </TabGroup>
      <Paper shadow border className="flex mt-5 p-5 rounded-lg gap-5 flex-wrap">
        {writings.length == 0 ? (
          <h1 className="text-4xl">No writings</h1>
        ) : (
          <>
            {writings.map((w, i) => (
              <Link className="flex-auto" key={i} href={`/article/${w?.slug}`}>
                <Paper
                  border
                  shadow={'hover'}
                  elevateOnHover
                  className="p-5 bg-p-1 rounded-lg min-w-fit cursor-pointer"
                >
                  {w?._type === 'blogPost' ? (
                    <>
                      <h6 className="text-xs tracking-widest">BLOG POST</h6>
                      <h1 className="text-2xl">{w?.title}</h1>
                    </>
                  ) : (
                    <>
                      <h6 className="text-xs tracking-widest">
                        RESOURCE ARTICLE
                      </h6>
                      <h1 className="text-2xl">{w?.title}</h1>
                    </>
                  )}
                </Paper>
              </Link>
            ))}
          </>
        )}
        <Writer authorSlug={params?.profileSlug} />
      </Paper>
    </div>
  );
}
