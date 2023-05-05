"use client";
import { IconButton } from "ui";
import { FullScreenDialog } from "ui";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { VscSettings as ManageIcon } from "react-icons/vsc";
import { VscClose as CloseIcon } from "react-icons/vsc";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { CourseFormData } from "../../../../types";
import CourseForm from "../../../../components/forms/CourseForm";
import CourseDeleter from "./CourseDeleter";

const EditMeta = ({ course }) => {
  const sessionUser = useSession()?.data?.user;
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const [copy, setCopy] = useState<CourseFormData>({
    courseDuration: course?.courseDuration,
    caption: course?.caption,
    coverPhoto: course?.coverPhoto,
    repoURL: course?.repoURL,
  });

  const { data, isLoading, mutate } = useMutation(
    async () =>
      (
        await axios.post("/api/course/edit-meta?courseId=" + course?.id, {
          ...copy,
        })
      ).data,
    {
      onError: (e: AxiosError) => alert(e.response?.data?.["message"]),
      onSuccess: (data: any) => {
        router.refresh();
        setModalOpen(false);
      },
    }
  );

  //button will be visible to:
  //admins
  if (sessionUser?.scope?.map((s) => s.scope)?.includes("ADMIN")) {
    return (
      <>
        <IconButton
          onClick={() => setModalOpen((p) => !p)}
          variant="standard"
          className="absolute top-3 right-2 text-sm"
        >
          <ManageIcon className="h-5 w-5" />
        </IconButton>
        {modalOpen && (
          <FullScreenDialog
            className="z-10"
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          >
            <div className="w-full max-w-2xl pt-24 gap-5 ">
              <IconButton
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                <CloseIcon className="h-10 w-20" />
              </IconButton>

              <div className="w-full pb-56">
                <CourseForm
                  formData={copy}
                  setFormData={setCopy}
                  onSubmit={mutate}
                  submitDisabled={isLoading}
                  submitLabel="Update Course"
                />
                <hr className="border-p-0 dark:border-p-6 my-5" />
                {sessionUser?.scope?.map((s) => s.scope)?.includes("ADMIN") && (
                  <CourseDeleter course={course} />
                )}
              </div>
            </div>
          </FullScreenDialog>
        )}
      </>
    );
  } else {
    return <div></div>;
  }
};
export default EditMeta;
