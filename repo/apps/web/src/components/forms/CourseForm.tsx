"use client";

import { Button, TextField } from "ui";
import { CourseFormData } from "../../types";
import ImageUploader from "../ImageUploader";

type CourseFormProps = {
  formData: CourseFormData;
  setFormData: (args: any) => void;
  onSubmit?: () => void;
  showCourseCode?: boolean;
  submitDisabled?: boolean;
  submitLabel?: string;
};

const CourseForm = ({
  formData,
  setFormData,
  onSubmit,
  submitDisabled = false,
  submitLabel = "Submit",
  showCourseCode = false,
}: CourseFormProps) => {
  return (
    <form
      className="my-5 flex flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit && onSubmit();
      }}
    >
      {showCourseCode && (
        <>
          <label htmlFor="courseCode" className="text-3xl py-3">
            Course Code
          </label>
          <p className="text-p-4 dark:text-p-6 my-2">
            {
              "Course Code can be anything. But it's recommended that you follow the naming conventions. i.e {Domain/Topic}-{Serial No.}. This cannot be changed later."
            }
          </p>
          <TextField
            id="courseCode"
            required
            value={formData.courseCode}
            onChange={(e) => {
              setFormData({ ...formData, courseCode: e });
            }}
            placeholder="Enter Course Code"
            maxLength={12}
          />
        </>
      )}

      <label htmlFor="repoURL" className="text-3xl py-3">
        GitHub Repo URL
      </label>
      <TextField
        id="repoURL"
        value={formData.repoURL}
        onChange={(e) => {
          setFormData({ ...formData, repoURL: e });
        }}
        placeholder="link to the GitHub Repo that has course data."
        maxLength={60}
      />
      <label htmlFor="caption" className="text-3xl py-3">
        Caption
      </label>
      <TextField
        id="caption"
        value={formData?.caption}
        onChange={(e) => {
          setFormData({ ...formData, caption: e });
        }}
        placeholder="Caption..."
        maxLength={200}
      />
      <label htmlFor="caption" className="text-3xl py-3">
        Course duration
      </label>
      <TextField
        id="duration"
        value={formData?.courseDuration}
        onChange={(e) => {
          setFormData({ ...formData, courseDuration: e });
        }}
        placeholder="Course duration"
        maxLength={20}
      />
      <ImageUploader
        className="my-5"
        value={formData?.coverPhoto}
        onClick={() => {
          setFormData({ ...formData, coverPhoto: "" });
        }}
        onChange={(photo) => {
          setFormData({ ...formData, coverPhoto: photo });
        }}
      />
      <Button
        className="max-w-max self-end"
        disabled={submitDisabled}
        type="submit"
      >
        {submitLabel}
      </Button>
    </form>
  );
};

export default CourseForm;
