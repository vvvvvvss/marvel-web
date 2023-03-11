import { Window } from "ui";

export default async function layout({ children, params }) {
  return (
    <Window className={"pt-5 md:pt-12 pb-40"}>
      <div className="w-full max-w-5xl flex flex-col p-5">
        <h1 className="text-3xl md:text-5xl px-3">
          <span className="text-p-5">Student Track / </span>
          <span className="text-p-9">Courses</span>
        </h1>
        <p className="w-full max-w-2xl text-lg py-12 text-p-9 px-3">
          An exhaustive list of courses across five domains at MARVEL:
          Artificial Intelligence & Machine Learning, Internet of Things, Cloud
          Computing and Cybersecurity, Design & Prototyping, and Renewable
          Energy Tech.
        </p>
        {children}
      </div>
    </Window>
  );
}
