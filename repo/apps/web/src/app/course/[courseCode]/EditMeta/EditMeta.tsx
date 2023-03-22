"use client";
import { Button, FullScreenDialog, IconButton, Paper, TextField } from "ui";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { VscSettings as ManageIcon } from "react-icons/vsc";
import { VscClose as CloseIcon } from "react-icons/vsc";
import ImageCompressor from "browser-image-compression";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { CourseFormData } from "../../../../types";
import ImageUploader from "../../../../components/ImageUploader";

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
  const [changed, setChanged] = useState(false);

  const handleImageUpload = async (imageList) => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1080,
      useWebWorker: true,
    };
    const compressedImage = await ImageCompressor(imageList[0]?.file, options);
    const reader = new FileReader();
    reader.readAsDataURL(compressedImage);
    reader.onloadend = () => {
      setCopy({
        ...copy,
        coverPhoto: reader?.result as CourseFormData["coverPhoto"],
      });
    };
  };

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

              <form
                className="my-5 flex flex-col pb-56"
                onSubmit={(e) => e.preventDefault()}
              >
                <>
                  <label htmlFor="name" className="text-3xl py-3">
                    GitHub Repo URL
                  </label>
                  <TextField
                    id="repoURL"
                    value={copy?.repoURL}
                    onChange={(e) => {
                      setCopy({ ...copy, repoURL: e.target?.value });
                      setChanged(true);
                    }}
                    placeholder="link to the GitHub Repo that has course data."
                    maxLength={60}
                  />
                </>
                <label htmlFor="caption" className="text-3xl py-3">
                  Caption
                </label>
                <TextField
                  id="caption"
                  value={copy?.caption}
                  onChange={(e) => {
                    setCopy({ ...copy, caption: e.target?.value });
                    setChanged(true);
                  }}
                  placeholder="Caption..."
                  maxLength={200}
                />
                <label htmlFor="caption" className="text-3xl py-3">
                  Course duration
                </label>
                <TextField
                  id="duration"
                  value={copy?.courseDuration}
                  onChange={(e) => {
                    setCopy({ ...copy, courseDuration: e.target?.value });
                    setChanged(true);
                  }}
                  placeholder="Course duration"
                  maxLength={20}
                />
                <ImageUploader
                  value={copy?.coverPhoto}
                  onClick={() => {
                    setCopy({ ...copy, coverPhoto: "" });
                    setChanged(true);
                  }}
                  onChange={(photo) => {
                    setCopy({ ...copy, coverPhoto: photo });
                    setChanged(true);
                  }}
                />
                <Button
                  className="max-w-max self-end"
                  disabled={isLoading || !changed}
                  onClick={() => mutate()}
                >
                  Update
                </Button>
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
export default EditMeta;
