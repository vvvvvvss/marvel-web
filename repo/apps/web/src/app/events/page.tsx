import { Metadata } from "next";
import dbClient from "../../utils/dbConnector";
import { Window } from "ui";

const getEventsList = async () => {
  const eventList = await dbClient.event.findMany({
    where: {
      publishStatus: "PUBLIC",
    },
    select: {
      id: true,
      title: true,
      typeOfEvent: true,
      caption: true,
      coverPhoto: true,
      eventStartTime: true,
      eventEndTime: true,
      registrationStartTime: true,
      registrationEndTime: true,
    },
    take: 20,
  });
  return eventList;
};

export const metadata: Metadata = {
  title: "Events. | UVCE MARVEL",
  description: "Events, Workshops, Competitions and Talks at UVCE MARVEL",
  openGraph: {
    type: "website",
    title: "Events. | UVCE MARVEL",
    description: "Events, Workshops, Competitions and Talks at UVCE MARVEL",
    images: [
      {
        url: "https://res.cloudinary.com/marvelweb/image/upload/v1679946683/Frame_1_kjxodv.jpg",
        secureUrl:
          "https://res.cloudinary.com/marvelweb/image/upload/v1679946683/Frame_1_kjxodv.jpg",
        type: "image/jpeg",
        width: 800,
        height: 800,
      },
    ],
  },
};

export default async function page({ params }) {
  console.log(params);
  const eventList = await getEventsList();
  return (
    <Window className={"pt-5 md:pt-12 pb-40"}>
      <div className="w-full max-w-5xl flex flex-col p-5">
        <h1 className="text-3xl md:text-5xl px-3">
          <span className="text-p-0 dark:text-p-9">events</span>
          <span className="text-p-4 dark:text-p-5">at marvel.</span>
        </h1>
        <p className="w-full max-w-2xl text-lg py-12 text-p-0 dark:text-p-9 px-3">
          Events, Workshops, Competitions and Talks at UVCE MARVEL.
        </p>
        <div className="flex w-full gap-5 flex-wrap mt-5">
          {eventList?.map((e, i) => (
            <div key={i}>{e?.id}</div>
          ))}
        </div>
      </div>
    </Window>
  );
}
