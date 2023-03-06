'use client';

import { Button, Paper } from '@marvel/web-ui';
import Link from 'next/link';
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from 'next/navigation';
import { useEffect } from 'react';

const ContentsIndex = ({ course }) => {
  const navigation = useRouter();
  const hash = typeof window !== 'undefined' ? window.location.hash : '';
  const path = usePathname();
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, [hash]);

  return (
    <Paper border className="rounded-lg p-5">
      <h3 className="text-lg">Jump to:</h3>
      <div className="flex gap-5 flex-wrap">
        {Array.from({ length: course?.totalLevels })?.map((_, i) => (
          <Link href={path + '#' + (i + 1)} prefetch={false}>
            <Button>Level {i + 1}</Button>
          </Link>
        ))}
      </div>
    </Paper>
  );
};

export default ContentsIndex;
