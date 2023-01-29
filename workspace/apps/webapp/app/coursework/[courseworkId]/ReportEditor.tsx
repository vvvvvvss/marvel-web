'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import {
  Button,
  TextField,
  FullScreenDialog,
  IconButton,
  LoadingPulser,
} from '@marvel/web-ui';
import { MarkdownEditor } from '@marvel/web-ui/client';
import { VscClose as CloseIcon } from 'react-icons/vsc';
import { useRouter, useSearchParams } from 'next/navigation';

const ReportEditor = ({ report, work }) => {
  const router = useRouter();
  const sessionUser = useSession().data?.user;
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: report?.title,
    content: report?.content,
  });
  const levelNo = useSearchParams().get('level');

  useEffect(() => {
    setFormData({ title: report?.title, content: report?.content });
  }, [levelNo]);

  const { isLoading: isUpdating, mutate: updateReport } = useMutation(
    async () =>
      (
        await axios.post('/api/mutate/level-report?reportId=' + report?.id, {
          formData,
        })
      ).data,
    {
      onSuccess: () => {
        router.refresh();
        setModalOpen((p) => !p);
      },
    }
  );

  const workWriter = work?.authors?.find((a) => a?.role === 'WRITER');
  if (sessionUser && workWriter?.googleId === sessionUser?.googleId) {
    return (
      <>
        <Button variant="standard" onClick={() => setModalOpen(true)}>
          Edit Report
        </Button>
        {modalOpen && (
          <FullScreenDialog open={modalOpen}>
            <div className="w-full max-w-2xl py-24 gap-5">
              <IconButton
                onClick={() => {
                  setModalOpen((p) => !p);
                }}
              >
                <CloseIcon className="h-10 w-20" />
              </IconButton>

              <form onSubmit={(e) => e.preventDefault()} className="pt-10">
                <TextField
                  required
                  id="title"
                  fullwidth
                  placeholder="Title of the Report..."
                  value={formData?.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
                <MarkdownEditor
                  required
                  maxLength={15_000}
                  value={formData.content}
                  onChange={(e) => {
                    setFormData({ ...formData, content: e?.target?.value });
                  }}
                />
                {/* action area  */}
                <div className="w-full pb-48">
                  <Button
                    type="submit"
                    disabled={isUpdating}
                    className={`float-right m-5 ${
                      isUpdating ? 'animate-pulse' : 'animate-none'
                    }`}
                    onClick={() => updateReport()}
                  >
                    <span className="flex">
                      {isUpdating && <LoadingPulser className="h-5" />}
                      Update
                    </span>
                  </Button>
                </div>
              </form>
            </div>
          </FullScreenDialog>
        )}
      </>
    );
  } else {
    return <div></div>;
  }
};

export default ReportEditor;
