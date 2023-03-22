import { Metadata } from "next";
import { Window } from "ui";

export const metadata: Metadata = {
  title: "List of all Courses. | UVCE MARVEL",
  description:
    "An exhaustive list of courses across five domains at MARVEL: Artificial Intelligence & Machine Learning, Internet of Things, Cloud Computing and Cybersecurity, Design & Prototyping, and Renewable Energy Tech.",
  openGraph: {
    type: "book",
    title: "List of all Courses. | UVCE MARVEL",
    description:
      "An exhaustive list of courses across five domains at MARVEL: Artificial Intelligence & Machine Learning, Internet of Things, Cloud Computing and Cybersecurity, Design & Prototyping, and Renewable Energy Tech.",
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

export default async function layout({ children, params }) {
  return <Window className={"pt-5 md:pt-12 pb-40"}>{children}</Window>;
}
