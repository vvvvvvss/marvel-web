"use client";;
import { Event } from "@prisma/client";
import { DATE_OPTIONS } from "../utils/DATE_OPTIONS";

import type { JSX } from "react";

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

  let text: string = "";
  let color: { light: string; dark: string } = { light: "", dark: "" };
  if (registrationStartTime && now < registrationStartTime) {
    text =
      "Registration Starts at " +
      registrationStartTime?.toLocaleDateString("en-IN", DATE_OPTIONS);
    color = { dark: "bg-p-1", light: "bg-p-10" };
    console.log(text, color);
  } else if (
    registrationStartTime &&
    now > registrationStartTime &&
    //@ts-ignore
    now < registrationEndTime
  ) {
    text =
      "Registrations are open!. Closes on " +
      registrationEndTime?.toLocaleDateString("en-IN", DATE_OPTIONS);
    color = { dark: "green", light: "green" };
  } else if (
    registrationEndTime &&
    now > registrationEndTime &&
    //@ts-ignore
    now < eventStartTime
  ) {
    text =
      "Registrations are Closed. Event Starts at " +
      eventStartTime?.toLocaleDateString("en-IN", DATE_OPTIONS);
    color = { dark: "bg-p-1", light: "bg-p-10" };
    //@ts-ignore
  } else if (now > eventStartTime && now < eventEndTime) {
    text =
      "Event is in Progress. Ends at " +
      eventEndTime?.toLocaleDateString("en-IN", DATE_OPTIONS);
    color = { dark: "yellow", light: "yellow" };
    //@ts-ignore
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
