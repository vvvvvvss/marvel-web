import { Window } from "ui";

export default async function layout({ children, params }) {
  return <Window className={"pt-5 md:pt-12 pb-40"}>{children}</Window>;
}
