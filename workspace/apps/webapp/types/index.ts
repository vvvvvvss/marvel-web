import { ImageListType } from 'react-images-uploading';

export type ArticleFormData = {
  title?: string;
  caption?: string;
  coverPhoto?: string | ArrayBuffer | ImageListType;
  content?: string;
  tags?: string[];
  courseIds?: string[];
};
