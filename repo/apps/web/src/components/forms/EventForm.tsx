import React from "react";
import { EventFormData } from "../../types";
import { TypeOfEvent } from "database";
import { Button, TextField } from "ui";
import { MarkdownEditor } from "../MarkdownEditor";
import ImageUploader from "../ImageUploader";

type EventFormProps = {
  formData: EventFormData;
  setFormData: (args: EventFormData | any) => void;
  onSubmit?: () => void;
  submitDisabled?: boolean;
};

const EventForm = ({
  formData,
  setFormData,
  onSubmit,
  submitDisabled = false,
  ...props
}: EventFormProps) => {
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit && onSubmit();
      }}
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
        className="w-full p-2 rounded-lg dark:bg-p-2 border-[1.5px] dark:border dark:border-p-6"
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
          setFormData((p) => ({
            ...p,
            description: e?.target?.value,
          }))
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
        value={formData?.eventStartTime.toISOString().substring(0, 16)}
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
        max={new Date(formData?.eventStartTime?.getFullYear() + 1, 11, 31)
          .toISOString()
          .substring(0, 16)}
        className="w-full p-2 rounded-lg dark:bg-p-2 border dark:border-p-6"
        id="end_time"
        type="datetime-local"
        value={formData?.eventEndTime?.toISOString()?.substring(0, 16)}
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

      {/* action button details*/}
      <span className="flex gap-5 items-center flex-wrap">
        <input
          defaultChecked={formData?.requiresActionButton}
          className="w-5 h-5"
          id="requires_action"
          type="checkbox"
          onClick={() =>
            setFormData({
              ...formData,
              requiresActionButton: !formData?.requiresActionButton,
            })
          }
        />
        <label
          className="text-2xl select-none flex-1"
          htmlFor="requires_action"
        >
          Display Action Button?
        </label>
        <p className="text-p-5 dark:text-p-6">
          With Action Button, You can display a Button with custom label that
          can redirect to any external site, on the Event Page.{" "}
        </p>
      </span>

      {formData?.requiresActionButton && (
        <>
          {/* registration time*/}
          <label htmlFor="action_link" className="text-2xl">
            Action Link
          </label>
          <TextField
            id="action_link"
            value={formData?.actionLink}
            required
            min={3}
            max={190}
            placeholder="Action Button Link"
            onChange={(e) =>
              setFormData({
                ...formData,
                actionLink: e.target.value,
              })
            }
          />
          <label htmlFor="action_label" className="text-2xl">
            Action Label
          </label>
          <TextField
            id="action_label"
            value={formData?.actionText}
            required
            min={3}
            max={30}
            placeholder="Action Button Label"
            onChange={(e) =>
              setFormData({
                ...formData,
                actionText: e.target.value,
              })
            }
          />
        </>
      )}
      <div className="w-full flex gap-5 justify-end pb-48 mt-5">
        <Button type="submit" disabled={submitDisabled}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
