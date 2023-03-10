import { Window, Paper } from "ui";
import { Avatar } from "../../../components/Avatar";
import dbClient from "../../../utils/dbConnector";
import Image from "next/image";
import Link from "next/link";
import EditMeta from "./EditMeta/EditMeta";

const getCourse = async (id: string) => {
  try {
    const course = await dbClient.course.findUnique({
      where: {
        courseCode: id,
      },
      select: {
        id: true,
        caption: true,
        courseCode: true,
        courseDuration: true,
        coverPhoto: true,
        repoURL: true,
        totalLevels: true,
      },
    });
    console.info({ info: "got course" });
    return course;
  } catch (error) {}
};

export async function generateStaticParams() {
  return [];
}
export const dynamicParams = true;

export default async function layout({ children, params }) {
  const course = await getCourse(params?.courseCode);

  const coverPhotoSrc = course?.coverPhoto
    ? course?.coverPhoto?.slice(0, course?.coverPhoto?.search("upload") + 6) +
      "/ar_1.77,c_crop" +
      course?.coverPhoto?.slice(course?.coverPhoto?.search("upload") + 6)
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
              <p className="text-p-6 tracking-widest">COURSE</p>
              <h1 className="text-6xl my-2">{course?.courseCode}</h1>
              <p className="text-p-8 text-sm">
                {course?.totalLevels} Levels &#183; {course?.courseDuration}
              </p>
              <p className="text-p-8 mt-5">{course?.caption}</p>
            </div>
            <EditMeta course={course} />
          </Paper>
          <Paper className="w-full md:w-1/2 md:h-full flex-1">
            {course?.coverPhoto && (
              <Image
                width={1000}
                height={1000}
                className="max-h-min object-cover w-full h-full"
                src={coverPhotoSrc}
                alt={course?.courseCode}
              />
            )}
          </Paper>
        </Paper>
        <div className="w-full">{children}</div>
      </div>
    </Window>
  );
}
