"use client";
import { FullScreenDialog, Button, IconButton } from "@marvel/ui/ui";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { VscClose as CloseIcon } from "react-icons/vsc";
import { useMutation } from "@tanstack/react-query";
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

  const { data, isPending, mutate } = useMutation({
    mutationFn: async () =>
      (
        await axios.post("/api/course/create", {
          ...formData,
        })
      ).data,
    onError: (e: AxiosError) => alert(e.response?.data?.["message"]),
    onSuccess: (data: any) => {
      router.refresh();
      setModalOpen(false);
    },
  });

  //button will be visible to:
  //admins
  if (sessionUser?.scope?.map((s) => s.scope)?.includes("ADMIN")) {
    return (
      <>
        <Button onPress={() => setModalOpen((p) => !p)} variant="standard">
          Create New Course
        </Button>
        {modalOpen && (
          <FullScreenDialog
            className="z-10"
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          >
            <div className="w-full pb-48">
              <CourseForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={mutate}
                showCourseCode
                submitDisabled={isPending}
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
