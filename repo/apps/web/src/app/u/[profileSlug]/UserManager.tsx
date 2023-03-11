"use client";

import { Button, FullScreenDialog, IconButton, Paper } from "ui";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { VscClose as CloseIcon } from "react-icons/vsc";
import {
  AiOutlineMinusCircle as MinusIcon,
  AiOutlinePlusCircle as PlusIcon,
} from "react-icons/ai";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Scope, ScopeEnum } from "@prisma/client";

const Manager = ({ dude }: { dude: any }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const session = useSession();
  const sessionUser = session?.data?.user;
  const router = useRouter();

  const { mutate: sendMutation, isLoading } = useMutation(
    async (args: { action: "add" | "remove"; scope: ScopeEnum }) =>
      (
        await axios.post(
          `/api/people/manage-scope?slug=${dude?.slug}&scope=${args.scope}&action=${args.action}`
        )
      ).data,
    {
      onError: () => alert("Couldn't update user. loss"),
      onSuccess: () => {
        router.refresh();
      },
    }
  );

  if (
    sessionUser?.scope?.map((s) => s.scope)?.includes("CRDN") ||
    sessionUser?.scope?.map((s) => s.scope)?.includes("ADMIN")
  ) {
    return (
      <>
        <div className="w-full">
          <Button onClick={() => setDialogOpen((p) => !p)}>Manage User</Button>
        </div>
        {dialogOpen && (
          <FullScreenDialog open={dialogOpen} className="z-10">
            <div className="w-full max-w-2xl py-24">
              <IconButton
                className="mb-5"
                onClick={() => {
                  setDialogOpen((p) => !p);
                  return;
                }}
              >
                <CloseIcon className="h-10 w-20" />
              </IconButton>
              <div
                className={isLoading ? "opacity-60 pointer-events-none" : ""}
              >
                {(sessionUser?.scope?.map((s) => s.scope)?.includes("ADMIN") ||
                  sessionUser?.scope
                    ?.map((s) => s.scope)
                    ?.includes("CRDN")) && (
                  <div>
                    <Paper
                      border
                      shadow
                      className="rounded-lg pl-5 pt-5 min-h-[60px] mt-5"
                    >
                      {dude?.scope?.map((s: Scope, i) => (
                        <Button
                          key={i}
                          onClick={() =>
                            sendMutation({ action: "remove", scope: s?.scope })
                          }
                          variant="outlined"
                          className="mr-5 mb-5 inline-flex items-center gap-2"
                        >
                          <MinusIcon />
                          {s.scope}
                        </Button>
                      ))}
                    </Paper>
                    <div className="pl-5 pt-5">
                      {[
                        "PROFILE",
                        ...(sessionUser?.scope
                          ?.map((s) => s.scope)
                          ?.includes("ADMIN")
                          ? ["CRDN", "ADMIN"]
                          : []),
                      ].map(
                        (s: ScopeEnum, i) =>
                          !dude?.scope?.map((s) => s.scope)?.includes(s) && (
                            <Button
                              key={i}
                              onClick={() =>
                                sendMutation({ action: "add", scope: s })
                              }
                              variant="outlined"
                              className="mr-5 mb-5 inline-flex items-center gap-2"
                            >
                              <PlusIcon />
                              {s}
                            </Button>
                          )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </FullScreenDialog>
        )}
      </>
    );
  }
};

export default Manager;
