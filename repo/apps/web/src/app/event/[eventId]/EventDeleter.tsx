"use client";
import { Button } from "ui";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMutation } from "react-query";

const EventDeleter = ({ event }) => {
  const sessionUser = useSession().data?.user;
  const router = useRouter();
  const [confirmApprove, setConfirmApprove] = useState(0);

  const { isLoading, mutate: sendDelete } = useMutation(
    async () => await axios.post("/api/event/delete?id=" + event?.id),
    {
      onSuccess: () => {
        setConfirmApprove(0);
        router.back();
      },
      onError: (data: AxiosError) => {
        alert(data?.response?.data?.["message"]);
      },
    }
  );

  if (
    sessionUser?.scope?.map((s) => s.scope).includes("CRDN") ||
    sessionUser?.scope?.map((s) => s.scope)?.includes("ADMIN")
  ) {
    return (
      <>
        <Button
          className="z-10 w-min"
          disabled={isLoading}
          onClick={() =>
            confirmApprove === 2
              ? sendDelete()
              : setConfirmApprove((p) => p + 1)
          }
        >
          {confirmApprove === 0
            ? "Delete this Event"
            : confirmApprove === 1
            ? "Are you sure?"
            : "Confirm."}
        </Button>
      </>
    );
  } else {
    return <div></div>;
  }
};

export default EventDeleter;
