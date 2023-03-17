import { Metadata } from "next";
import { Window } from "ui";

export const metadata: Metadata = {
  title: "List of all Courses. | UVCE MARVEL",
  description:
    "An exhaustive list of courses across five domains at MARVEL: Artificial Intelligence & Machine Learning, Internet of Things, Cloud Computing and Cybersecurity, Design & Prototyping, and Renewable Energy Tech.",
};

export default async function layout({ children, params }) {
  return <Window className={"pt-5 md:pt-12 pb-40"}>{children}</Window>;
}
