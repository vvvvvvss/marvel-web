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
        "flex flex-col items-start",
        fullWidth ? "w-full" : "w-fit"
      )}
    >
      {props?.label ? (
        <label
          className={clsx(
            "font-medium max-w-full cursor-pointer text-p-0 dark:text-p-10",
            {
              "after:content-[*]": props?.isRequired,
            }
          )}
          {...labelProps}
        >
          {props?.label}
        </label>
      ) : null}
      {props?.description ? (
        <p className={clsx("text-xs text-p-3 dark:text-p-7 max-w-full")}>
          {props?.description}
        </p>
      ) : null}

      <div
        {...groupProps}
        className={clsx(
          "flex items-center gap-2",
          "w-full relative",
          "transition ease-out",
          "hover:-translate-y-[1.5px] active:-translate-y-[1.5px] focus-within:-translate-y-[1.5px]"
        )}
      >
        {Icon ? (
          <Icon
            className={clsx(
              "ml-3 z-10 pointer-events-none absolute h-full aspect-square",
              "max-h-full max-w-full text-base text-p-2 dark:text-p-6"
            )}
          />
        ) : null}
        <input
          ref={inputRef}
          className={clsx(
            "my-1 py-2 px-3",
            { "pl-9": Icon },
            "transition ease-out",
            "w-full rounded-md dark:bg-p-2 bg-p-9 dark:text-p-10 relative",
            "focus:bg-p-10 focus:dark:bg-p-1",
            "border-[1.5px] dark:border border-p-4 dark:border-p-5",
            "focus:outline-none",
            "placeholder:text-p-4 dark:placeholder:text-p-6",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
          )}
          {...inputProps}
        />
        <IconButton type="button" {...decrementButtonProps} className="h-full">
          <svg viewBox="0 0 15 15" width="15" height="15">
            <rect x="0" y="6" width="15" height="3" fill="currentColor" />
          </svg>
        </IconButton>
        <IconButton type="button" {...incrementButtonProps} className="h-full">
          <svg viewBox="0 0 15 15" width="15" height="15">
            <rect x="6" y="0" width="3" height="15" fill="currentColor" />
            <rect x="0" y="6" width="15" height="3" fill="currentColor" />
          </svg>
        </IconButton>
      </div>

      {props?.errorMessage ? (
        <p className="text-xs text-[red] max-w-full">{props?.errorMessage}</p>
      ) : null}
    </div>
  );
};
