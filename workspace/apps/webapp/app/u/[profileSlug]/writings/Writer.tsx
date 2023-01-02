'use client';

import { Button, FullScreenDialog, IconButton, Paper } from '@marvel/web-ui';
import { MarkdownEditor } from '@marvel/web-ui/client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { VscClose as CloseIcon } from 'react-icons/vsc';
import { TextField } from '@marvel/web-ui';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ImageCompressor from 'browser-image-compression';
import ImageUploading from 'react-images-uploading';
import { ImageListType } from 'react-images-uploading/dist/typings';
import { AiOutlineMinusCircle as MinusIcon } from 'react-icons/ai';
import { title } from 'process';

type FormData = {
  title?: string;
  coverPhoto?: string | ArrayBuffer | ImageListType;
  content?: string;
  tags?: string[];
  courseCodes?: string[];
};

const sendCreateArticle = async (type, formData: FormData) => {
  const data = (
    await axios.post(`/api/create/${type?.toLowerCase()}`, { formData })
  ).data;
  return data;
};

const getCourseList = async () => {
  const data = (await axios.post(`/api/get/course-list`)).data?.courseList;
  return data;
};

const Writer = ({ authorSlug }: { authorSlug: string }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const session = useSession();
  const sessionUser = session?.data?.user;
  const [formData, setFormData] = useState<FormData>({
    title: '',
    tags: [],
    content: '',
    courseCodes: [],
    coverPhoto: '',
  });
  const [newTag, setNewTag] = useState<string>('');
  const [formType, setFormType] = useState<'blog' | 'rsa'>('blog');
  const router = useRouter();

  useEffect(() => {
    setFormData({});
  }, [formType]);

  const { data: courseList, isLoading: isCourseListLoading } = useQuery(
    ['course-list'],
    () => getCourseList(),
    { enabled: formType === 'rsa' }
  );

  const { mutate: sendMutation, isLoading: isCreateLoading } = useMutation(
    () => sendCreateArticle(formType, formData),
    {
      onError: () => alert("Couldn't create post. loss"),
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
    // try {
    const compressedImage = await ImageCompressor(imageList[0]?.file, options);
    const reader = new FileReader();
    reader.readAsDataURL(compressedImage);
    reader.onloadend = () => {
      setFormData({ ...formData, coverPhoto: reader?.result });
    };
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleSubmit = () => {
    if (!formData?.title || formData?.title?.length < 4) {
      alert('title cannot be less than 4 characters long.');
      return;
    } else if (!formData?.content?.length) {
      alert('content cannot be empty');
      return;
    } else if (formType === 'rsa' && !formData?.courseCodes?.length) {
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
          <Button
            className="flex-1"
            variant="outlined"
            onClick={() => {
              setFormType('blog');
              setDialogOpen((p) => !p);
            }}
          >
            New Blog Post
          </Button>
          <Button
            className="flex-1"
            variant="outlined"
            onClick={() => {
              setFormType('rsa');
              setDialogOpen((p) => !p);
            }}
          >
            New Resource Article
          </Button>
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
                <label
                  className="text-4xl my-5 mt-8 w-full block"
                  htmlFor="title"
                >
                  Title of the Article.
                </label>
                <TextField
                  fullwidth
                  id="title"
                  placeholder="Enter Title"
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
                <MarkdownEditor
                  maxLength={15_000}
                  placeholder="The Content of The Article"
                  required
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
                <label
                  className="text-4xl my-5 mt-8 w-full block"
                  htmlFor="tags"
                >
                  Tags.
                </label>
                <Paper className="mb-5 flex flex-wrap gap-5">
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
                    placeholder="Optional. Press comma ( , ) after each tag to add."
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
                {formType == 'rsa' && (
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
                              onClick={() =>
                                setFormData((p) => ({
                                  ...p,
                                  courseCodes: formData?.courseCodes?.includes(
                                    course?.courseCode
                                  )
                                    ? formData?.courseCodes.filter(
                                        (i) => i !== course?.courseCode
                                      )
                                    : [
                                        ...(formData?.courseCodes
                                          ? formData?.courseCodes
                                          : []),
                                        course?.courseCode,
                                      ],
                                }))
                              }
                              border={formData?.courseCodes?.includes(
                                course?.courseCode
                              )}
                              className={`rounded-lg ${
                                formData?.courseCodes?.includes(
                                  course?.courseCode
                                )
                                  ? 'bg-p-2 border-2 border-p-10'
                                  : 'bg-p-1 border-2 border-transparent'
                              } p-5 select-none cursor-pointer box-border`}
                            >
                              <h6 className="text-xs tracking-wider">
                                {course?.domainName}
                              </h6>
                              <h3 className="text-2xl">{course?.courseCode}</h3>
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
                    disabled={isCreateLoading}
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
  }
};

export default Writer;
