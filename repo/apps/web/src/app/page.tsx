import Link from "next/link";
import { Window, Button, Paper, MarvelLogo } from "ui";
import { TrackDescription } from "../types";

const tracks: TrackDescription[] = [
  {
    title: "Project Track",
    desc: "Project Track is for students of UVCE who have a project idea but not the resources. MARVEL will cater to their needs, by providing its facilities and resources. In project track, students submit an abstract of the project, tentative timeline of the project, team details, and budget estimate. Team MARVEL shall screen the applications. After screening and interview/ abstract presentation, teams shall be a part of MARVEL.",
    link: "https://forms.gle/aiD3WWXUBngknHzX9",
    buttonText: "Apply",
  },
  {
    title: "Student Track",
    desc: "Here, you will have the opportunity to dive deep into your areas of interest, learning from the ground up through exciting projects and activities. Whether you're interested in robotics, 3D printing, electronics, or any other area of engineering, our Makerspace is the perfect place to develop your skills and passions. Join a community of like-minded students and researchers, and take your engineering education to the next level. Applications will be open once every 6 months to join the student batch.",
    link: "/courses",
    buttonText: "Explore Courses",
  },
  {
    title: "Competition Track",
    desc: "MARVEL offers support to UVCE students who wish to participate in technical competitions accross domains through the Competition Track. Students can submit their competition details, including the required budget estimate, and MARVEL will screen and select the most promising entries. MARVEL will then provide necessary resources such as financial assistance, mentorship, and guidance to ensure the success of the team in the competition.",
    link: "https://forms.gle/Ds6EoHK7iYt6Ki6NA",
    buttonText: "Apply",
  },
];

export default function page() {
  return (
    <Window>
      {/*whole thing*/}
      <div className="w-full max-w-5xl flex flex-col pb-48">
        {/* hero box  */}
        <div className="flex flex-col md:flex-row h-screen max-h-screen gap-10 md:justify-center items-center p-10">
          <MarvelLogo className="border border-p-6 shadow-2xl shadow-p-3 min-w-[300px] min-h-[300px] max-w-full flex-1 md:max-w-[300px] md:max-h-[300px]" />
          <div>
            <div className="py-5 md:py-0 flex flex-wrap gap-3">
              <Button className="text-sm flex-1">About</Button>
              <Button className="text-sm flex-1">Tracks</Button>
              <Link href={"/courses"} target="_blank" rel="noopener noreferrer">
                <Button className="text-sm flex-1">Courses</Button>
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={"https://www.playbook.com/s/marvel/uvce-marvel"}
              >
                <Button className="text-sm flex-1">Annual Report 2022</Button>
              </Link>
              <Button className="text-sm flex-1">Contact</Button>
            </div>
            <p className="text-p-8 max-w-xl text-lg font-normal py-5">
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
          <h1 className="capitalize tracking-widest text-2xl text-p-5 border-y border-p-4 p-5">
            TRACKS
          </h1>
          <div className="flex gap-5 flex-wrap mt-5">
            {tracks?.map((t, i) => (
              <Paper
                key={i}
                border
                className="bg-p-1 rounded-lg p-5 flex flex-col gap-3 flex-1 max-h-fit justify-between"
              >
                <h2 className="text-2xl">{t?.title}</h2>
                <hr className="border-p-5" />
                <p className="text-sm text-p-9">{t?.desc}</p>
                <Link
                  href={t?.link}
                  target={t?.link?.startsWith("http") ? "_blank" : "_self"}
                  rel={t?.link?.startsWith("http") ? "noopener noreferrer" : ""}
                >
                  <Button variant="outlined" className="w-full">
                    {t?.buttonText}
                  </Button>
                </Link>
              </Paper>
            ))}
          </div>
        </div>
      </div>
    </Window>
  );
}
