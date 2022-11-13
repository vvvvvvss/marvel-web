import { Paper, TabGroup, Tab } from '@marvel/web-ui';
import Link from 'next/link';
import connectToDB from 'apps/webapp/utils/dbConnector';
import { people } from '@marvel/web-utils';
import { MarkdownRender } from '@marvel/web-ui';
import ReadMeEditor from './ReadMeEditor';

const getUserReadmeBySlug = async (slug: string) => {
  await connectToDB();
  const person = await people
    //@ts-ignore
    .findOne({ slug: slug })
    .select('readMe slug name')
    .lean()
    .exec();
  console.log({ info: 'fetched readme of user in profile page' });
  return person;
};

export default async function page({ params, searchParams }) {
  const readMeData = await getUserReadmeBySlug(params?.profilePage as string);
  return (
    <div className="flex flex-col w-full rounded-lg">
      {/* toggle buttons  */}
      <TabGroup>
        <Link href={`/u/${params?.profileSlug}/`}>
          <Tab active>ReadMe</Tab>
        </Link>
        <Link href={`/u/${params?.profileSlug}/works`}>
          <Tab>Works</Tab>
        </Link>
        <Link href={`/u/${params?.profileSlug}/writings`}>
          <Tab>Writings</Tab>
        </Link>
      </TabGroup>
      <Paper shadow border className="relative mt-5 w-full rounded-lg">
        <ReadMeEditor
          profileSlug={params?.profileSlug as string}
          content={readMeData?.readMe as string}
        />
        {['', undefined].includes(readMeData?.readMe) ? (
          <h1 className="text-4xl p-5">No readme</h1>
        ) : (
          <MarkdownRender content={readMeData?.readMe} />
        )}
      </Paper>
    </div>
  );
}
