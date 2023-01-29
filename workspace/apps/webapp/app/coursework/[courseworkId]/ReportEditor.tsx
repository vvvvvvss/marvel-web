'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
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

const ReportEditor = ({ report }) => {
  const sessionUser = useSession().data?.user;
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: report?.title,
    content: report?.content,
  });

  const { data: work, isLoading: isWorkLoading } = useQuery(
    ['work', report?.workId],
    async () =>
      (await axios.get('/api/get/work?id=' + report?.workId)).data?.work,
    {
      enabled: !!sessionUser?.id,
    }
  );

  const {
    data: submitResult,
    isLoading: isUpdating,
    mutate: updateReport,
  } = useMutation(
    async () =>
      (
        await axios.post('/api/update/level-report?reportId=' + report?.id, {
          formData,
        })
      ).data,
    {
      onSuccess: () => {
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
              <IconButton onClick={() => setModalOpen((p) => !p)}>
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
