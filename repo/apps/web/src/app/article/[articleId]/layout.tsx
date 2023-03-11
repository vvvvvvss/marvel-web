import { Window, Paper, MarkdownRender, Button } from "ui";
import { Avatar } from "../../../components/Avatar";
import dbClient from "../../../utils/dbConnector";
import Image from "next/image";
import Link from "next/link";
import ArticleReviewer from "./ArticleReviewer";
import ArticleEditor from "./ArticleEditor";

const getArticle = async (id: string) => {
  try {
    const article = await dbClient.article.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        caption: true,
        content: true,
        Courses: {
          select: {
            courseId: true,
            course: {
              select: {
                courseCode: true,
              },
            },
          },
        },
        typeOfArticle: true,
        feedback: true,
        reviewStatus: true,
        coverPhoto: true,
        People: {
          select: {
            personId: true,
            person: {
              select: {
                slug: true,
                name: true,
                profilePic: true,
              },
            },
            role: true,
          },
        },
      },
    });
    console.info({ info: "got article" });
    return article;
  } catch (error) {
    throw new Error("Couldn't get data.");
  }
};

export async function generateStaticParams() {
  return [];
}
export const dynamicParams = true;

export default async function layout({ children, params }) {
  const article = await getArticle(params?.articleId);

  const coverPhotoSrc = article?.coverPhoto
    ? article?.coverPhoto?.slice(0, article?.coverPhoto?.search("upload") + 6) +
      "/ar_1.77,c_crop" +
      article?.coverPhoto?.slice(article?.coverPhoto?.search("upload") + 6)
    : "";

  return (
    <Window className={"pt-5 md:pt-12 pb-40"}>
      {/* whole thing  */}
      <div className="w-full max-w-5xl flex flex-col items-center px-5 z-10">
        {/* hero box  */}
        <Image
          className="absolute w-full top-0 -z-10 blur-3xl h-1/2 opacity-50"
          width={1000}
          height={200}
          alt={"cover photo"}
          src={coverPhotoSrc}
        />

        <Paper
          shadow
          border
          className="w-full flex flex-col md:flex-row mx-5 min-h-[250px] h-min"
        >
          {/* left box  */}
          <Paper className="relative flex flex-col justify-between dark:bg-p-1 w-full md:w-1/2 max-h-min p-5 ">
            <div>
              <p className="text-p-6 tracking-widest">
                {article?.typeOfArticle}
              </p>
              <h1 className="text-4xl my-2">{article?.title}</h1>
              <p className="text-p-8 mt-5">{article?.caption}</p>
              {article?.typeOfArticle === "RESOURCE" && (
                <div className="flex gap-3 flex-wrap mt-5">
                  {article?.Courses?.map((c, i) => (
                    <Link key={i} href={`/course/${c?.course?.courseCode}`}>
                      <Button className="text-sm">
                        {c?.course?.courseCode}
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="overflow-x-auto pt-5 -mx-5 flex-grow-0 -mb-5">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <tbody>
                  {article?.People?.filter((p) =>
                    ["OP", "GUEST"].includes(p?.role)
                  )
                    ?.sort((p) => (p?.role === "OP" ? -1 : 1))
                    ?.map((p, i) => (
                      <tr
                        key={i}
                        className="border-t p-5 border-p-3 dark:border-p-6"
                      >
                        <Link key={i} href={`/u/${p?.person?.slug}`}>
                          <td className="flex gap-3 items-center py-3 px-5 text-base">
                            <Avatar
                              className="w-6"
                              alt={p?.person?.name}
                              src={p?.person?.profilePic}
                            />
                            {p?.person?.name}
                          </td>
                        </Link>
                        <td className="px-5 py-3 text-xs">{p?.role}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {/* <EditMeta work={article} /> */}
          </Paper>
          <Paper className="w-full md:w-1/2 md:h-full flex-1">
            {article?.coverPhoto && (
              <Image
                width={1000}
                height={1000}
                className="max-h-min object-cover w-full h-full"
                src={coverPhotoSrc}
                alt={article?.title}
              />
            )}
          </Paper>
        </Paper>

        <div className="w-full max-w-2xl mx-5 my-10">
          {article?.reviewStatus === "PENDING" ? (
            <Paper
              border
              className="rounded-lg p-5 mb-5 bg-[#ffdf7f] text-[#4b4b00] dark:bg-[#3a3a00] dark:text-[#ffd262]"
            >
              This Article is yet to be approved by a Coordinator.
            </Paper>
          ) : (
            article?.reviewStatus == "FLAGGED" && (
              <Paper
                border
                className="rounded-lg p-5 mb-5 bg-[#ff7f7f] text-[#4b0000] dark:bg-[#3a0000] dark:text-[#ff6a6a]"
              >
                This Article is flagged by a Coordinator and it probably
                requires some changes to be approved.
              </Paper>
            )
          )}
          <MarkdownRender content={article?.content} />
          <div className="w-full flex justify-end gap-5 flex-wrap my-5">
            <ArticleReviewer article={article} />
            <ArticleEditor article={article} />
          </div>
        </div>
        {children}
      </div>
    </Window>
  );
}
