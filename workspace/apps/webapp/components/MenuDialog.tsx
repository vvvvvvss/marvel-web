'use client';
import {
  Button,
  FullScreenDialog,
  IconButton,
  LoadingPulser,
  Paper,
  Tab,
  TabGroup,
  TextField,
} from '@marvel/web-ui';
import { useSession } from 'next-auth/react';
import { VscClose as CloseIcon, VscCloseAll } from 'react-icons/vsc';
import { useState } from 'react';
import { Course, People, ScopeEnum } from '@prisma/client';
import { BsSearch, BsX, BsXLg } from 'react-icons/bs';
import Link from 'next/link';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Avatar } from './Avatar';

const tabs = {
  people: 'People',
  course: 'Courses',
  work: 'Works',
  article: 'Articles',
  report: 'Reports',
};
type Tabs = keyof typeof tabs;

const MenuDialog = ({ menuOpen, setMenuOpen }) => {
  const sessionUser = useSession()?.data?.user;
  const [query, setQuery] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<Tabs>('people');

  const { data, isLoading, refetch } = useQuery(
    [selectedTab, query],
    async () =>
      (await axios.get(`/api/${selectedTab}/search?q=${query}`)).data?.data,
    {
      enabled: false,
    }
  );

  return (
    <FullScreenDialog
      open={menuOpen}
      className="z-max"
      onClose={() => setMenuOpen(false)}
    >
      <div className="w-full max-w-2xl py-24">
        <IconButton className="mb-5" onClick={() => setMenuOpen((p) => !p)}>
          <CloseIcon className="h-10 w-20" />
        </IconButton>
        <div className="w-full pb-48 flex flex-wrap gap-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              refetch();
            }}
            className="flex gap-2 w-full"
          >
            <TextField
              className="flex-1"
              placeholder="Search Marvel"
              value={query}
              onChange={(e) => setQuery(e.target?.value)}
            />
            <IconButton
              type="reset"
              disabled={query === ''}
              variant="outlined"
              onClick={() => setQuery('')}
            >
              <BsXLg className="w-6" />
            </IconButton>
            <IconButton
              type="submit"
              disabled={query === ''}
              variant="outlined"
            >
              <BsSearch className="w-6" />
            </IconButton>
          </form>
          {query !== '' ? (
            <>
              <TabGroup className="overflow-auto w-full max-w-full">
                {Object.keys(tabs)?.map((t: Tabs) => (
                  <Tab
                    active={t == selectedTab}
                    onClick={() => setSelectedTab(t)}
                  >
                    {tabs?.[t]}
                  </Tab>
                ))}
              </TabGroup>
              <br />
              {isLoading ? (
                <span className="w-full flex justify-center">
                  <LoadingPulser />
                </span>
              ) : (
                <>
                  {selectedTab === 'people' ? (
                    <>
                      {data?.map((d: People, i) => (
                        <Link
                          key={i}
                          href={`/u/${d?.slug}`}
                          prefetch={false}
                          className="flex-1"
                        >
                          <Paper
                            border
                            elevateOnHover
                            className="rounded-lg p-5 flex gap-5 w-full h-full"
                          >
                            <Avatar className="w-10" src={d?.profilePic} />
                            <h6 className="text-lg flex-1 self-center">
                              {d?.name}
                            </h6>
                          </Paper>
                        </Link>
                      ))}
                    </>
                  ) : selectedTab === 'course' ? (
                    <>
                      {data?.map((d: Course, i) => (
                        <Link
                          key={i}
                          href={`/course/${d?.courseCode}`}
                          prefetch={false}
                          className="flex-1"
                        >
                          <Paper
                            border
                            elevateOnHover
                            className="rounded-lg p-5 w-full h-full"
                          >
                            <h3 className="text-3xl whitespace-nowrap">
                              {d?.courseCode}
                            </h3>
                            <p className="text-sm text-p-6 whitespace-nowrap">
                              {d?.totalLevels} Levels &#183; {d?.courseDuration}
                            </p>
                            <hr className="border-p-4 my-2" />
                            <p>{d?.caption}</p>
                          </Paper>
                        </Link>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <Link href={`/`} className="flex-1">
                <Button className="w-full">Home</Button>
              </Link>
              {['CRDN', 'ADMIN'].some((s) =>
                sessionUser?.scope?.map((s) => s.scope).includes(s as ScopeEnum)
              ) && (
                <>
                  <Button className="flex-1">Birds eye</Button>
                </>
              )}
              {sessionUser?.id && (
                <Link href={`/u/${sessionUser?.slug}`} className="flex-1">
                  <Button className="w-full">My Profile</Button>
                </Link>
              )}
              <Link href={`/about`} className="flex-1">
                <Button className="w-full">About</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </FullScreenDialog>
  );
};

export default MenuDialog;
