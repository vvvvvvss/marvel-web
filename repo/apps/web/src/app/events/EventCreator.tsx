"use client";

import { Button, IconButton, Paper } from "ui";
import { FullScreenDialog } from "ui";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { VscClose as CloseIcon } from "react-icons/vsc";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { EventFormData } from "../../types";
import { ScopeEnum } from "database";
import EventForm from "../../components/forms/EventForm";

const EventCreatingForm = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const sessionUser = useSession()?.data?.user;
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    caption: "",
    description: "",
    coverPhoto: "",
    typeOfEvent: "EVENT",
    eventStartTime: new Date(),
    eventEndTime: new Date(),
    requiresRegistration: false,
    registrationStartTime: new Date(),
    registrationEndTime: new Date(new Date().setDate(new Date().getDate() + 2)),
    requiresActionButton: false,
    actionLink: "",
    actionText: "",
  });
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: sendMutation, isLoading: isCreateLoading } = useMutation(
    async () =>
      (
        await axios.post(`/api/event/create`, {
          ...formData,
        })
      ).data,
    {
      onError: (e: AxiosError) =>
        alert(e?.response?.data?.["message"] || "Something went wrong."),
      onSuccess: () => {
        queryClient.invalidateQueries(["event_list"]);
        setDialogOpen(false);
      },
    }
  );

  if (
    ["CRDN", "ADMIN"].some((s) =>
      sessionUser?.scope?.map((s) => s.scope).includes(s as ScopeEnum)
    )
  ) {
    return (
      <>
        <div className="px-3 w-full flex justify-end">
          <Button
            onClick={() => {
              setDialogOpen((p) => !p);
            }}
          >
            Create New Event
          </Button>
        </div>
        {dialogOpen && (
          <FullScreenDialog open={dialogOpen} className="z-10">
            <div className="w-full max-w-2xl py-24">
              <IconButton
                className="mb-5"
                onClick={() => setDialogOpen((p) => !p)}
              >
                <CloseIcon className="h-10 w-20" />
              </IconButton>

              <EventForm
                mode="create"
                formData={formData}
                setFormData={setFormData}
                onSubmit={sendMutation}
                submitDisabled={isCreateLoading}
              />
            </div>
          </FullScreenDialog>
        )}
      </>
    );
  } else {
    return <></>;
  }
};

export default EventCreatingForm;
