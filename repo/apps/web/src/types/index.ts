import { ImageListType } from "react-images-uploading";

export type ArticleFormData = {
  title: string;
  caption: string;
  coverPhoto?: string | ArrayBuffer | ImageListType;
  content: string;
  courseIds?: string[];
};

export type CourseFormData = {
  courseDuration: string;
  caption: string;
  coverPhoto?: string | ArrayBuffer;
  repoURL: string;
};

export type WorkFormData = {
  name: string;
  note?: string;
  coverPhoto?: string | ArrayBuffer;
};

export type TrackDescription = {
  title: string;
  desc: string;
  link: string;
  buttonText: string;
};
