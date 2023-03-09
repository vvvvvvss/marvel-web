'use client';
import { Button, FullScreenDialog, LoadingPulser, TextField } from 'ui';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { IconButton } from 'ui';
import { VscClose as CloseIcon } from 'react-icons/vsc';
import { MarkdownEditor } from 'ui/client';
import { useRouter } from 'next/navigation';

const ReportWriter = ({ work }) => {
  const router = useRouter();
  const sessionUser = useSession().data?.user;
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const { isLoading: isCreating, mutate: createReport } = useMutation(
    async () =>
      (
        await axios.post('/api/report/create?workId=' + work?.id, {
          formData,
        })
      ).data,
    {
      onSuccess: (data) => {
        setFormData({ title: '', content: '' });
        setModalOpen((p) => !p);
        console.log(data);
        router.replace(`/work/${work?.id}/${data?.reportId}`);
      },
      onError: (data: any) => {
        alert(data?.response?.data?.message || 'Something went wrong');
      },
    }
  );

  if (
    sessionUser &&
    work?.People?.map(
      (p) => p?.status == 'ACTIVE' && p?.role == 'AUTHOR' && p?.personId
    ).includes(sessionUser?.id)
  ) {
    return (
      <>
        <Button variant="standard" onClick={() => setModalOpen(true)}>
          Write Report!
        </Button>
        {modalOpen && (
          <FullScreenDialog open={modalOpen}>
            <div className="w-full max-w-2xl py-24 gap-5">
              <IconButton onClick={() => setModalOpen((p) => !p)}>
                <CloseIcon className="h-10 w-20" />
              </IconButton>

              <form onSubmit={(e) => e.preventDefault()} className="pt-10">
                {!(
                  work?.typeOfWork === 'PROJECT' && work?._count?.Reports === 0
                ) && (
                  <TextField
                    id="title"
                    required
                    fullwidth
                    placeholder="Title of the Report..."
                    value={formData?.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                )}
                <MarkdownEditor
                  maxLength={15_000}
                  required
                  value={formData.content}
                  onChange={(e) => {
                    setFormData({ ...formData, content: e?.target?.value });
                  }}
                />
                {/* action area  */}
                <div className="w-full pb-48">
                  <Button
                    type="submit"
                    disabled={isCreating}
                    className={`float-right m-5 ${
                      isCreating ? 'animate-pulse' : 'animate-none'
                    }`}
                    onClick={() => createReport()}
                  >
                    <span className="flex gap-3 items-center">
                      {isCreating && <LoadingPulser className="h-5" />}
                      Submit
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

export default ReportWriter;
