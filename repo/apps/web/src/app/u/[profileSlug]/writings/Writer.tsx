"use client";

import {
  FullScreenDialog,
  Button,
} from "../../../../components/clientComponents";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { ArticleFormData } from "../../../../types";
import { TypeOfArticle, ScopeEnum } from "@prisma/client";
import ArticleForm from "../../../../components/forms/ArticleForm";

const Writer = ({ authorSlug }: { authorSlug: string }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const sessionUser = useSession()?.data?.user;
  const [formData, setFormData] = useState<ArticleFormData>({
    title: "",
    caption: "",
    content: "",
    courseIds: [],
    coverPhoto: "",
  });
  const [formType, setFormType] = useState<TypeOfArticle>("BLOG");
  const router = useRouter();

  useEffect(() => {
    setFormData({
      title: "",
      caption: "",
      content: "",
      courseIds: [],
      coverPhoto: "",
    });
  }, [formType]);

  const { mutate: sendMutation, isLoading: isCreateLoading } = useMutation(
    async () =>
      (
        await axios.post(`/api/article/create?type=${formType}`, {
          ...formData,
        })
      ).data,
    {
      onError: (e: AxiosError) =>
        alert(e?.response?.data?.["message"] || "Something went wrong."),
      onSuccess: () => {
        router.refresh();
        setDialogOpen(false);
      },
    }
  );

  if (sessionUser?.slug == authorSlug) {
    return (
      <>
        <div className="flex flex-wrap gap-5 flex-auto">
          {["PROFILE", "ADMIN", "CRDN"].some((s) =>
            sessionUser?.scope?.map((s) => s.scope).includes(s as ScopeEnum)
          ) && (
            <>
              <Button
                className="flex-1"
                variant="outlined"
                onPress={() => {
                  setFormType("BLOG");
                  setDialogOpen((p) => !p);
                }}
              >
                New Blog Post
              </Button>
              <Button
                className="flex-1"
                variant="outlined"
                onPress={() => {
                  setFormType("RESOURCE");
                  setDialogOpen((p) => !p);
                }}
              >
                New Resource Article
              </Button>
            </>
          )}
        </div>
        {dialogOpen && (
          <FullScreenDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            className="z-10"
          >
            <div className="w-full pb-24">
              <ArticleForm
                formData={formData}
                setFormData={setFormData}
                typeOfArticle={formType}
                onSubmit={sendMutation}
                submitDisabled={
                  isCreateLoading ||
                  (formType === "RESOURCE" && !formData?.courseIds?.length)
                }
                submitLabel="Create Article"
              />
            </div>
          </FullScreenDialog>
        )}
      </>
    );
  } else {
    return <></>;
  }
};

export default Writer;
