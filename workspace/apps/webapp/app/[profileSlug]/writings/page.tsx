import { Window, Paper, Avatar, Button, Tab, TabGroup } from '@marvel/web-ui';
import Link from 'next/link';
import connectToDB from 'apps/webapp/utils/dbConnector';
import { people } from '@marvel/web-utils';

// const getUserReadmeBySlug = async (slug: String) => {
//   await connectToDB();
//   const person = await people
//     //@ts-ignore
//     .findOne({ slug: slug })
//     .select('readMe slug name')
//     .lean()
//     .exec();
//   console.log({ info: 'fetched readme of user in profile page' });
//   return person;
// };

export default async function page({ params, searchParams }) {
  //   const readMeData = await getUserReadmeBySlug(params?.profilePage);
  console.log({ info: 'params at profile writings segment' }, params);
  return (
    <div className="flex flex-col">
      {/* toggle buttons  */}
      <TabGroup className="place-self-center">
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
      <Paper shadow border className="mt-5">
        {['', undefined].includes(undefined) && (
          <h1 className="text-4xl p-5">No Writings</h1>
        )}
      </Paper>
    </div>
  );
}
