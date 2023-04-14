"use client";
import { Button, FullScreenDialog, IconButton } from "ui";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { VscClose as CloseIcon } from "react-icons/vsc";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { CourseFormData } from "../../types";
import CourseForm from "../../components/forms/CourseForm";

const CourseCreator = () => {
  const sessionUser = useSession()?.data?.user;
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState<CourseFormData>({
    courseCode: "",
    courseDuration: "",
    caption: "",
    coverPhoto: "",
    repoURL: "",
  });

  const { data, isLoading, mutate } = useMutation(
    async () =>
      (
        await axios.post("/api/course/create", {
          ...formData,
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
        <Button onClick={() => setModalOpen((p) => !p)} variant="standard">
          Create New Course
        </Button>
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

              <CourseForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={mutate}
                showCourseCode
                submitDisabled={isLoading}
                submitLabel="Create New Course"
              />
            </div>
          </FullScreenDialog>
        )}
      </>
    );
  } else {
    return <div></div>;
  }
};
export default CourseCreator;
