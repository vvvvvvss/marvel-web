'use client';
import { Tab, TabGroup } from '@marvel/web-ui';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';

const Tabs = ({ work }) => {
  const reportId = useSelectedLayoutSegment();
  const courseWorkTabs = work?.Reports?.map((r) => r?.id);
  const allPreviousReportsAreApproved = !work?.Reports?.some(
    (r) => r?.reviewStatus === 'PENDING' || r?.reviewStatus === 'FLAGGED'
  );
  if (allPreviousReportsAreApproved) {
    courseWorkTabs?.push('new');
  }
  const startIndexOfDisabledButtons = allPreviousReportsAreApproved
    ? work?.Reports?.length + 1
    : work?.Reports?.length;
  return (
    <TabGroup className="mx-5 my-10 overflow-x-auto">
      {work?.typeOfWork === 'COURSE' ? (
        <>
          {Array.from({ length: work?.totalLevels }).map((_, i) =>
            i >= startIndexOfDisabledButtons ? (
              <Tab key={i} className="z-0" disabled>
                Level {i + 1}
              </Tab>
            ) : (
              <Link
                className="z-0"
                key={i}
                href={`/work/${work?.id}/${
                  i === 0 ? '' : courseWorkTabs?.[i] || ''
                }`}
              >
                <Tab
                  active={
                    reportId === courseWorkTabs?.[i] || (!reportId && i == 0)
                  }
                >
                  Level {i + 1}
                </Tab>
              </Link>
            )
          )}
        </>
      ) : (
        <></>
      )}
    </TabGroup>
  );
};

export default Tabs;
