'use client';

import { Button, FullScreenDialog, IconButton, Paper } from '@marvel/web-ui';
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

const sendUserEdit = async ({ profile }) => {
  const data = (await axios.post(`/api/mutate/profile-meta`, { profile })).data;
  return data;
};

const Manager = ({ dude }: { dude: any }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const sessionUser = useSession()?.data?.user;
  const [dudeCopy, setDudeCopy] = useState(dude);
  const [changed, setChanged] = useState(false);
  const router = useRouter();

  const { mutate: sendMutation, isLoading } = useMutation(
    () => sendUserEdit(dudeCopy),
    {
      onError: () => alert("Couldn't update user. loss"),
      onSuccess: () => {
        router.refresh();
        setDialogOpen(false);
      },
      onSettled: () => setChanged(false),
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
                className="mb-5"
                onClick={() => {
                  setDialogOpen((p) => !p);
                  setDudeCopy(dude);
                  return;
                }}
              >
                <CloseIcon className="h-10 w-20" />
              </IconButton>
              <div>
                {dude?.doIKnow === 'BANNED' && (
                  <h6 className="text-[#f00] text-lg">
                    This is user is Banned. To change other Settings, lift the
                    ban first.
                  </h6>
                )}
                <>
                  {dude?.doIKnow !== 'BANNED' && (
                    <div className="flex items-center border-b mb-5 dark:border-p-4 py-5">
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
                        <h6 className="text-lg mb-5">Scope:</h6>
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
                      onClick={() => sendMutation()}
                      disabled={isLoading || !changed}
                    >
                      Update User
                    </Button>
                  </div>
                </>
              </div>
            </div>
          </FullScreenDialog>
        )}
      </>
    );
  }
};

export default Manager;
