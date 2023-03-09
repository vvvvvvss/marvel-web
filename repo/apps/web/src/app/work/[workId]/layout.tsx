import { Window, Paper } from "ui";
import { Avatar } from "../../../components/Avatar";
import dbClient from "../../../utils/dbConnector";
import EditMeta from "./EditMeta/EditMeta";
import Tabs from "./Tabs";
import Image from "next/image";
import Link from "next/link";

const getWork = async (id: string) => {
  try {
    const work = await dbClient.work.findUniqueOrThrow({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        coverPhoto: true,
        note: true,
        courseCode: true,
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
            status: true,
          },
        },
        Reports: {
          select: {
            id: true,
            reviewStatus: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        totalLevels: true,
        typeOfWork: true,
      },
    });
    console.info({ info: "got work" });
    return work;
  } catch (error) {}
};

export async function generateStaticParams() {
  return [];
}
export const dynamicParams = true;

export default async function layout({ children, params }) {
  const work = await getWork(params?.workId);

  const title =
    work?.typeOfWork === "COURSE" ? (
      <>
        {work.People.filter((p) => p?.role === "AUTHOR")
          .map((a) => a?.person?.name?.split(" ")[0])
          .join(" and ")}
        's <span className="whitespace-nowrap">{work?.courseCode}</span> course
        work.{" "}
        <span className="text-sm bg-p-2 rounded-lg p-2">
          {`Lv ${work?.Reports?.length}`}
        </span>
      </>
    ) : (
      work?.name
    );

  const coverPhotoSrc = work?.coverPhoto
    ? work?.coverPhoto?.slice(0, work?.coverPhoto?.search("upload") + 6) +
      "/ar_1.77,c_crop" +
      work?.coverPhoto?.slice(work?.coverPhoto?.search("upload") + 6)
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
                {work?.typeOfWork}
                {work?.typeOfWork === "COURSE" ? "WORK" : ""}
              </p>
              <h1 className="text-4xl my-2">{title}</h1>
              <p className="text-p-8 mt-5">{work?.note}</p>
            </div>
            <div className="overflow-x-auto pt-5 -mx-5 flex-grow-0 -mb-5">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <tbody>
                  {work?.People?.sort((p) =>
                    p?.role === "AUTHOR" ? -1 : 1
                  )?.map((p, i) => (
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
                      <td className="px-5 py-3 text-xs">{p?.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <EditMeta work={work} />
          </Paper>
          <Paper className="w-full md:w-1/2 md:h-full flex-1">
            {work?.coverPhoto && (
              <Image
                width={1000}
                height={1000}
                className="max-h-min object-cover w-full h-full"
                src={coverPhotoSrc}
                alt={work?.name as string}
              />
            )}
          </Paper>
        </Paper>
        <Tabs work={work} />

        <div className="w-full">{children}</div>
      </div>
    </Window>
  );
}
