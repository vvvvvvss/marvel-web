'use client';

import { Button, Paper } from '@marvel/web-ui';

const ContentsIndex = ({ course }) => {
  return (
    <Paper className="rounded-lg p-5 dark:bg-p-1">
      <h3 className="text-lg">Jump to:</h3>
      <div className="flex gap-5 flex-wrap mt-5">
        {Array.from({ length: course?.totalLevels })?.map((_, i) => (
          <Button onClick={() => (window.location.hash = '#' + (i + 1))}>
            Level {i + 1}
          </Button>
        ))}
      </div>
    </Paper>
  );
};

export default ContentsIndex;
