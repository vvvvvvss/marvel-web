'use client';
import { Button, Dialog, FullScreenDialog, Paper } from '@marvel/web-ui';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useMutation } from 'react-query';

const ReportReviewer = ({ report }) => {
  const sessionUser = useSession().data?.user;
  const router = useRouter();
  const [feedback, setFeedback] = useState({ isOpen: false, content: '' });
  const [confirmApprove, setConfirmApprove] = useState(0);

  const { isLoading, mutate: sendAction } = useMutation(
    async (type: 'approve' | 'feedback') =>
      await axios.post(
        '/api/action/report?id=' + report?.id + '&type=' + type,
        { content: feedback?.content }
      ),
    {
      onSuccess: () => {
        setConfirmApprove(0);
        setFeedback({ isOpen: false, content: '' });
        router.refresh();
      },
    }
  );

  if (
    report?.work?.pending?.map((p) => p?.id).includes(report?.id) &&
    //coordinator and coordinator for the course.
    ((sessionUser?.scope?.includes('CRDN') &&
      sessionUser?.crdnCourses?.includes(report.courseCode)) ||
      //admin
      sessionUser?.scope?.includes('ADMIN'))
  ) {
    return (
      <>
        {!feedback.isOpen && (
          <Button
            disabled={isLoading}
            onClick={() =>
              confirmApprove === 2
                ? sendAction('approve')
                : setConfirmApprove((p) => p + 1)
            }
          >
            {confirmApprove === 0
              ? 'Approve Report'
              : confirmApprove === 1
              ? 'Are you sure?'
              : 'Confirm.'}
          </Button>
        )}
        <Button
          onClick={() => {
            setFeedback({ ...feedback, isOpen: !feedback.isOpen });
            setConfirmApprove(0);
          }}
          disabled={feedback.isOpen || isLoading}
        >
          Flag and give feedback
        </Button>
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
              <Button
                onClick={() => sendAction('feedback')}
                className="mt-5"
                disabled={isLoading}
                type="submit"
              >
                Submit Feedback
              </Button>
              <Button
                disabled={isLoading}
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
