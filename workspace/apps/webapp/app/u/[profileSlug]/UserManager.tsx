'use client';

import {
  Button,
  FullScreenDialog,
  IconButton,
  TabGroup,
  Tab,
  Paper,
} from '@marvel/web-ui';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { VscClose as CloseIcon } from 'react-icons/vsc';
import {
  AiOutlineMinusCircle as MinusIcon,
  AiOutlinePlusCircle as PlusIcon,
} from 'react-icons/ai';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type UserManagerTabs = 'general' | 'assign-course' | 'assign-project';

const sendUserEdit = async ({ slug, content }) => {
  const data = (await axios.post(`/api/mutate/profile`, { slug, content }))
    .data;
  return data;
};

const Manager = ({ dude }: { dude: any }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const sessionUser = useSession()?.data?.user;
  const [activeTab, setActiveTab] = useState<UserManagerTabs>('general');
  const [dudeCopy, setDudeCopy] = useState(dude);
  const [changed, setChanged] = useState(false);
  const router = useRouter();

  const { mutate: mutateReadMe, isLoading } = useMutation(
    () => sendUserEdit(dudeCopy),
    {
      onError: () => alert("Couldn't update user. loss"),
      onSuccess: () => router.refresh(),
      onSettled: () => {
        setChanged(false);
      },
    }
  );

  if (
    sessionUser?.scope?.includes('CRDN') ||
    sessionUser?.scope?.includes('ADMIN') ||
    sessionUser?.scope?.includes('DEV')
  ) {
    return (
      <>
        <div className="w-full">
          <Button onClick={() => setDialogOpen((p) => !p)}>Manage User</Button>
        </div>
        {dialogOpen && (
          <FullScreenDialog open={dialogOpen} className="z-10">
            <div className="w-full max-w-2xl py-24">
              <IconButton
                onClick={() => {
                  setDialogOpen((p) => !p);
                  setDudeCopy(dude);
                  return;
                }}
              >
                <CloseIcon className="h-10 w-20" />
              </IconButton>
              <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden">
                <TabGroup className="my-5">
                  <Tab
                    active={activeTab == 'general'}
                    onClick={() => setActiveTab('general')}
                  >
                    General
                  </Tab>
                  <Tab
                    active={activeTab == 'assign-course'}
                    onClick={() => setActiveTab('assign-course')}
                  >
                    New Course
                  </Tab>
                  <Tab
                    active={activeTab == 'assign-project'}
                    onClick={() => setActiveTab('assign-project')}
                  >
                    New Project
                  </Tab>
                </TabGroup>
              </div>
              <div>
                {dude?.doIKnow === 'BANNED' && (
                  <h6 className="text-[#f00] text-lg">
                    This is user is Banned. To change other Settings, lift the
                    ban first.
                  </h6>
                )}
                {activeTab === 'general' && (
                  <>
                    {dude?.doIKnow !== 'BANNED' && (
                      <div className="flex items-center border-b dark:border-p-4 py-5">
                        <input
                          type="checkbox"
                          id="doIKnow"
                          className="mx-5 aspect-square h-6"
                          checked={dudeCopy?.doIKnow === 'KNOWN'}
                          onChange={() => {
                            setDudeCopy((p) => ({
                              ...p,
                              doIKnow:
                                dudeCopy?.doIKnow === 'KNOWN'
                                  ? 'UNKNOWN'
                                  : 'KNOWN',
                            }));
                            setChanged(true);
                          }}
                        />
                        <label
                          id="doIKnow"
                          className="w-full select-none"
                          htmlFor="doIKnow"
                        >
                          Do we know this person?{' '}
                          {dudeCopy?.doIKnow === 'KNOWN' ? ' Yes.' : ' No.'}
                        </label>
                      </div>
                    )}

                    {(sessionUser?.scope?.includes('ADMIN') ||
                      sessionUser?.scope?.includes('DEV')) &&
                      dudeCopy?.doIKnow === 'KNOWN' && (
                        <div>
                          <h6 className="text-lg my-5">Scope:</h6>
                          <Paper
                            border
                            shadow
                            className="rounded-lg pl-5 pt-5 min-h-[60px]"
                          >
                            {dudeCopy?.scope?.map(
                              (s) =>
                                !(
                                  !sessionUser?.scope?.includes('DEV') &&
                                  s == 'DEV'
                                ) && (
                                  <Button
                                    onClick={() => {
                                      setDudeCopy((p) => ({
                                        ...p,
                                        scope: dudeCopy?.scope?.filter(
                                          (scope) => scope != s
                                        ),
                                      }));
                                      setChanged(true);
                                    }}
                                    variant="outlined"
                                    className="mr-5 mb-5 inline-flex items-center gap-2"
                                  >
                                    <MinusIcon />
                                    {s}
                                  </Button>
                                )
                            )}
                          </Paper>
                          <div className="pl-5 pt-5">
                            {['CRDN', 'ADMIN', 'DEV'].map(
                              (s) =>
                                !dudeCopy?.scope?.includes(s) && (
                                  <Button
                                    onClick={() => {
                                      setDudeCopy((p) => ({
                                        ...p,
                                        scope: [...dudeCopy?.scope, s],
                                      }));
                                      setChanged(true);
                                    }}
                                    variant="outlined"
                                    className="mr-5 mb-5 inline-flex items-center gap-2"
                                  >
                                    <PlusIcon />
                                    {s}
                                  </Button>
                                )
                            )}
                          </div>
                        </div>
                      )}
                    <div className="w-full flex gap-5 justify-end">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setDudeCopy(dude);
                          setChanged(false);
                        }}
                        disabled={!changed || isLoading}
                      >
                        Reset
                      </Button>
                      <Button
                        onClick={() => console.log(dudeCopy)}
                        disabled={isLoading || !changed}
                      >
                        Update User
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </FullScreenDialog>
        )}
      </>
    );
  }
};

export default Manager;
