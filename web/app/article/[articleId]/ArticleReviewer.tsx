"use client";
import { Button } from "@marvel/ui/ui";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const ArticleReviewer = ({ article }: { article: any }) => {
  const sessionUser = useSession().data?.user;
  const router = useRouter();
  const [feedback, setFeedback] = useState({ isOpen: false, content: "" });
  const [confirmApprove, setConfirmApprove] = useState(0);

  const { isPending, mutate: sendAction } = useMutation({
    mutationFn: async (action: "approve" | "feedback") =>
      await axios.post(
        "/api/article/review?id=" + article?.id + "&action=" + action,
        { content: feedback?.content }
      ),
    onSuccess: () => {
      setConfirmApprove(0);
      setFeedback({ isOpen: false, content: "" });
      router.refresh();
    },
    onError: (data: any) => {
      alert(data?.response?.data?.message);
    },
  });

  if (
    //session user is a coordinator
    (sessionUser?.scope?.map((s) => s.scope).includes("CRDN") ||
      //session user is an admin
      sessionUser?.scope?.map((s) => s.scope)?.includes("ADMIN")) &&
    //with report status being PENDING
    article?.reviewStatus === "PENDING"
  ) {
    return (
      <>
        {!feedback.isOpen && (
          <Button
            isDisabled={isPending}
            onPress={() =>
              confirmApprove === 2
                ? sendAction("approve")
                : setConfirmApprove((p) => p + 1)
            }
          >
            {confirmApprove === 0
              ? "Approve Report"
              : confirmApprove === 1
              ? "Are you sure?"
              : "Confirm."}
          </Button>
        )}
        <Button
          onPress={() => {
            setFeedback({ ...feedback, isOpen: !feedback.isOpen });
            setConfirmApprove(0);
          }}
          isDisabled={feedback.isOpen || isPending}
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
              maxLength={225}
              required
            ></textarea>
            <div className="flex gap-5">
              <Button
                onPress={() => sendAction("feedback")}
                className="mt-5"
                isDisabled={isPending}
                type="submit"
              >
                Submit Feedback
              </Button>
              <Button
                isDisabled={isPending}
                className="mt-5 "
                onPress={() => setFeedback({ ...feedback, isOpen: false })}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </>
    );
  } else if (
    article?.reviewStatus === "FLAGGED" &&
    article?.People?.filter((p: any) => p?.status !== "PENDING")
      ?.map((p: any) => p?.personId)
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
