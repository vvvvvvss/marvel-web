import { Tab, TabGroup } from "@marvel/ui/ui";
import Link from "next/link";
import dbClient from "../../../../utils/dbConnector";
import { WorkCard } from "../../../../components/Cards";
import { unstable_cache } from "next/cache";

export const dynamic = "force-dynamic";

const getWorksRaw = async (courseCode: string, page = 1) => {
  console.log("get works raw query: ", courseCode);

  const limit = 12;
  const skip = (page - 1) * limit;

  const where = {
    AND: [
      { courseCode: courseCode },
      {
        NOT: {
          Reports: {
            none: {},
          },
        },
      },
    ],
  };

  const [works, total] = await Promise.all([
    dbClient.work.findMany({
      where,
      select: {
        id: true,
        typeOfWork: true,
        courseCode: true,
        People: {
          select: {
            person: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      take: limit,
      skip,
      orderBy: {
        createdAt: 'desc'
      }
    }),
    dbClient.work.count({ where })
  ]);

  return {
    works: JSON.parse(JSON.stringify(works)),
    total,
    totalPages: Math.ceil(total / limit)
  };
};

const getWorks = async (courseCode: string, page: number) => {
  return await unstable_cache(
    async () => getWorksRaw(courseCode, page),
    [`course-works-${courseCode}-${page}`],
    { revalidate: 604800, tags: [`course-works-${courseCode}`] }
  )();
};

export default async function page(props: { params: Promise<{ courseCode: string }>, searchParams: Promise<{ page?: string }> }) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const courseCode = params?.courseCode;

  const { works, totalPages } = await getWorks(courseCode, currentPage);

  return (
    <div className="flex flex-col w-full gap-5 items-center">
      <TabGroup className="self-center mt-5">
        <Link href={`/course/${params?.courseCode}/`}>
          <Tab>Syllabus</Tab>
        </Link>
        <Link href={`/course/${params?.courseCode}/articles`}>
          <Tab>Articles</Tab>
        </Link>
        <Link href={`/course/${params?.courseCode}/works`}>
          <Tab active>Works</Tab>
        </Link>
      </TabGroup>

      <div className="w-full flex gap-5 flex-wrap">
        {works?.map((a: any, i: number) => (
          <WorkCard data={a} key={i} />
        ))}
        {works.length === 0 && (
          <div className="w-full text-center py-20 text-p-4">
            No works found.
          </div>
        )}
      </div>

      <div className="w-full flex justify-center mt-10 gap-4 text-sm font-medium">
        {currentPage > 1 && (
          <Link
            href={`/course/${courseCode}/works?page=${currentPage - 1}`}
            className="px-4 py-2 border rounded-full hover:bg-gray-100 dark:hover:bg-p-2 dark:border-p-6 transition-colors"
          >
            Previous
          </Link>
        )}
        <span className="px-4 py-2 text-p-5">
          Page {currentPage} of {totalPages || 1}
        </span>
        {currentPage < totalPages && (
          <Link
            href={`/course/${courseCode}/works?page=${currentPage + 1}`}
            className="px-4 py-2 border rounded-full hover:bg-gray-100 dark:hover:bg-p-2 dark:border-p-6 transition-colors"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
