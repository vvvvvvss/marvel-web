"use client";

import clsx from "clsx";
import type { AriaNumberFieldProps } from "react-aria";
import { useRef } from "react";

import { useNumberFieldState } from "react-stately";
import { useLocale, useNumberField } from "react-aria";

import { IconButton } from "../Buttons";

export type NumberFieldProps = AriaNumberFieldProps & {
  fullWidth?: boolean;
  label?: string;
  className?: string;
  icon?: React.ComponentType<any>;
};

export const NumberField = ({
  className,
  fullWidth = false,
  icon: Icon,
  ...props
}: NumberFieldProps) => {
  let { locale } = useLocale();
  let state = useNumberFieldState({ ...props, locale });
  let inputRef = useRef(null);

  let {
    labelProps,
    groupProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
  } = useNumberField(props, state, inputRef);

  return (
    <div
      className={clsx(
        className,
        "um-flex um-flex-col um-items-start",
        fullWidth ? "um-w-full" : "um-w-fit"
      )}
    >
      {props?.label ? (
        <label
          className={clsx(
            "um-font-medium um-max-w-full um-cursor-pointer um-text-p-0 dark:um-text-p-10",
            {
              "after:um-content-[*]": props?.isRequired,
            }
          )}
          {...labelProps}
        >
          {props?.label}
        </label>
      ) : null}
      {props?.description ? (
        <p
          className={clsx(
            "um-text-xs um-text-p-3 dark:um-text-p-7 um-max-w-full"
          )}
        >
          {props?.description}
        </p>
      ) : null}

      <div
        {...groupProps}
        className={clsx(
          "um-flex um-items-center um-gap-2",
          "um-w-full um-relative",
          "um-transition um-ease-out",
          "hover:-um-translate-y-[1.5px] active:-um-translate-y-[1.5px] focus-within:-um-translate-y-[1.5px]"
        )}
      >
        {Icon ? (
          <Icon
            className={clsx(
              "um-ml-3 um-z-10 um-pointer-events-none um-absolute um-h-full um-aspect-square",
              "um-max-h-full um-max-w-full um-text-base um-text-p-2 dark:um-text-p-6"
            )}
          />
        ) : null}
        <input
          ref={inputRef}
          className={clsx(
            "um-my-1 um-py-2 um-px-3",
            { "um-pl-9": Icon },
            "um-transition um-ease-out",
            "um-w-full um-rounded-md dark:um-bg-p-2 um-bg-p-9 dark:um-text-p-10 um-relative",
            "focus:um-bg-p-10 focus:dark:um-bg-p-1",
            "um-border-[1.5px] dark:um-border um-border-p-4 dark:um-border-p-5",
            "focus:um-outline-none",
            "placeholder:um-text-p-4 dark:placeholder:um-text-p-6",
            "disabled:um-opacity-50 disabled:um-cursor-not-allowed disabled:um-pointer-events-none"
          )}
          {...inputProps}
        />
        <IconButton
          type="button"
          {...decrementButtonProps}
          className="um-h-full"
        >
          <svg viewBox="0 0 15 15" width="15" height="15">
            <rect x="0" y="6" width="15" height="3" fill="currentColor" />
          </svg>
        </IconButton>
        <IconButton
          type="button"
          {...incrementButtonProps}
          className="um-h-full"
        >
          <svg viewBox="0 0 15 15" width="15" height="15">
            <rect x="6" y="0" width="3" height="15" fill="currentColor" />
            <rect x="0" y="6" width="15" height="3" fill="currentColor" />
          </svg>
        </IconButton>
      </div>

      {props?.errorMessage ? (
        <p className="um-text-xs um-text-[red] um-max-w-full">
          {props?.errorMessage}
        </p>
      ) : null}
    </div>
  );
};
