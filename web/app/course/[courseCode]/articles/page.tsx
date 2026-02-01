import { Tab, TabGroup } from "@marvel/ui/ui";
import Link from "next/link";
import dbClient from "../../../../utils/dbConnector";
import { ArticleCard } from "../../../../components/Cards";
import { unstable_cache } from "next/cache";

export const dynamic = "force-dynamic";

const getArticlesRaw = async (courseCode: string, page = 1) => {
  console.log("get articles raw query: ", courseCode);

  const limit = 12;
  const skip = (page - 1) * limit;

  const where = {
    Courses: {
      some: {
        course: {
          courseCode: courseCode,
        },
      },
    },
  };

  const [articles, total] = await Promise.all([
    dbClient.article.findMany({
      where,
      select: {
        id: true,
        title: true,
        caption: true,
        createdAt: true,
        typeOfArticle: true,
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    }),
    dbClient.article.count({ where })
  ]);

  return {
    articles: JSON.parse(JSON.stringify(articles)),
    total,
    totalPages: Math.ceil(total / limit)
  };
};

const getArticles = async (courseCode: string, page: number) => {
  return await unstable_cache(
    async () => getArticlesRaw(courseCode, page),
    [`course-articles-${courseCode}-${page}`],
    { revalidate: 604800, tags: [`course-articles-${courseCode}`] }
  )();
};

export default async function page(props: { params: Promise<{ courseCode: string }>, searchParams: Promise<{ page?: string }> }) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const courseCode = params?.courseCode;

  const { articles, totalPages } = await getArticles(courseCode, currentPage);

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

      <div className="w-full flex gap-5 flex-wrap">
        {articles?.map((a: any, i: number) => (
          <ArticleCard data={a} key={i} />
        ))}
        {articles.length === 0 && (
          <div className="w-full text-center py-20 text-p-4">
            No articles found.
          </div>
        )}
      </div>

      <div className="w-full flex justify-center mt-10 gap-4 text-sm font-medium">
        {currentPage > 1 && (
          <Link
            href={`/course/${courseCode}/articles?page=${currentPage - 1}`}
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
            href={`/course/${courseCode}/articles?page=${currentPage + 1}`}
            className="px-4 py-2 border rounded-full hover:bg-gray-100 dark:hover:bg-p-2 dark:border-p-6 transition-colors"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
