'use client';

import { Button, FullScreenDialog, IconButton, Paper } from '@marvel/web-ui';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { VscClose as CloseIcon } from 'react-icons/vsc';

import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const sendSpawnRequest = async (profile: any) => {
  const data = (await axios.post(`/api/spawn/profile`, { profile })).data;
  return data;
};

const getCourseList = async () => {
  const data = (await axios.post(`/api/get/course-list`)).data?.courseList;
  return data;
};

type FormData = {
  selectedCourse?: string;
};

const Spawner = ({ authorSlug }: { authorSlug: string }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const session = useSession();
  const sessionUser = session?.data?.user;
  const [formData, setFormData] = useState<FormData>({});
  const [formType, setFormType] = useState<'COURSE' | 'PROJECT'>('PROJECT');
  const router = useRouter();

  useEffect(() => {
    setFormData({});
  }, [formType]);

  const { data: courseList, isLoading: isCourseListLoading } = useQuery(
    ['course-list'],
    () => getCourseList(),
    { enabled: formType === 'COURSE' }
  );

  const { mutate: sendMutation, isLoading } = useMutation(
    () => sendSpawnRequest(formData),
    {
      onError: () => alert("Couldn't update user. loss"),
      onSuccess: () => {
        router.refresh();
        setDialogOpen(false);
      },
      //   onSettled: () => setChanged(false),
    }
  );

  if (
    sessionUser?.scope?.includes('CRDN') ||
    sessionUser?.scope?.includes('ADMIN')
  ) {
    return (
      <>
        <Paper className="rounded-lg p-5 flex flex-col gap-5 bg-p-1">
          <Button
            variant="outlined"
            onClick={() => {
              setFormType('COURSE');
              setDialogOpen((p) => !p);
            }}
          >
            New Course Work
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setFormType('PROJECT');
              setDialogOpen((p) => !p);
            }}
          >
            New Project Work
          </Button>
        </Paper>
        {dialogOpen && (
          <FullScreenDialog open={dialogOpen} className="z-10">
            <div className="w-full max-w-2xl py-24">
              <IconButton
                className="mb-5"
                onClick={() => setDialogOpen((p) => !p)}
              >
                <CloseIcon className="h-10 w-20" />
              </IconButton>
              <div>
                {(sessionUser?.scope?.includes('ADMIN') ||
                  sessionUser?.scope?.includes('CRDN')) && (
                  <div>
                    {formType == 'COURSE' ? (
                      <>
                        <div className="flex gap-5 flex-wrap my-5">
                          {isCourseListLoading ? (
                            <>
                              {Array.from({ length: 3 }).map((_, i) => (
                                <Paper
                                  key={i}
                                  className={`rounded-lg p-5 animate-pulse bg-p-2 flex-1 min-h-[150px] min-w-[200px]`}
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
                                      selectedCourse: course?.courseCode,
                                    }))
                                  }
                                  border={
                                    course?.courseCode ===
                                    formData?.selectedCourse
                                  }
                                  className={`rounded-lg ${
                                    course?.courseCode ===
                                    formData?.selectedCourse
                                      ? 'bg-p-2 border-2 border-p-10'
                                      : 'bg-p-1 border-2 border-transparent'
                                  } p-5 select-none cursor-pointer box-border`}
                                >
                                  <h6 className="text-xs tracking-wider">
                                    {course?.domainName}
                                  </h6>
                                  <h3 className="text-2xl">
                                    {course?.courseCode}
                                  </h3>
                                  <p>{course?.totalLevels} Levels</p>
                                </Paper>
                              ))}
                            </>
                          )}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                )}
                <div className="w-full flex gap-5 justify-end">
                  {formType === 'PROJECT' && (
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setFormData({});
                      }}
                      disabled={isLoading}
                    >
                      Clear
                    </Button>
                  )}
                  <Button
                    onClick={() => console.log(formData)}
                    disabled={isLoading}
                  >
                    {formType === 'COURSE'
                      ? 'Spawn Course Work'
                      : 'Spawn Project'}
                  </Button>
                </div>
              </div>
            </div>
          </FullScreenDialog>
        )}
      </>
    );
  }
};

export default Spawner;
