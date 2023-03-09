'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import {
  Button,
  TextField,
  FullScreenDialog,
  IconButton,
  LoadingPulser,
  Paper,
} from 'ui';
import { MarkdownEditor } from 'ui/client';
import { VscClose as CloseIcon } from 'react-icons/vsc';
import { useRouter } from 'next/navigation';
import { ArticleFormData } from 'webapp/types';
import ReactImageUploading, { ImageListType } from 'react-images-uploading';
import ImageCompressor from 'browser-image-compression';
import { AiOutlineMinusCircle as MinusIcon } from 'react-icons/ai';

const ArticleEditor = ({ article }) => {
  const router = useRouter();
  const sessionUser = useSession().data?.user;
  const [modalOpen, setModalOpen] = useState(false);
  const [changed, setChanged] = useState<boolean>(false);
  const [newTag, setNewTag] = useState<string>('');
  const [formData, setFormData] = useState<ArticleFormData>({
    title: article?.title,
    caption: article?.caption,
    content: article?.content,
    courseIds: article?.Courses?.map((c) => c?.courseId),
    coverPhoto: article?.coverPhoto,
  });

  const { data: courseList, isLoading: isCourseListLoading } = useQuery(
    ['course-list'],
    async () => (await axios.post(`/api/course/get-list`)).data?.courseList,
    { enabled: article?.typeOfArticle === 'RESOURCE' }
  );

  const { isLoading: isUpdating, mutate: updateArticle } = useMutation(
    async () =>
      (
        await axios.post('/api/article/edit?id=' + article?.id, {
          ...formData,
        })
      ).data,
    {
      onSuccess: () => {
        router.refresh();
        setChanged(false);
        setModalOpen((p) => !p);
      },
      onError: (data: any) => {
        alert(data?.response?.data?.message);
      },
    }
  );

  const handleImageUpload = async (imageList) => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1080,
      useWebWorker: true,
    };
    try {
      const compressedImage = await ImageCompressor(
        imageList[0]?.file,
        options
      );
      const reader = new FileReader();
      reader.readAsDataURL(compressedImage);
      reader.onloadend = () => {
        setFormData({
          ...formData,
          coverPhoto: reader?.result as ArticleFormData['coverPhoto'],
        });
        setChanged(true);
      };
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    if (!formData?.title || formData?.title?.length < 4) {
      alert('title cannot be less than 4 characters long.');
      return;
    } else if (!formData?.content?.length) {
      alert('content cannot be empty');
      return;
    } else if (
      article?.typeOfArticle === 'RESOURCE' &&
      !formData?.courseIds?.length
    ) {
      alert('Resource articles must target atleast one course.');
      return;
    } else {
      updateArticle();
    }
  };

  if (
    article?.People?.filter((p) => p?.status !== 'PENDING')
      .map((p) => p?.personId)
      .includes(sessionUser?.id)
  ) {
    return (
      <>
        <Button variant="standard" onClick={() => setModalOpen(true)}>
          Edit Article
        </Button>
        {modalOpen && (
          <FullScreenDialog open={modalOpen}>
            <div className="w-full max-w-2xl py-24 gap-5">
              <IconButton
                onClick={() => {
                  setModalOpen((p) => !p);
                }}
              >
                <CloseIcon className="h-10 w-20" />
              </IconButton>

              <form className="my-5" onSubmit={(e) => e.preventDefault()}>
                <TextField
                  fullwidth
                  id="title"
                  placeholder="Title of the Article"
                  type={'text'}
                  value={formData?.title}
                  onChange={(e) => {
                    setFormData((p) => ({
                      ...p,
                      title: e.target.value,
                    }));
                    setChanged(true);
                  }}
                  maxLength={50}
                  required
                  minLength={3}
                />
                <TextField
                  fullwidth
                  className="mt-5"
                  id="caption"
                  placeholder="A short aption for your article..."
                  type={'text'}
                  value={formData?.caption}
                  onChange={(e) => {
                    setFormData((p) => ({
                      ...p,
                      caption: e.target.value,
                    }));
                    setChanged(true);
                  }}
                  maxLength={200}
                  required
                  minLength={3}
                />
                <MarkdownEditor
                  maxLength={15_000}
                  required
                  placeholder="Start writing..."
                  value={formData?.content}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, content: e?.target?.value }));
                    setChanged(true);
                  }}
                />
                <hr className="w-full my-5" />
                <ReactImageUploading
                  value={formData?.coverPhoto as ImageListType}
                  onChange={handleImageUpload}
                  dataURLKey="data_url"
                >
                  {({ onImageUpload, dragProps }) => (
                    <div className="w-full flex gap-5">
                      <Paper
                        border
                        className="flex-auto bg-p-2 p-5 flex h-48 rounded-lg justify-center items-center"
                        onClick={() => {
                          setFormData((p) => ({ ...p, coverPhoto: '' }));
                          setChanged(true);

                          onImageUpload();
                        }}
                        {...dragProps}
                      >
                        <h6>Cover Photo (optional). Click or Drop here.</h6>
                      </Paper>
                      {formData?.coverPhoto && (
                        <div className="w-1/2">
                          <img
                            className="flex-1 rounded-lg object-cover h-48"
                            src={formData?.coverPhoto as string}
                            alt="cover photo"
                            height="150"
                            width="100%"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </ReactImageUploading>

                {article?.typeOfArticle == 'RESOURCE' && (
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
                          {(courseList ? courseList : [])?.map((course) => (
                            <Paper
                              onClick={() => {
                                setFormData((p) => ({
                                  ...p,
                                  courseIds: formData?.courseIds?.includes(
                                    course?.id
                                  )
                                    ? formData?.courseIds.filter(
                                        (i) => i !== course?.id
                                      )
                                    : [
                                        ...(formData?.courseIds
                                          ? formData?.courseIds
                                          : []),
                                        course?.id,
                                      ],
                                }));
                                setChanged(true);
                              }}
                              border={formData?.courseIds?.includes(course?.id)}
                              className={`rounded-lg ${
                                formData?.courseIds?.includes(course?.id)
                                  ? 'bg-p-2 border-2 border-p-10'
                                  : 'bg-p-1 border-2 border-transparent'
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
                    onClick={() => handleSubmit()}
                    disabled={
                      !changed ||
                      isUpdating ||
                      !formData?.content ||
                      !formData?.title ||
                      (article?.typeOfArticle === 'RESOURCE' &&
                        !formData?.courseIds)
                    }
                  >
                    Update Article
                  </Button>
                </div>
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

export default ArticleEditor;
