'use client';
import { Button } from 'ui';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useMutation } from 'react-query';

const ArticleReviewer = ({ article }) => {
  const sessionUser = useSession().data?.user;
  const router = useRouter();
  const [feedback, setFeedback] = useState({ isOpen: false, content: '' });
  const [confirmApprove, setConfirmApprove] = useState(0);

  const { isLoading, mutate: sendAction } = useMutation(
    async (action: 'approve' | 'feedback') =>
      await axios.post(
        '/api/article/review?id=' + article?.id + '&action=' + action,
        { content: feedback?.content }
      ),
    {
      onSuccess: () => {
        setConfirmApprove(0);
        setFeedback({ isOpen: false, content: '' });
        router.refresh();
      },
      onError: (data: any) => {
        alert(data?.response?.data?.message);
      },
    }
  );

  if (
    //session user is a coordinator
    (sessionUser?.scope?.map((s) => s.scope).includes('CRDN') ||
      //session user is an admin
      sessionUser?.scope?.map((s) => s.scope)?.includes('ADMIN')) &&
    //with report status being PENDING
    article?.reviewStatus === 'PENDING'
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
  } else if (
    article?.reviewStatus === 'FLAGGED' &&
    article?.People?.filter((p) => p?.status !== 'PENDING')
      ?.map((p) => p?.personId)
      .includes(sessionUser?.id)
  ) {
    return (
      <div className="w-full p-5 rounded-lg border border-[#ff5959]">
        {article?.feedback}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default ArticleReviewer;
