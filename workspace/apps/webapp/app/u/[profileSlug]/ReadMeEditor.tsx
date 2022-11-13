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

type ReadMeEditorProp = { profileSlug: string; content: string };

const ReadMeEditor = ({ profileSlug, content }: ReadMeEditorProp) => {
  const currentUser = useSession();
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [editorMode, setEditorMode] = useState<'write' | 'preview'>('write');
  const [copy, setCopy] = useState(content);

  return (
    <>
      {currentUser?.data?.user?.slug === profileSlug && (
        <Button
          onClick={() => setMode(mode === 'view' ? 'edit' : 'view')}
          variant="outlined"
          className="ml-5 mt-5"
        >
          {mode === 'view' ? 'Edit ReadMe' : 'Cancel'}
        </Button>
      )}
      {mode === 'edit' && (
        <FullScreenDialog open={mode == 'edit'}>
          <div className="w-full max-w-2xl pt-24">
            <IconButton onClick={() => setMode('view')}>
              <CloseIcon className="h-10 w-20" />
            </IconButton>
            <TabGroup className="mt-5">
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
                className="p-5 pb-10 my-5 rounded-lg w-full min-h-[300px]"
                onChange={(e) => setCopy(e.target?.value)}
              >
                {copy}
              </textarea>
            ) : (
              <MarkdownRender className="my-5" content={copy} />
            )}
          </div>
        </FullScreenDialog>
      )}
    </>
  );
};

export default ReadMeEditor;
