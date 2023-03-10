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
    <div className="flex w-full gap-5 flex-wrap mt-5">
      {courseList?.map((c, i) => (
        <CourseCard data={c} key={i} />
      ))}
    </div>
  );
}
