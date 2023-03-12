import { ReactNode } from "react";
import { Window, Paper, Button } from "ui";
import { Avatar } from "../../../components/Avatar";
import dbClient from "../../../utils/dbConnector";
import Manager from "./UserManager";
import { ScopeEnum } from "database";

const getUserBySlug = async (slug: string) => {
  const person = await dbClient.people.findFirst({
    where: {
      slug: slug,
    },
    select: {
      slug: true,
      name: true,
      profilePic: true,
      scope: {
        select: {
          scope: true,
        },
      },
    },
  });
  return person;
};

export async function generateStaticParams() {
  return [];
}
export const dynamicParams = true;

export default async function layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { profileSlug?: String };
}) {
  const dude = await getUserBySlug(params?.profileSlug as string);
  return (
    <>
      <Window className="pt-10">
        {/* whole thing  */}
        <Paper className="w-full max-w-5xl mx-5 flex flex-col items-center md:flex-row md:items-start gap-5">
          {/* left part  */}
          <div className="w-full flex flex-col gap-5 max-h-min sm:max-w-xs">
            <Paper
              shadow
              border
              className="w-full max-h-min rounded-lg p-5 flex-1"
            >
              {/* picture and name  */}
              <div className="flex items-center pb-5">
                <Avatar
                  src={dude?.profilePic}
                  className="border-[1.5px] dark:border border-p-0 dark:border-p-6"
                  alt={dude?.name}
                />
                <h1 className="ml-5 text-xl">{dude?.name}</h1>
              </div>
              {/* coordinating courses */}
              {["ADMIN", "CRDN"].some((s) =>
                dude?.scope
                  ?.map((dudeScope) => dudeScope?.scope)
                  .includes(s as ScopeEnum)
              ) && (
                <div className="flex items-center border-t pt-5 max-w-full overflow-x-auto border-p-3">
                  <Button
                    variant="outlined"
                    className="mr-3 text-sm pointer-events-none"
                  >
                    Coordinator
                  </Button>
                </div>
              )}
            </Paper>
            <Manager dude={dude} />
          </div>

          {/* right box  */}
          <div className="w-full">{children}</div>
        </Paper>
      </Window>
    </>
  );
}
