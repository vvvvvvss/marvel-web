"use client";
import {
  Button,
  IconButton,
  LoadingPulser,
  Tab,
  TabGroup,
  TextField,
} from "ui";
import { FullScreenDialog } from "ui";

import { signIn, signOut, useSession } from "next-auth/react";
import { VscClose as CloseIcon } from "react-icons/vsc";
import { useState } from "react";
import { Course, ScopeEnum } from "database";
import { BsSearch, BsXLg } from "react-icons/bs";
import Link from "next/link";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import {
  ArticleCard,
  CourseCard,
  EventCard,
  PersonCard,
  ReportCard,
  WorkCard,
} from "./Cards";
import { GoSignOut, GoSignIn } from "react-icons/go";
import { useTheme } from "next-themes";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const tabs = {
  people: "People",
  course: "Courses",
  event: "Events",
  work: "Works",
  article: "Articles",
  report: "Reports",
};
type Tab = keyof typeof tabs;

const MenuDialog = ({ menuOpen, setMenuOpen }) => {
  const sessionUser = useSession()?.data?.user;
  const theme = useTheme();
  const [query, setQuery] = useState<string>("");
  const [queryTemp, setQueryTemp] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<Tab>("people");

  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [selectedTab, query],
    async ({ pageParam }) =>
      (
        await axios.get(
          `/api/${selectedTab}/search?q=${query}&skip=${pageParam}`
        )
      ).data?.data,
    {
      enabled: !!query || false,
      getNextPageParam: (lastPage, pages) =>
        lastPage?.length == 12 ? pages?.length * 12 : null,
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setQuery(queryTemp);
          }}
          className="flex gap-2 w-full"
        >
          <TextField
            id="query"
            className="flex-1"
            placeholder="Search Marvel"
            autoComplete="Off"
            autoFocus
            value={queryTemp}
            onChange={(e) => setQueryTemp(e.target.value)}
          />
          <IconButton
            type="reset"
            disabled={queryTemp === ""}
            variant="outlined"
            onClick={() => {
              setQueryTemp("");
              setQuery("");
            }}
          >
            <BsXLg className="w-6" />
          </IconButton>
          <IconButton
            type="submit"
            disabled={queryTemp === ""}
            variant="outlined"
          >
            <BsSearch className="w-6" />
          </IconButton>
        </form>
        {query !== "" || queryTemp !== "" ? (
          <>
            <div className="w-full flex">
              <TabGroup className={`overflow-auto max-w-full mt-5`}>
                {Object.keys(tabs)?.map((t: Tab, i) => (
                  <Tab
                    key={i}
                    active={t == selectedTab}
                    onClick={() => {
                      setSelectedTab(t);
                    }}
                  >
                    {tabs?.[t]}
                  </Tab>
                ))}
              </TabGroup>
            </div>
            <br />
            {query === "" ? (
              <>
                <div className="w-full flex justify-center text-sm text-p-3 dark:text-p-6">
                  Type query and press Enter...
                </div>
              </>
            ) : isLoading ? (
              <div className="w-full flex justify-center">
                <LoadingPulser />
              </div>
            ) : (
              <div className="w-full flex flex-wrap gap-5 pb-48">
                {selectedTab === "people" ? (
                  <>
                    {data?.pages?.flat()?.map((d, i) => (
                      <PersonCard key={i} data={d} />
                    ))}
                  </>
                ) : selectedTab === "course" ? (
                  <>
                    {data?.pages?.flat()?.map((d: Course, i) => (
                      <CourseCard data={d} key={i} />
                    ))}
                  </>
                ) : selectedTab === "work" ? (
                  <>
                    {data?.pages?.flat()?.map((d, i) => (
                      <WorkCard data={d} key={i} />
                    ))}
                  </>
                ) : selectedTab === "article" ? (
                  <>
                    {data?.pages?.flat()?.map((d, i) => (
                      <ArticleCard data={d} key={i} />
                    ))}
                  </>
                ) : selectedTab === "report" ? (
                  <>
                    {data?.pages?.flat()?.map((d, i) => (
                      <ReportCard data={d} key={i} />
                    ))}
                  </>
                ) : selectedTab === "event" ? (
                  <>
                    {data?.pages?.flat()?.map((d, i) => (
                      <EventCard data={d} key={i} />
                    ))}
                  </>
                ) : null}
                <div className="w-full flex justify-center">
                  {isFetchingNextPage ? (
                    <p className="text-p-6 text-sm">Loading...</p>
                  ) : hasNextPage ? (
                    <Button onClick={() => fetchNextPage()}>Load more</Button>
                  ) : (
                    <p className="text-p-6 text-sm">That&apos;s it. </p>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full flex flex-wrap gap-5 mt-5">
            <Link href={`/`} className="flex-1">
              <Button className="w-full">Home</Button>
            </Link>
            {["CRDN", "ADMIN"].some((s) =>
              sessionUser?.scope?.map((s) => s.scope).includes(s as ScopeEnum)
            ) && (
              <Link href={`/birdseye`} className="flex-1">
                <Button className="w-full">Coordinator Dashboard</Button>
              </Link>
            )}
            {sessionUser?.id && (
              <Link href={`/u/${sessionUser?.slug}`} className="flex-1">
                <Button className="w-full">My Profile</Button>
              </Link>
            )}
            <Link href={`/courses`} className="flex-1">
              <Button className="w-full">Courses</Button>
            </Link>
            <Link href={`/events`} className="flex-1">
              <Button className="w-full">Events</Button>
            </Link>
            {!!sessionUser?.id ? (
              <Button onClick={() => signOut()}>
                <span className="whitespace-nowrap flex gap-3 items-center">
                  <GoSignOut /> Sign Out
                </span>
              </Button>
            ) : (
              <Button onClick={() => signIn("google", { redirect: false })}>
                <span className="whitespace-nowrap flex gap-3 items-center">
                  <GoSignIn /> Sign In
                </span>
              </Button>
            )}
            <Button
              className="whitespace-nowrap flex gap-3 items-center"
              onClick={() =>
                theme.theme === "light"
                  ? theme.setTheme("dark")
                  : theme.setTheme("light")
              }
            >
              {theme.theme === "light" ? (
                <>
                  {" "}
                  <MdDarkMode /> Dark Mode{" "}
                </>
              ) : (
                <>
                  {" "}
                  <MdLightMode /> Light Mode{" "}
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </FullScreenDialog>
  );
};

export default MenuDialog;
