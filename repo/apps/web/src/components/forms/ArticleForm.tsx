"use client";
import React from "react";
import { ArticleFormData } from "../../types";
import { TypeOfArticle } from "database";
import { Button, Paper, TextField } from "ui";
import { MarkdownEditor } from "../MarkdownEditor";
import ImageUploader from "../ImageUploader";
import { useQuery } from "react-query";
import axios from "axios";

type ArticleFormProps = {
  formData: ArticleFormData;
  setFormData: (args: any) => void;
  onSubmit?: () => void;
  submitDisabled?: boolean;
  submitLabel?: string;
  typeOfArticle: TypeOfArticle;
};

const ArticleForm = ({
  formData,
  setFormData,
  onSubmit,
  submitDisabled,
  submitLabel,
  typeOfArticle,
}: ArticleFormProps) => {
  const { data: courseList, isLoading: isCourseListLoading } = useQuery(
    ["course-list"],
    async () => (await axios.post(`/api/course/get-list`)).data?.courseList,
    { enabled: typeOfArticle === "RESOURCE" }
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <TextField
        fullwidth
        id="title"
        placeholder="Title of the Article"
        type={"text"}
        value={formData?.title}
        onChange={(e) =>
          setFormData((p) => ({
            ...p,
            title: e.target.value,
          }))
        }
        maxLength={50}
        required
        minLength={3}
      />
      <TextField
        className="mt-5"
        fullwidth
        id="caption"
        placeholder="A short caption for your article..."
        type={"text"}
        value={formData?.caption}
        onChange={(e) =>
          setFormData((p) => ({
            ...p,
            caption: e.target.value,
          }))
        }
        maxLength={200}
        required
        minLength={3}
      />
      <MarkdownEditor
        maxLength={15_000}
        required
        placeholder="Start writing..."
        value={formData?.content}
        onChange={(e) =>
          setFormData((p) => ({ ...p, content: e?.target?.value }))
        }
      />
      <hr className="w-full my-5" />
      <ImageUploader
        value={formData?.coverPhoto}
        onClick={() => {
          setFormData({ ...formData, coverPhoto: "" });
        }}
        onChange={(photo) => {
          setFormData({ ...formData, coverPhoto: photo });
        }}
      />
      {/* tags  */}

      {typeOfArticle == "RESOURCE" && (
        <>
          <label className="text-4xl my-5 mt-8 w-full block">
            Target Courses
          </label>
          <div className="flex gap-5 flex-wrap">
            {isCourseListLoading ? (
              <>
                {Array.from({ length: 3 }).map((_, i) => (
                  <Paper
                    key={i}
                    className={`rounded-lg p-5 animate-pulse bg-p-2 flex-1 h-10 w-24`}
                  ></Paper>
                ))}
              </>
            ) : (
              <>
                {(courseList ? courseList : [])?.map((course, i) => (
                  <Paper
                    key={i}
                    onClick={() => {
                      setFormData((p) => ({
                        ...p,
                        courseIds: formData?.courseIds?.includes(course?.id)
                          ? formData?.courseIds.filter((i) => i !== course?.id)
                          : [
                              ...(formData?.courseIds
                                ? formData?.courseIds
                                : []),
                              course?.id,
                            ],
                      }));
                    }}
                    border={formData?.courseIds?.includes(course?.id)}
                    className={`rounded-lg ${
                      formData?.courseIds?.includes(course?.id)
                        ? "dark:bg-p-2 bg-p-9 border-2 dark:border-p-10"
                        : "dark:bg-p-1 bg-p-9 border-2 border-transparent"
                    } p-5 select-none cursor-pointer box-border`}
                  >
                    <h3 className="text-2xl">{course?.courseCode}</h3>
                    <h6 className="text-xs tracking-wider">
                      {course?.totalLevels} Levels
                    </h6>
                  </Paper>
                ))}
              </>
            )}
          </div>
        </>
      )}

      <div className="w-full flex gap-5 justify-end pb-48 mt-5">
        <Button
          onClick={() => onSubmit && onSubmit()}
          disabled={submitDisabled || isCourseListLoading}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default ArticleForm;
