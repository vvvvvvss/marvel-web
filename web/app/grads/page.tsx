import { Metadata } from "next";
import dbClient from "../../utils/dbConnector";
import { Avatar, Window } from "@marvel/ui/ui";
import Link from "next/link";

const getGradsListGroupByQuarter = async () => {
  const worksThatHaveAllApprovedReports = await dbClient.work.findMany({
    where: {
      AND: {
        typeOfWork: "COURSE",
        Reports: {
          every: {
            reviewStatus: "APPROVED"
          }
        }
      }
    },
    select: {
      courseCode: true,
      People: {
        select: {
          person: {
            select: {
              name: true,
              slug: true,
              profilePic: true,
            }
          }
        }
      },
      Reports: {
        select: {
          createdAt: true,
          isOverview: true,
        }
      }
    }
  });

  const gradsListGroupByQuarter = worksThatHaveAllApprovedReports?.reduce((acc, work) => {
    const date = work.Reports.find(r => r.isOverview)?.createdAt;
    if (!date) {
      return acc;
    }
    const quarter = `${date.getFullYear()} Q${Math.floor(date.getMonth() / 3) + 1}`;

    if (!acc[quarter]) {
      acc[quarter] = [];
    }

    acc[quarter].push(...work.People.map(person => ({
      ...person.person,
      courseCode: work.courseCode || "N/A",
    })));
    return acc;
  }, {} as Record<string, Array<{ name: string, slug: string, profilePic: string, courseCode: string }>>);

  return gradsListGroupByQuarter;
};

export const revalidate = 604800; // once a week

export const metadata: Metadata = {
  title: "Students Graduated from Student Track - from every Quarter. | UVCE MARVEL",
  description:
    "UVCE MARVEL's Student Track graduates across different Courses, from each Quarter.",
  openGraph: {
    type: "article",
    title: "Students Graduated from Student Track - from every Quarter. | UVCE MARVEL",
    description:
      "UVCE MARVEL's Student Track graduates across different Courses, from each Quarter.",
    images: [
      {
        url: "https://res.cloudinary.com/marvelweb/image/upload/v1678988482/Group_38_qrhqag.jpg",
        secureUrl:
          "https://res.cloudinary.com/marvelweb/image/upload/v1678988482/Group_38_qrhqag.jpg",
        type: "image/jpeg",
        width: 800,
        height: 800,
      },
    ],
  },
};

export default async function page() {
  const gradsListGroupByQuarter = await getGradsListGroupByQuarter();

  const sortedQuarter = Object.keys(gradsListGroupByQuarter).sort((a, b) => b.localeCompare(a));
  return (
    <Window className={"pt-5 md:pt-12 pb-40"}>
      <div className="w-full max-w-5xl flex flex-col p-5">
        <h1 className="text-3xl md:text-5xl px-3">
          <span className="text-p-4 dark:text-p-5">{"Student Track / "}</span>
          <span className="text-p-0 dark:text-p-9">{"Graduates"}</span>
        </h1>
        <p className="w-full text-lg py-12 text-p-0 dark:text-p-9 px-3">
          {"UVCE MARVEL's Student Track Graduates across different Courses, from each Quarter."}
        </p>
        <div className="flex flex-col w-full gap-5 flex-wrap mt-5">
          {sortedQuarter.map((quarter, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-5 border-b border-p-5 dark:border-p-2 pb-10">
              <div className="md:min-w-60">
                <h2 className="text-2xl md:text-3xl px-3">
                  {quarter}
                </h2>
              </div>
              <div className="flex-1 flex flex-wrap gap-5">
                {gradsListGroupByQuarter[quarter].map((grad, i) => (
                  <Link href={`/u/${grad.slug}/works`} key={i} className="flex items-center gap-2 hover:bg-p-8 dark:hover:bg-p-3 p-2 rounded-full transition-colors bg-p-9 dark:bg-p-2">
                    <Avatar src={grad.profilePic} alt={grad.name} />
                    <p className="text-lg pr-2">{grad.name}&nbsp;<span className="text-p-4 dark:text-p-5">from</span>&nbsp;{grad.courseCode}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Window>
  );
}
