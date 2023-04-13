"use client";
import { Event } from "database";
import { DATE_OPTIONS } from "../utils/DATE_OPTIONS";

const EventTimingText = ({
  data,
  children,
  ...props
}: JSX.IntrinsicElements["div"] & { data: Event }) => {
  const now = new Date();
  const registrationStartTime = data?.registrationStartTime
    ? new Date(data?.registrationStartTime)
    : null;
  const registrationEndTime = data?.registrationEndTime
    ? new Date(data?.registrationEndTime)
    : null;
  const eventStartTime = data?.eventStartTime
    ? new Date(data?.eventStartTime)
    : null;
  const eventEndTime = data?.eventEndTime ? new Date(data?.eventEndTime) : null;

  let text: string,
    color: { light: string; dark: string } = { light: "", dark: "" };
  if (registrationStartTime && now < registrationStartTime) {
    text =
      "Registration Starts at " +
      registrationStartTime?.toLocaleDateString("en-GB", DATE_OPTIONS);
    color = { dark: "bg-p-1", light: "bg-p-10" };
    console.log(text, color);
  } else if (
    registrationStartTime &&
    now > registrationStartTime &&
    now < registrationEndTime
  ) {
    text =
      "Registrations are open!. Closes on " +
      registrationEndTime?.toLocaleDateString("en-GB", DATE_OPTIONS);
    color = { dark: "green", light: "green" };
  } else if (
    registrationEndTime &&
    now > registrationEndTime &&
    now < eventStartTime
  ) {
    text =
      "Registrations are Closed. Event Starts at " +
      eventStartTime?.toLocaleDateString("en-GB", DATE_OPTIONS);
    color = { dark: "bg-p-1", light: "bg-p-10" };
  } else if (now > eventStartTime && now < eventEndTime) {
    text =
      "Event is in Progress. Ends at " +
      eventEndTime?.toLocaleDateString("en-GB", DATE_OPTIONS);
    color = { dark: "yellow", light: "yellow" };
  } else if (now > eventEndTime) {
    text = "Event is Done.";
    color = { dark: "bg-p-1", light: "bg-p-10" };
  }
  return (
    <div className={props?.className + ` ${color.light} dark:${color.dark}`}>
      {children}
      {text}
    </div>
  );
};

export default EventTimingText;
