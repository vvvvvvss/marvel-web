'use client';

import {
  Button,
  FullScreenDialog,
  IconButton,
  TabGroup,
  Tab,
} from '@marvel/web-ui';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { VscClose as CloseIcon } from 'react-icons/vsc';

type UserManagerTabs = 'general' | 'assign-course' | 'assign-project';

const Manager = ({ dude }: { dude: any }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const sessionUser = useSession()?.data?.user;
  const [activeTab, setActiveTab] = useState<UserManagerTabs>('general');
  const [dudeCopy, setDudeCopy] = useState(dude);
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
              <IconButton onClick={() => setDialogOpen((p) => !p)}>
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
                {activeTab === 'general' && (
                  <>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="doIKnow"
                        className="mx-5 aspect-square h-6"
                        checked={dudeCopy?.doIKnow === 'KNOWN'}
                        onChange={() =>
                          setDudeCopy((p) => ({
                            ...p,
                            doIKnow:
                              dudeCopy?.doIKnow === 'KNOWN'
                                ? 'UNKNOWN'
                                : 'KNOWN',
                          }))
                        }
                      />
                      <label id="doIKnow" className="w-full" htmlFor="doIKnow">
                        Do we know this person?{' '}
                        {dudeCopy?.doIKnow === 'KNOWN' ? ' Yes.' : ' No.'}
                      </label>
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
