'use client';

import { Button, FullScreenDialog, IconButton, Paper } from '@marvel/web-ui';
import { MarkdownEditor } from '@marvel/web-ui/client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { VscClose as CloseIcon } from 'react-icons/vsc';
import { TextField } from '@marvel/web-ui';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import ImageCompressor from 'browser-image-compression';
import ImageUploading from 'react-images-uploading';
import { ImageListType } from 'react-images-uploading/dist/typings';
import { AiOutlineMinusCircle as MinusIcon } from 'react-icons/ai';
import { ArticleFormData } from 'apps/webapp/types';
import { TypeOfArticle } from '@prisma/client';

const Writer = ({ authorSlug }: { authorSlug: string }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const session = useSession();
  const sessionUser = session?.data?.user;
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    caption: '',
    tags: [],
    content: '',
    courseIds: [],
    coverPhoto: '',
  });
  const [newTag, setNewTag] = useState<string>('');
  const [formType, setFormType] = useState<TypeOfArticle>('BLOG');
  const router = useRouter();

  useEffect(() => {
    setFormData({});
  }, [formType]);

  const { data: courseList, isLoading: isCourseListLoading } = useQuery(
    ['course-list'],
    async () => (await axios.post(`/api/course/get-list`)).data?.courseList,
    { enabled: formType === 'RESOURCE' }
  );

  const { mutate: sendMutation, isLoading: isCreateLoading } = useMutation(
    async () =>
      (
        await axios.post(`/api/article/create?type=${formType}`, {
          ...formData,
        })
      ).data,
    {
      onError: (e: AxiosError) =>
        alert(e?.response?.data?.['message'] || 'Something went wrong.'),
      onSuccess: () => {
        router.refresh();
        setDialogOpen(false);
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
        setFormData({ ...formData, coverPhoto: reader?.result });
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
    } else if (formType === 'RESOURCE' && !formData?.courseIds?.length) {
      alert('Resource articles must target atleast one course.');
      return;
    } else {
      sendMutation();
    }
  };

  if (sessionUser?.slug === authorSlug) {
    return (
      <>
        <div className="flex flex-wrap gap-5 flex-auto">
          {sessionUser?.scope?.map((s) => s.scope)?.includes('WRITER') && (
            <Button
              className="flex-1"
              variant="outlined"
              onClick={() => {
                setFormType('BLOG');
                setDialogOpen((p) => !p);
              }}
            >
              New Blog Post
            </Button>
          )}
          {sessionUser?.scope?.map((s) => s.scope)?.includes('R_WRITER') && (
            <Button
              className="flex-1"
              variant="outlined"
              onClick={() => {
                setFormType('RESOURCE');
                setDialogOpen((p) => !p);
              }}
            >
              New Resource Article
            </Button>
          )}
        </div>
        {dialogOpen && (
          <FullScreenDialog open={dialogOpen} className="z-10">
            <div className="w-full max-w-2xl py-24">
              <IconButton
                className="mb-5"
                onClick={() => setDialogOpen((p) => !p)}
              >
                <CloseIcon className="h-10 w-20" />
              </IconButton>

              <form onSubmit={(e) => e.preventDefault()}>
                <TextField
                  fullwidth
                  id="title"
                  placeholder="Title of the Article"
                  type={'text'}
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
                  placeholder="A short aption for your article..."
                  type={'text'}
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
                <ImageUploading
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
                </ImageUploading>
                {/* tags  */}
                <Paper className="mb-5 flex flex-wrap gap-5 mt-5">
                  <TextField
                    id="tags"
                    className="w-full flex-initial"
                    value={newTag}
                    disabled={isCreateLoading}
                    onChange={(e) => {
                      if (e.target.value.slice(-1) === ',' && newTag !== '') {
                        if (
                          formData?.tags?.length < 8 ||
                          !formData?.tags?.length
                        ) {
                          if (
                            formData?.tags?.includes(
                              e.target?.value?.slice(0, -1)
                            )
                          )
                            return alert(`You've already added that tag`);
                          setFormData({
                            ...formData,
                            tags: [
                              ...(formData?.tags ? formData?.tags : []),
                              e.target?.value?.slice(0, -1).toString(),
                            ],
                          });
                          setNewTag('');
                        } else {
                          alert('Maximum number of tags is 8');
                        }
                      } else {
                        setNewTag(`${e.target.value}`);
                      }
                    }}
                    placeholder="Tags (Optional). Press comma ( , ) after each tag to add."
                  />
                  {formData?.tags?.map((tag, i) => (
                    <Button
                      className="flex flex-nowrap items-center gap-2"
                      key={i}
                      variant="outlined"
                      disabled={isCreateLoading}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          tags: formData?.tags.filter((i) => i !== tag),
                        })
                      }
                    >
                      <MinusIcon />
                      {tag}
                    </Button>
                  ))}
                </Paper>
                {formType == 'RESOURCE' && (
                  <>
                    <label className="text-4xl my-5 mt-8 w-full block">
                      Target Courses
                    </label>
                    <div className="flex gap-5 flex-wrap mb-5">
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

                <div className="w-full flex gap-5 justify-end pb-48">
                  <Button
                    onClick={() => handleSubmit()}
                    disabled={
                      isCreateLoading ||
                      !formData?.content ||
                      !formData?.title ||
                      (formType === 'RESOURCE' && !formData?.courseIds)
                    }
                  >
                    Create Article
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

export default Writer;
