import { Window, Paper, Avatar, Button } from '@marvel/web-ui';
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
  console.log({ info: 'params at profile work segment' }, params);
  return (
    <div className="flex flex-col">
      {/* toggle buttons  */}
      <div className="flex border rounded-full max-w-min p-2 place-self-center">
        <Link href={`/u/${params?.profileSlug}/`}>
          <Button variant="text">ReadMe</Button>
        </Link>
        <Link href={`/u/${params?.profileSlug}/works`}>
          <Button>Works</Button>
        </Link>
        <Link href={`/u/${params?.profileSlug}/writings`}>
          <Button variant="text">Writings</Button>
        </Link>
      </div>
      <Paper shadow border className="mt-5">
        {['', undefined].includes(undefined) && (
          <h1 className="text-4xl p-5">No works</h1>
        )}
      </Paper>
    </div>
  );
}
