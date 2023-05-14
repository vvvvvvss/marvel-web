"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { Button, IconButton } from "../../../components/clientComponents";
import { FullScreenDialog } from "../../../components/clientComponents";
import { useRouter } from "next/navigation";
import { ArticleFormData } from "../../../types";
import ArticleForm from "../../../components/forms/ArticleForm";

const ArticleEditor = ({ article }) => {
  const router = useRouter();
  const sessionUser = useSession().data?.user;
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<number>(0);
  const [formData, setFormData] = useState<ArticleFormData>({
    title: article?.title,
    caption: article?.caption,
    content: article?.content,
    courseIds: article?.Courses?.map((c) => c?.courseId),
    coverPhoto: article?.coverPhoto,
  });

  const { isLoading: isUpdating, mutate: updateArticle } = useMutation(
    async () =>
      (
        await axios.post("/api/article/edit?id=" + article?.id, {
          ...formData,
        })
      ).data,
    {
      onSuccess: () => {
        router.refresh();
        setModalOpen((p) => !p);
      },
      onError: (data: any) => {
        alert(data?.response?.data?.message);
      },
    }
  );

  const { isLoading: isDeleting, mutate: sendDelete } = useMutation(
    async () =>
      (await axios.delete(`/api/article/delete?id=${article?.id}`)).data,
    {
      onSuccess: () => {
        alert("Article successfully deleted.");
        router.refresh();
        router.back();
      },
      onError: () => {
        alert("Couldn't delete article");
      },
    }
  );

  if (
    //if not accepted request
    article?.People?.filter((p) => p?.status !== "PENDING")
      .map((p) => p?.personId)
      .includes(sessionUser?.id) ||
    sessionUser?.scope?.map((s) => s?.scope)?.includes("ADMIN")
  ) {
    return (
      <>
        <Button variant="standard" onPress={() => setModalOpen(true)}>
          Edit Article
        </Button>
        <Button
          variant="outlined"
          className="border border-[red]"
          isDisabled={isDeleting}
          onPress={() =>
            confirmDelete === 2 ? sendDelete() : setConfirmDelete((p) => p + 1)
          }
        >
          {confirmDelete === 0
            ? "Delete Article"
            : confirmDelete === 1
            ? "Are you sure?"
            : "Confirm."}
        </Button>
        {modalOpen && (
          <FullScreenDialog
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          >
            <div className="w-full p-5">
              <ArticleForm
                formData={formData}
                setFormData={setFormData}
                typeOfArticle={article?.typeOfArticle}
                onSubmit={updateArticle}
                submitDisabled={
                  isUpdating ||
                  isDeleting ||
                  (article?.typeOfArticle === "RESOURCE" &&
                    !formData?.courseIds?.length)
                }
                submitLabel="Update Article"
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

export default ArticleEditor;
