import { Tab, TabGroup } from '@marvel/web-ui';
import Link from 'next/link';

export default async function page({ params }) {
  return (
    <div className="flex flex-col w-full gap-5 items-center">
      <TabGroup className="self-center mt-5">
        <Link href={`/course/${params?.courseCode}/`}>
          <Tab>Syllabus</Tab>
        </Link>
        <Link href={`/course/${params?.courseCode}/articles`}>
          <Tab active>Articles</Tab>
        </Link>
        <Link href={`/course/${params?.courseCode}/works`}>
          <Tab>Works</Tab>
        </Link>
      </TabGroup>
    </div>
  );
}
