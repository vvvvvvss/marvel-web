import Link from "next/link";
import { Window, Button, Paper, MarvelLogo } from "ui";
import { TrackDescription } from "../types";
import { Metadata } from "next";
import TracksButton from "../components/TracksButton";
import Spline from "@splinetool/react-spline";
import Minchu3D from "../components/Minchu3D";

//seo
export const metadata: Metadata = {
  title: "marvel.",
  description: "UVCE's own Makerspace",
  applicationName: "UVCE Marvel",
  authors: [{ name: "UVCE" }, { name: "UVCE MARVEL" }],
  category: "Education and Research",
  icons: {
    icon: "/images/icon.png",
    shortcut: "/images/icon.png",
    apple: "/images/icon.png",
  },
  keywords: [
    "UVCE",
    "UVCE MARVEL",
    "University of visveswaraya college of engineering",
    "Makerspace for advanced research vital education and learning",
    "AIML",
    "cloud computing",
    "cyber security",
    "design and prototyping",
    "IOT",
    "Renewable energy",
  ],
  openGraph: {
    type: "website",
    title: "marvel.",
    description: "UVCE's own Makerspace",
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

const tracks: TrackDescription[] = [
  {
    title: "Student",
    suffix: "Track",
    desc: "With Student Track, you'll be able to gain valuable experience in your areas of interest through a comprehensive, hands-on curriculum that utilizes Marvel's resources from the very beginning. The program is designed as a batch program and applications for enrollment will be accepted twice a year, giving students a unique opportunity to learn and grow with a cohort of like-minded individuals.",
    link: "/courses",
    buttonText: "Explore Courses",
  },
  {
    title: "Project",
    suffix: "Track",
    desc: "Project Track is for UVCE students with project ideas but limited resources. Marvel provides facilities and resources to support these projects. Interested students can submit an abstract, timeline, team details, and budget estimate for consideration. Marvel's team screens applications and selects candidates for an interview or abstract presentation. Selected teams work closely with Marvel to turn their ideas into reality.",
    link: "https://forms.gle/aiD3WWXUBngknHzX9",
    buttonText: "Apply with an Idea",
  },
  {
    title: "Competition",
    suffix: "Track",
    desc: "MARVEL's Competition Track supports UVCE students who want to participate in technical competitions across domains. Students can submit competition details and budget estimates, and MARVEL will screen and select promising entries. MARVEL provides resources such as financial assistance, mentorship, and guidance to ensure team success.",
    link: "https://forms.gle/Ds6EoHK7iYt6Ki6NA",
    buttonText: "Apply with an Idea",
  },
  {
    title: "Open Learner",
    suffix: "Programme",
    desc: "While admission to Marvel's Student Track is limited, we invite you to continue upskilling yourself through our Open Learner Programme. Access any of Marvel's courses, utilize your own resources, and complete the tasks at your own pace. Upon completion of the coursework and submission of the final report, you will receive a certificate that highlights your achievement and dedication to continuous learning.",
    link: "https://forms.gle/QCdFiTSu5K6hyysq5",
    buttonText: "Apply to OLP",
  },
];

export default function page() {
  return (
    <Window>
      {/*whole thing*/}
      <div className="w-full max-w-5xl flex flex-col pb-48">
        {/* hero box  */}
        <div className="relative flex flex-col md:flex-row min-h-screen gap-10 md:justify-center items-center p-10">
          <Minchu3D className="absolute z-0 w-full h-full" />

          <MarvelLogo className="z-10 aspect-square border border-p-6 shadow-2xl shadow-p-3 min-h-[280px] max-h-[280px] max-w-[280px]" />
          <div className="z-10">
            <div className="py-5 md:py-0 flex flex-wrap gap-3">
              <TracksButton />
              <Link href={"/courses"} className="flex-1 md:flex-auto">
                <Button variant="outlined" className="w-full">
                  Courses
                </Button>
              </Link>
              <Link href={"/events"} className="flex-1 md:flex-auto">
                <Button variant="outlined" className="w-full">
                  Events
                </Button>
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-auto"
                href={"https://www.playbook.com/s/marvel/uvce-marvel"}
              >
                <Button variant="outlined" className="w-full">
                  Annual Report 2022
                </Button>
              </Link>
            </div>
            <p className="text-p-0 dark:text-p-8 max-w-xl text-lg font-normal my-5 p-5 bg-p-9 dark:bg-p-1 rounded-lg">
              Makerspace for Advanced Research, Vital Education and Learning AKA
              Marvel at University of Visvesvaraya College of Engineering, is
              poised to spur genuine passion in every learner and redefine
              conventional education. The goal is to set the ball rolling,
              perpetuate a sense of innovation in students.
            </p>
          </div>
        </div>

        {/*tracks section*/}
        <div className="p-5">
          <h1
            id={"tracks"}
            className="capitalize tracking-widest text-p-0 dark:text-p-5 border-y border-p-5 dark:border-p-3 p-5"
          >
            TRACKS
          </h1>
          <div className="flex flex-col gap-10 py-10">
            {tracks?.map((t, i) => (
              <div
                className="p-5 flex flex-col md:flex-row w-full justify-between gap-5"
                key={i}
              >
                <h2 className="text-5xl flex-wrap leading-snug max-w-sm">
                  {t?.title}
                  <span className="text-p-5"> {t?.suffix}</span>
                </h2>
                <div className="max-w-sm flex flex-col gap-10">
                  <p className="text-p-0 dark:text-p-9">{t?.desc}</p>
                  <Link
                    href={t?.link}
                    target={t?.link?.startsWith("http") ? "_blank" : "_self"}
                    rel={
                      t?.link?.startsWith("http") ? "noopener noreferrer" : ""
                    }
                  >
                    <Button variant="outlined">{t?.buttonText}</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*events section*/}
        <div className="flex flex-col items-center justify-center md:flex-row gap-5 h-fit p-5">
          <Minchu3D className="max-h-96 rounded-lg aspect-square" />
          <div className="flex flex-col gap-5 w-full">
            <h2 className="text-5xl flex-wrap leading-snug ">
              Events
              <span className="text-p-5"> at Marvel</span>
            </h2>
            <p className="max-w-sm">
              Marvel conducts workshops, competitions, talks, and other events
              throughout the year. Please check our event page for updates on
              the latest events at Marvel.
            </p>
            <Link href={"/events"}>
              <Button>Go to Events Page</Button>
            </Link>
          </div>
        </div>
      </div>
    </Window>
  );
}
