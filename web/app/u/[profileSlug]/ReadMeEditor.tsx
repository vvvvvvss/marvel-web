"use client";

import { FullScreenDialog, LoadingPulser, Button } from "@marvel/ui/ui";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MarkdownEditor } from "@marvel/ui/ui";

type ReadMeEditorProp = { profileSlug: string; content: string };

const ReadMeEditor = ({ profileSlug, content }: ReadMeEditorProp) => {
  const session = useSession();
  const sessionUser = session?.data?.user;
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [copy, setCopy] = useState(content);
  const [changed, setChanged] = useState<boolean>(false);
  const router = useRouter();

  const { mutate: mutateReadMe, isPending } = useMutation({
    mutationFn: async () =>
      (
        await axios.post(`/api/people/update-readme?slug=${profileSlug}`, {
          content: copy,
        })
      ).data,
    onError: () => alert("Couldn't edit readme. loss"),
    onSuccess: () => {
      router.refresh();
      setChanged(false);
      setDialogOpen(false);
    },
  });

  return (
    <>
      {((sessionUser?.slug === profileSlug &&
        sessionUser?.scope?.map((s) => s.scope)?.includes("PROFILE")) ||
        sessionUser?.scope?.map((s) => s.scope)?.includes("ADMIN")) && (
        <Button
          onPress={() => setDialogOpen((p) => !p)}
          variant="outlined"
          className="w-max mt-5 self-end"
        >
          Edit ReadMe
        </Button>
      )}
      {isDialogOpen && (
        <FullScreenDialog
          open={isDialogOpen}
          onClose={() => setDialogOpen(false)}
        >
          <MarkdownEditor
            className="min-w-full"
            value={copy}
            onChange={(e) => {
              setCopy(e?.target?.value);
              setChanged(true);
            }}
          />

          {/* action area  */}
          <div className="w-full pb-48">
            <Button
              isDisabled={isPending || !changed}
              className={`float-right m-5 ${
                isPending ? "animate-pulse" : "animate-none"
              }`}
              onPress={() => mutateReadMe()}
            >
              <span className="flex items-center gap-3">
                {isPending && <LoadingPulser className="h-5" />}
                Submit
              </span>
            </Button>
          </div>
        </FullScreenDialog>
      )}
    </>
  );
};

export default ReadMeEditor;
