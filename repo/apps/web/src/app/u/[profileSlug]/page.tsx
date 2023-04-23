import { Paper, TabGroup, Tab } from "ui";
import Link from "next/link";
import dbClient from "../../../utils/dbConnector";
import { MarkdownRender } from "ui";
import ReadMeEditor from "./ReadMeEditor";

const getUserReadmeBySlug = async (slug: string) => {
  const person = await dbClient.people.findFirst({
    where: {
      slug: slug,
    },
    select: {
      readMe: true,
      slug: true,
      name: true,
    },
  });
  return person;
};

export default async function page({ params, searchParams }) {
  const readMeData = await getUserReadmeBySlug(params?.profileSlug as string);
  return (
    <div className="flex flex-col w-full rounded-lg gap-5 justify-center">
      {/* toggle buttons  */}
      <TabGroup className="self-center md:self-start">
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
      <Paper
        shadow
        border
        className=" w-full rounded-lg flex flex-col p-5 mb-32"
      >
        {["", null].includes(readMeData?.readMe) ? (
          <div className="w-full">
            <h1 className="text-3xl text-p-5 m-5">ReadMe is Empty</h1>
          </div>
        ) : (
          <MarkdownRender content={readMeData?.readMe} className="mb-5" />
        )}
        <ReadMeEditor
          profileSlug={params?.profileSlug as string}
          content={readMeData?.readMe as string}
        />
      </Paper>
    </div>
  );
}
