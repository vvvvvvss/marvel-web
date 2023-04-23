"use client";
import { Tab, TabGroup } from "ui";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import React from "react";

const Tabs = ({ work }) => {
  const reportId = useSelectedLayoutSegment();
  const allPreviousReportsAreApproved = !work?.Reports?.some(
    (r) => r?.reviewStatus === "PENDING" || r?.reviewStatus === "FLAGGED"
  );
  const startIndexOfDisabledButtons = allPreviousReportsAreApproved
    ? work?.Reports?.length + 1
    : work?.Reports?.length;

  const workTabs = work?.Reports?.map((r) => r?.id);
  const sessionUser = useSession()?.data?.user;
  if (work?.typeOfWork === "COURSE") {
    if (allPreviousReportsAreApproved) {
      workTabs?.push("new");
    }
    return (
      <TabGroup className="mx-5 my-10 overflow-x-auto max-w-full">
        <>
          {Array.from({ length: work?.totalLevels }).map((_, i) =>
            i >= startIndexOfDisabledButtons ? (
              <Tab key={i} disabled>
                Level {i + 1}
              </Tab>
            ) : (
              <Link
                key={i}
                href={`/work/${work?.id}/${i === 0 ? "" : workTabs?.[i] || ""}`}
              >
                <Tab
                  active={reportId === workTabs?.[i] || (!reportId && i == 0)}
                >
                  Level {i + 1}
                </Tab>
              </Link>
            )
          )}
        </>
      </TabGroup>
    );
  } else if (work?.typeOfWork === "PROJECT") {
    if (workTabs?.length === 0) {
      workTabs?.push("overview");
    }
    if (
      work?.People?.filter(
        (p) => p?.status === "ACTIVE" && p?.role === "AUTHOR"
      )
        ?.map((p) => p?.personId)
        .includes(sessionUser?.id) &&
      allPreviousReportsAreApproved
    ) {
      workTabs?.push("new");
    }
    return (
      <TabGroup className="mx-5 my-10 overflow-x-auto">
        <>
          {Array.from({ length: workTabs?.length }).map((_, i) => (
            <Link
              key={i}
              href={`/work/${work?.id}/${i === 0 ? "" : workTabs?.[i] || ""}`}
            >
              <Tab active={reportId === workTabs?.[i] || (!reportId && i == 0)}>
                {i === 0
                  ? "Overview"
                  : workTabs[i] === "new"
                  ? "New"
                  : `Stage ${i}`}
              </Tab>
            </Link>
          ))}
        </>
      </TabGroup>
    );
  } else {
    return <></>;
  }
};

export default Tabs;
