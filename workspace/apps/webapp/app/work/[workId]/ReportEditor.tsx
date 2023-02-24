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
import { useRouter } from 'next/navigation';

const ReportEditor = ({ report, work }) => {
  const router = useRouter();
  const sessionUser = useSession().data?.user;
  const [modalOpen, setModalOpen] = useState(false);
  const [changed, setChanged] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    title: report?.title,
    content: report?.content,
  });

  const { isLoading: isUpdating, mutate: updateReport } = useMutation(
    async () =>
      (
        await axios.post('/api/report/edit?id=' + report?.id, {
          formData,
        })
      ).data,
    {
      onSuccess: () => {
        router.refresh();
        setChanged(false);
        setModalOpen((p) => !p);
      },
      onError: (data: any) => {
        alert(data?.response?.data?.message);
      },
    }
  );

  if (
    work?.People?.filter((p) => p?.status === 'ACTIVE')
      .map((p) => p?.personId)
      .includes(sessionUser?.id)
  ) {
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
                {!(work?.typeOfWork === 'PROJECT' && report?.isOverview) && (
                  <TextField
                    required
                    id="title"
                    fullwidth
                    placeholder="Title of the Report..."
                    value={formData?.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value });
                      setChanged(true);
                    }}
                  />
                )}
                <MarkdownEditor
                  required
                  maxLength={15_000}
                  value={formData.content}
                  onChange={(e) => {
                    setFormData({ ...formData, content: e?.target?.value });
                    setChanged(true);
                  }}
                />
                {/* action area  */}
                <div className="w-full pb-48">
                  <Button
                    type="submit"
                    disabled={isUpdating || !changed}
                    className={`float-right m-5 ${
                      isUpdating ? 'animate-pulse' : 'animate-none'
                    }`}
                    onClick={() => updateReport()}
                  >
                    <span className="flex items-center gap-3">
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
