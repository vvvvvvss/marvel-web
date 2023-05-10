"use client";
import { Button, LoadingPulser, TextField } from "ui";
import { FullScreenDialog } from "ui";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useMutation } from "react-query";
import { MarkdownEditor } from "../../../components/MarkdownEditor";
import { useRouter } from "next/navigation";

const ReportWriter = ({ work }) => {
  const router = useRouter();
  const sessionUser = useSession().data?.user;
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const { isLoading: isCreating, mutate: createReport } = useMutation(
    async () =>
      (
        await axios.post("/api/report/create?workId=" + work?.id, {
          formData,
        })
      ).data,
    {
      onSuccess: (data) => {
        setFormData({ title: "", content: "" });
        setModalOpen((p) => !p);
        console.log(data);
        router.replace(`/work/${work?.id}/${data?.reportId}`);
      },
      onError: (data: any) => {
        alert(data?.response?.data?.message || "Something went wrong");
      },
    }
  );

  if (
    sessionUser &&
    work?.People?.map(
      (p) => p?.status == "ACTIVE" && p?.role == "AUTHOR" && p?.personId
    ).includes(sessionUser?.id)
  ) {
    return (
      <>
        <Button variant="standard" onPress={() => setModalOpen(true)}>
          Write Report!
        </Button>
        {modalOpen && (
          <FullScreenDialog
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          >
            <div className="w-full pb-24">
              <form onSubmit={(e) => e.preventDefault()} className="pt-10">
                {!(
                  work?.typeOfWork === "PROJECT" && work?._count?.Reports === 0
                ) && (
                  <TextField
                    id="title"
                    maxLength={190}
                    isRequired
                    fullWidth
                    placeholder="Title of the Report..."
                    value={formData?.title}
                    onChange={(e) => setFormData({ ...formData, title: e })}
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
                    isDisabled={isCreating}
                    className={`float-right m-5 ${
                      isCreating ? "animate-pulse" : "animate-none"
                    }`}
                    onPress={() => createReport()}
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
