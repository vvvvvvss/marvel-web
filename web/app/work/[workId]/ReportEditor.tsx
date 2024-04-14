"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  FullScreenDialog,
  TextField,
  LoadingPulser,
  Button,
} from "@marvel/ui/ui";

import { MarkdownEditor } from "../../../components/MarkdownEditor";
import { useRouter } from "next/navigation";

const ReportEditor = ({ report, work }) => {
  const router = useRouter();
  const sessionUser = useSession().data?.user;
  const [modalOpen, setModalOpen] = useState(false);
  const [changed, setChanged] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    title: report?.title,
    content: report?.content,
  });

  const { isPending: isUpdating, mutate: updateReport } = useMutation({
    mutationFn: async () =>
      (
        await axios.post("/api/report/edit?id=" + report?.id, {
          formData,
        })
      ).data,
    onSuccess: () => {
      router.refresh();
      setChanged(false);
      setModalOpen((p) => !p);
    },
    onError: (data: any) => {
      alert(data?.response?.data?.message);
    },
  });

  if (
    work?.People?.filter((p) => p?.status === "ACTIVE")
      .map((p) => p?.personId)
      .includes(sessionUser?.id) ||
    sessionUser?.scope?.map((s) => s.scope).includes("ADMIN")
  ) {
    return (
      <>
        <Button variant="standard" onPress={() => setModalOpen(true)}>
          Edit Report
        </Button>
        {modalOpen && (
          <FullScreenDialog
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          >
            <div className="w-full pb-24">
              <form onSubmit={(e) => e.preventDefault()} className="pt-10">
                {!(work?.typeOfWork === "PROJECT" && report?.isOverview) && (
                  <TextField
                    isRequired
                    id="title"
                    fullWidth
                    placeholder="Title of the Report..."
                    value={formData?.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e });
                      setChanged(true);
                    }}
                    maxLength={190}
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
                    isDisabled={isUpdating || !changed}
                    className={`float-right m-5 ${
                      isUpdating ? "animate-pulse" : "animate-none"
                    }`}
                    onPress={() => updateReport()}
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
