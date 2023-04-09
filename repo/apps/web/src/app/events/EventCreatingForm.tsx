"use client";

import { Button, FullScreenDialog, IconButton, Paper } from "ui";
import { MarkdownEditor } from "../../components/MarkdownEditor";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { VscClose as CloseIcon } from "react-icons/vsc";
import { TextField } from "ui";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { EventFormData } from "../../types";
import { ScopeEnum } from "@prisma/client";
import ImageUploader from "../../components/ImageUploader";
import { TypeOfEvent } from "database";

const EventCreatingForm = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const sessionUser = useSession()?.data?.user;
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    caption: "",
    description: "",
    coverPhoto: "",
    typeOfEvent: "EVENT",
    requiresRegistration: false,
    registrationStartTime: new Date(),
    registrationEndTime: new Date(new Date().setDate(new Date().getDate() + 2)),
    eventStartTime: new Date(),
    eventEndTime: new Date(),
    actionLink: "",
    actionText: "",
  });
  const router = useRouter();

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
        router.refresh();
        setDialogOpen(false);
      },
    }
  );

  const handleSubmit = () => {
    if (!formData?.title || formData?.title?.length < 3) {
      alert("title cannot be less than 3 characters long.");
      return;
    } else if (!formData?.description) {
      alert("content cannot be empty");
      return;
    } else {
      sendMutation();
    }
  };
  if (
    ["CRDN", "ADMIN"].some((s) =>
      sessionUser?.scope?.map((s) => s.scope).includes(s as ScopeEnum)
    )
  ) {
    return (
      <>
        <div className="px-3">
          <Button
            variant="outlined"
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

              <form
                className="flex flex-col gap-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <label className="text-2xl" htmlFor="event_type">
                  Type of Event
                </label>
                <select
                  id="event_type"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      typeOfEvent: e.target?.value as TypeOfEvent,
                    })
                  }
                  className="w-full p-2 rounded-lg dark:bg-p-2 border dark:border-p-6"
                >
                  <option value={"EVENT"}>EVENT</option>
                  <option value={"WORKSHOP"}>WORKSHOP</option>
                  <option value={"COMPETITION"}>COMPETITION</option>
                  <option value={"TALK"}>TALK</option>
                </select>
                <label className="text-2xl">About the Event</label>
                <TextField
                  fullwidth
                  id="title"
                  placeholder="Title of the Event"
                  type={"text"}
                  value={formData?.title}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      title: e.target.value,
                    }))
                  }
                  maxLength={50}
                  required
                  minLength={3}
                />
                <TextField
                  fullwidth
                  id="caption"
                  placeholder="A short caption for the event..."
                  type={"text"}
                  value={formData?.caption}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      caption: e.target.value,
                    }))
                  }
                  maxLength={200}
                  required
                  minLength={3}
                />
                <MarkdownEditor
                  maxLength={15_000}
                  required
                  placeholder="Event description. You can also embed Lu.ma Forms, Google Forms, etc"
                  value={formData?.description}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, content: e?.target?.value }))
                  }
                />
                <hr className="w-full" />
                <ImageUploader
                  value={formData?.coverPhoto}
                  onClick={() => {
                    setFormData({ ...formData, coverPhoto: "" });
                  }}
                  onChange={(photo) => {
                    setFormData({ ...formData, coverPhoto: photo });
                  }}
                />

                {/* event time*/}
                <label htmlFor="start_time" className="text-2xl">
                  When does it start?
                </label>
                <input
                  required
                  min={new Date().toISOString().substring(0, 16)}
                  max={new Date(new Date().getFullYear() + 1, 11, 31)
                    .toISOString()
                    .substring(0, 16)}
                  className="w-full p-2 rounded-lg dark:bg-p-2 border dark:border-p-6"
                  id="start_time"
                  type="datetime-local"
                  value={formData?.eventStartTime
                    .toISOString()
                    .substring(0, 16)}
                  onChange={(e) =>
                    e.target?.value &&
                    setFormData({
                      ...formData,
                      eventStartTime: new Date(e?.target?.value),
                    })
                  }
                />
                <label htmlFor="end_time" className="text-2xl">
                  When does it end?
                </label>
                <input
                  required
                  min={formData?.eventStartTime?.toISOString().substring(0, 16)}
                  max={new Date(
                    formData?.eventStartTime?.getFullYear() + 1,
                    11,
                    31
                  )
                    .toISOString()
                    .substring(0, 16)}
                  className="w-full p-2 rounded-lg dark:bg-p-2 border dark:border-p-6"
                  id="end_time"
                  type="datetime-local"
                  value={formData?.eventEndTime
                    ?.toISOString()
                    ?.substring(0, 16)}
                  onChange={(e) =>
                    e.target?.value &&
                    setFormData({
                      ...formData,
                      eventEndTime: new Date(e?.target?.value),
                    })
                  }
                />

                {/* registration details*/}
                <span className="flex gap-5 items-center">
                  <input
                    defaultChecked={formData?.requiresRegistration}
                    required
                    className="w-5 h-5"
                    id="require_reg"
                    type="checkbox"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        requiresRegistration: !formData?.requiresRegistration,
                      })
                    }
                  />
                  <label className="text-2xl select-none" htmlFor="require_reg">
                    Requires Registration?
                  </label>
                </span>

                {formData?.requiresRegistration && (
                  <>
                    {/* registration time*/}
                    <label htmlFor="reg_start_time" className="text-2xl">
                      Registration starts at?
                    </label>
                    <input
                      required
                      min={new Date().toISOString().substring(0, 16)}
                      max={new Date(new Date().getFullYear() + 1, 11, 31)
                        .toISOString()
                        .substring(0, 16)}
                      className="w-full p-2 rounded-lg dark:bg-p-2 border dark:border-p-6"
                      id="reg_start_time"
                      type="datetime-local"
                      value={formData?.registrationStartTime
                        ?.toISOString()
                        ?.substring(0, 16)}
                      onChange={(e) =>
                        e.target?.value &&
                        setFormData({
                          ...formData,
                          registrationStartTime: new Date(e?.target?.value),
                        })
                      }
                    />
                    <label htmlFor="reg_end_time" className="text-2xl">
                      Registration ends at?
                    </label>
                    <input
                      min={formData?.registrationStartTime
                        ?.toISOString()
                        ?.substring(0, 16)}
                      max={new Date(
                        formData?.registrationStartTime?.getFullYear() + 1,
                        11,
                        31
                      )
                        ?.toISOString()
                        ?.substring(0, 16)}
                      className="w-full p-2 rounded-lg dark:bg-p-2 border dark:border-p-6"
                      id="reg_end_time"
                      type="datetime-local"
                      value={formData?.registrationEndTime
                        ?.toISOString()
                        ?.substring(0, 16)}
                      onChange={(e) =>
                        e.target?.value &&
                        setFormData({
                          ...formData,
                          registrationEndTime: new Date(e?.target?.value),
                        })
                      }
                    />
                  </>
                )}

                <div className="w-full flex gap-5 justify-end pb-48 mt-5">
                  <Button
                    onClick={() => handleSubmit()}
                    disabled={isCreateLoading}
                  >
                    Create Event
                  </Button>
                </div>
              </form>
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
