'use client';

import { Button, FullScreenDialog, IconButton, LoadingPulser } from 'ui';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { VscClose as CloseIcon } from 'react-icons/vsc';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { MarkdownEditor } from 'ui/client';

type ReadMeEditorProp = { profileSlug: string; content: string };

const ReadMeEditor = ({ profileSlug, content }: ReadMeEditorProp) => {
  const session = useSession();
  const sessionUser = session?.data?.user;
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [copy, setCopy] = useState(content);
  const [changed, setChanged] = useState<boolean>(false);
  const router = useRouter();

  const { mutate: mutateReadMe, isLoading } = useMutation(
    async () =>
      (
        await axios.post(`/api/people/update-readme?slug=${profileSlug}`, {
          content: copy,
        })
      ).data,
    {
      onError: () => alert("Couldn't edit readme. loss"),
      onSuccess: () => {
        router.refresh();
        setChanged(false);
        setDialogOpen(false);
      },
    }
  );

  return (
    <>
      {((sessionUser?.slug === profileSlug &&
        sessionUser?.scope?.map((s) => s.scope)?.includes('PROFILE')) ||
        sessionUser?.scope?.map((s) => s.scope)?.includes('ADMIN')) && (
        <Button
          onClick={() => setDialogOpen((p) => !p)}
          variant="outlined"
          className="w-max mt-5 self-end"
        >
          Edit ReadMe
        </Button>
      )}
      {isDialogOpen && (
        <FullScreenDialog open={isDialogOpen}>
          <div className="w-full max-w-2xl py-24">
            <IconButton onClick={() => setDialogOpen((p) => !p)}>
              <CloseIcon className="h-10 w-20" />
            </IconButton>
            <MarkdownEditor
              value={copy}
              onChange={(e) => {
                setCopy(e?.target?.value);
                setChanged(true);
              }}
            />

            {/* action area  */}
            <div className="w-full pb-48">
              <Button
                disabled={isLoading || !changed}
                className={`float-right m-5 ${
                  isLoading ? 'animate-pulse' : 'animate-none'
                }`}
                onClick={() => mutateReadMe()}
              >
                <span className="flex items-center gap-3">
                  {isLoading && <LoadingPulser className="h-5" />}
                  Submit
                </span>
              </Button>
            </div>
          </div>
        </FullScreenDialog>
      )}
    </>
  );
};

export default ReadMeEditor;
