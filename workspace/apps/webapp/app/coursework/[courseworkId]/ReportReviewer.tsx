'use client';
import { Button, Dialog } from '@marvel/web-ui';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useMutation } from 'react-query';

const ReportReviewer = ({ report }) => {
  const sessionUser = useSession().data?.user;
  const [feedback, setFeedback] = useState({ isOpen: false, content: '' });
  const [confirmApprove, setConfirmApprove] = useState(false);

  const { isLoading, mutate } = useMutation(
    async (type: 'approve' | 'feedback') =>
      await axios.post(
        '/api/action/report?id=' + report?.id + '&type=' + type,
        { content: feedback?.content }
      )
  );

  if (
    report?.reviewStatus === 'PENDING' &&
    //coordinator and coordinator for the course.
    ((sessionUser?.scope?.includes('CRDN') &&
      sessionUser?.crdnCourses?.includes(report.courseCode)) ||
      //admin
      sessionUser?.scope?.includes('ADMIN'))
  ) {
    return (
      <>
        {!feedback.isOpen && (
          <>
            <Button onClick={() => setConfirmApprove((p) => !p)}>
              Approve Report
            </Button>
            {confirmApprove && (
              <Dialog open={confirmApprove}>
                <h1 className="text-5xl">HEY</h1>
              </Dialog>
            )}
          </>
        )}
        <Button
          onClick={() => {
            setFeedback({ ...feedback, isOpen: !feedback.isOpen });
            setConfirmApprove(false);
          }}
          disabled={feedback.isOpen}
        >
          Flag and give feedback
        </Button>
        <br />
        {feedback.isOpen && (
          <form onSubmit={(e) => e.preventDefault()} className="w-full">
            <textarea
              className="w-full p-3 rounded"
              placeholder="Enter your feedback"
              value={feedback.content}
              onChange={(e) =>
                setFeedback({ ...feedback, content: e.target.value })
              }
              maxLength={500}
              required
            ></textarea>
            <div className="flex gap-5">
              <Button className="mt-5" type="submit">
                Submit Feedback
              </Button>
              <Button
                className="mt-5 "
                onClick={() => setFeedback({ ...feedback, isOpen: false })}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </>
    );
  } else {
    return <div></div>;
  }
};

export default ReportReviewer;
