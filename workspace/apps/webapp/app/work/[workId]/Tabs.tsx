import { Tab, TabGroup } from '@marvel/web-ui';
import Link from 'next/link';
import React from 'react';

const Tabs = ({ work, reportId }) => {
  const courseWorkTabs = work?.Reports?.map((r) => r?.id);
  courseWorkTabs?.push('new');
  return (
    <TabGroup className="mx-5 my-10 overflow-x-auto">
      {work?.typeOfWork === 'COURSE' ? (
        <>
          {Array.from({ length: work?.totalLevels }).map((_, i) =>
            i + 1 > work?.level ? (
              <Tab className="z-0" disabled>
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
                  disabled={i + 1 > work?.level}
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
