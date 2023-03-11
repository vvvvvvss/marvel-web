import { Paper } from "ui";
import Link from "next/link";
import { Avatar } from "./Avatar";

export const PersonCard = ({ data: d }) => {
  return (
    <Link href={`/u/${d?.slug}`} prefetch={false} className="flex-1">
      <Paper
        border
        elevateOnHover
        className="rounded-lg p-5 flex gap-5 w-full h-full"
      >
        <Avatar className="w-10" src={d?.profilePic} />
        <h6 className="text-lg flex-1 self-center">{d?.name}</h6>
      </Paper>
    </Link>
  );
};

export const CourseCard = ({ data: d }) => {
  return (
    <Link href={`/course/${d?.courseCode}`} prefetch={false} className="flex-1">
      <Paper border elevateOnHover className="rounded-lg p-5 w-full h-full">
        <h3 className="text-3xl whitespace-nowrap">{d?.courseCode}</h3>
        <p className="text-sm text-p-6 whitespace-nowrap">
          {d?.totalLevels} Levels &#183; {d?.courseDuration}
        </p>
        <hr className="border-p-4 my-2" />
        <p>{d?.caption}</p>
      </Paper>
    </Link>
  );
};

export const WorkCard = ({ data: d }) => {
  return (
    <Link href={`/work/${d?.id}`} prefetch={false} className="flex-1">
      <Paper border elevateOnHover className="rounded-lg p-5 w-full h-full">
        <p className="w-full text-p-5 text-sm">{d?.typeOfWork} WORK</p>
        <h3 className="text-2xl mt-2">
          {d?.typeOfWork === "COURSE" ? (
            <>
              {d?.People?.map((a) => a?.person?.name?.split(" ")[0]).join(
                " and "
              )}
              &apos;s <span className="whitespace-nowrap">{d?.courseCode}</span>{" "}
              course work.{" "}
            </>
          ) : (
            d?.name
          )}
        </h3>
        {d?.typeOfWork === "PROJECT" && (
          <p className="w-full text-p-5 text-sm">
            By {d?.People?.map((p) => p?.person?.name)?.join(" ,")}
          </p>
        )}
      </Paper>
    </Link>
  );
};

export const ArticleCard = ({ data: d }) => {
  return (
    <Link href={`/article/${d?.id}`} prefetch={false} className="flex-1">
      <Paper border elevateOnHover className="rounded-lg p-5 w-full h-full">
        <p className="w-full text-p-5 text-sm whitespace-nowrap">
          {d?.typeOfArticle} &#183;{" "}
          {new Date(d?.createdAt).toLocaleDateString()}
        </p>
        <h3 className="text-2xl mt-2">{d?.title}</h3>
      </Paper>
    </Link>
  );
};

export const ReportCard = ({ data: d }) => {
  return (
    <Link
      href={`/work/${d?.workId}${d?.isOverview ? "" : `/${d?.id}`}`}
      prefetch={false}
      className="flex-1"
    >
      <Paper border elevateOnHover className="rounded-lg p-5 w-full h-full">
        <p className="w-full text-p-5 text-sm whitespace-nowrap">
          {new Date(d?.createdAt).toLocaleDateString()}
        </p>
        <h3 className="text-2xl mt-2">{d?.title}</h3>
      </Paper>
    </Link>
  );
};
