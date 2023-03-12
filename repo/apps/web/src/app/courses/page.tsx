import { CourseCard } from "../../components/Cards";
import dbClient from "../../utils/dbConnector";

const getCourseList = async (courseCode: string) => {
  const courseList = await dbClient.course.findMany({
    select: {
      courseCode: true,
      caption: true,
      courseDuration: true,
      totalLevels: true,
    },
  });
  return courseList;
};

export default async function page({ params }) {
  const courseList = await getCourseList(params?.courseCode);
  return (
    <div className="w-full max-w-5xl flex flex-col p-5">
      <h1 className="text-3xl md:text-5xl px-3">
        <span className="text-p-4 dark:text-p-5">Student Track / </span>
        <span className="text-p-0 dark:text-p-9">Courses</span>
      </h1>
      <p className="w-full max-w-2xl text-lg py-12 text-p-0 dark:text-p-9 px-3">
        An exhaustive list of courses across five domains at MARVEL: Artificial
        Intelligence & Machine Learning, Internet of Things, Cloud Computing and
        Cybersecurity, Design & Prototyping, and Renewable Energy Tech.
      </p>
      <div className="flex w-full gap-5 flex-wrap mt-5">
        {courseList?.map((c, i) => (
          <CourseCard data={c} key={i} />
        ))}
      </div>
    </div>
  );
}
