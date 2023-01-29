'use client';

import { Tab, TabGroup } from '@marvel/web-ui';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const Tabs = ({ courseWork }) => {
  const searchParams = useSearchParams();
  const levelNo = Number(searchParams.get('level')) || 1;
  return (
    <TabGroup className="mx-5 my-10 overflow-x-auto">
      {Array.from({ length: courseWork?.totalLevels }).map((_, k) => (
        <Link key={k} href={`coursework/${courseWork.id}?level=${k + 1}`}>
          <Tab active={k + 1 === levelNo} disabled={k + 1 > courseWork.level}>
            Level {k + 1}
          </Tab>
        </Link>
      ))}
    </TabGroup>
  );
};

export default Tabs;
