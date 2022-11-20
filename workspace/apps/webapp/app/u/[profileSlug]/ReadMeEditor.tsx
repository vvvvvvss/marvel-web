'use client';

import {
  Button,
  FullScreenDialog,
  Tab,
  TabGroup,
  IconButton,
  MarkdownRender,
} from '@marvel/web-ui';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { VscClose as CloseIcon } from 'react-icons/vsc';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type ReadMeEditorProp = { profileSlug: string; content: string };

const sendEdit = async ({ slug, content }) => {
  const data = (await axios.post(`/api/mutate/profile`, { slug, content }))
    .data;
  return data;
};

const ReadMeEditor = ({ profileSlug, content }: ReadMeEditorProp) => {
  const currentUser = useSession();
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [editorMode, setEditorMode] = useState<'write' | 'preview'>('write');
  const [copy, setCopy] = useState(content);
  const router = useRouter();

  const { mutate: mutateReadMe } = useMutation(
    () => sendEdit({ slug: profileSlug, content: copy }),
    {
      onError: () => alert("Couldn't edit readme. loss"),
      onSuccess: () => router.refresh(),
    }
  );

  return (
    <>
      {currentUser?.data?.user?.slug === profileSlug && (
        <Button
          onClick={() => setMode(mode === 'view' ? 'edit' : 'view')}
          variant="outlined"
        >
          {mode === 'view' ? 'Edit ReadMe' : 'Cancel'}
        </Button>
      )}
      {mode === 'edit' && (
        <FullScreenDialog open={mode == 'edit'}>
          <div className="w-full max-w-2xl py-24">
            <IconButton onClick={() => setMode('view')}>
              <CloseIcon className="h-10 w-20" />
            </IconButton>
            <TabGroup className="my-5">
              <Tab
                active={editorMode === 'write'}
                onClick={() => setEditorMode('write')}
              >
                write
              </Tab>
              <Tab
                active={editorMode === 'preview'}
                onClick={() => setEditorMode('preview')}
              >
                preview
              </Tab>
            </TabGroup>
            {editorMode == 'write' ? (
              <textarea
                className="p-5 pb-10 rounded-lg w-full min-h-[300px]"
                onChange={(e) => setCopy(e.target?.value)}
                value={copy}
              />
            ) : (
              <MarkdownRender content={copy} />
            )}

            {/* action area  */}
            <div className="w-full">
              <Button
                className="float-right m-5"
                onClick={() => mutateReadMe()}
              >
                Submit
              </Button>
            </div>
          </div>
        </FullScreenDialog>
      )}
    </>
  );
};

export default ReadMeEditor;
