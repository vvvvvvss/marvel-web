"use client";

import clsx from "clsx";
import { useRef } from "react";
import {
  AriaButtonProps,
  LongPressProps,
  useButton,
  useLongPress,
  mergeProps,
} from "react-aria";

export type ButtonProps = AriaButtonProps &
  LongPressProps & {
    variant?: "text" | "outlined" | "standard";
    size?: "small" | "medium" | "large";
    className?: string;
    right?: React.ComponentType<any>;
    left?: React.ComponentType<any>;
  };

export const Button = ({
  variant = "standard",
  size = "medium",
  right: Right,
  left: Left,
  ...props
}: ButtonProps) => {
  let ref = useRef(null);
  let { buttonProps } = useButton(props, ref);
  let { longPressProps } = useLongPress(props);
  let { children } = props;

  return (
    <button
      {...mergeProps(buttonProps, longPressProps)}
      className={clsx(
        props?.className,
        //base classes
        "um-overflow-hidden um-min-w-max um-max-h-min um-whitespace-nowrap um-cursor-pointer um-select-none",
        "um-outline-none active:um-outline-none",
        "um-flex um-justify-center um-gap-2 um-flex-nowrap um-items-center",
        "um-rounded-full um-px-[1.2em] um-py-[0.5em]",
        "hover:um-translate-y-[-1.5px] active:um-scale-95 um-transition um-ease-out",
        "disabled:um-opacity-50",
        "disabled:um-cursor-not-allowed",
        "disabled:active:um-transform-none",
        "disabled:hover:um-transform-none",
        //size
        {
          "um-text-sm": size == "small",
          "um-text-base": size == "medium",
          "um-text-lg": size == "large",
        },
        //variants
        {
          //standard
          "um-bg-p-1 hover:um-bg-p-2 um-text-p-10 dark:um-bg-p-2 dark:hover:um-bg-p-3":
            variant == "standard",
          "um-border-[1.5px] um-border-p-1 hover:um-border-p-2 dark:um-border-p-2 dark:hover:um-border-p-3":
            variant == "standard",
          //outlined
          "um-bg-p-10 dark:um-bg-p-1 hover:um-bg-p-9 dark:hover:um-bg-p-2 um-text-p-0 dark:um-text-p-10":
            variant == "outlined",
          "um-border-[1.5px] dark:um-border um-border-p-0 dark:um-border-p-6":
            variant == "outlined",
          //text
          "um-underline um-text-p-0 dark:um-text-p-10 hover:um-bg-p-9 hover:dark:um-bg-p-1":
            variant === "text",
        }
      )}
    >
      {Left ? (
        <Left
          className={clsx(
            "um-h-full um-aspect-square -um-ml-1 -um-my-1",
            {
              "um-text-p-10": variant == "standard",
            },
            {
              "um-text-p-0 dark:um-text-p-10":
                variant == "outlined" || variant == "text",
            }
          )}
        />
      ) : null}
      {children}
      {Right ? (
        <Right
          className={clsx(
            "um-h-full um-aspect-square -um-mr-1 -um-my-1",
            {
              "um-text-p-10": variant == "standard",
            },
            {
              "um-text-p-0 dark:um-text-p-10":
                variant == "outlined" || variant == "text",
            }
          )}
        />
      ) : null}
    </button>
  );
};

export type IconButtonProps = AriaButtonProps &
  LongPressProps & {
    variant?: "text" | "outlined" | "standard";
    size?: "small" | "medium" | "large";
    className?: string;
  };

export const IconButton = ({
  variant = "standard",
  size = "medium",
  ...props
}: IconButtonProps) => {
  let ref = useRef(null);
  let { buttonProps } = useButton(props, ref);
  let { longPressProps } = useLongPress(props);
  let { children } = props;
  return (
    <button
      {...mergeProps(buttonProps, longPressProps)}
      className={clsx(
        props?.className,
        //base classes
        "um-cursor-pointer um-select-none",
        "um-outline-none active:um-outline-none focus:um-outline-none",
        "um-rounded-full um-p-2 um-aspect-square",
        "um-flex um-justify-center um-items-center",
        "hover:um-translate-y-[-1.5px] active:um-scale-95 um-transition um-ease-out",
        "um-text-p-0 dark:um-text-p-10",
        "disabled:um-opacity-50",
        "disabled:um-cursor-not-allowed",
        "disabled:active:um-transform-none",
        "disabled:hover:um-transform-none",
        //size
        {
          "um-text-sm": size == "small",
          "um-text-base": size == "medium",
          "um-text-2xl": size == "large",
        },
        //variants
        {
          //standard
          "um-bg-p-1 hover:um-bg-p-2 um-text-p-10 dark:um-bg-p-2 dark:hover:um-bg-p-3":
            variant == "standard",
          "um-border-[1.5px] um-border-p-1 hover:um-border-p-2 dark:um-border-p-2 dark:hover:um-border-p-3":
            variant == "standard",
          //outlined
          "um-bg-p-10 hover:um-bg-p-9 dark:um-bg-p-1 dark:hover:um-bg-p-2":
            variant == "outlined",
          "um-border-[1.5px] dark:um-border-[1px] um-border-p-0 dark:um-border-p-6":
            variant == "outlined",
          //text
          "um-underline hover:um-bg-p-9 hover:dark:um-bg-p-1":
            variant === "text",
        }
      )}
    >
      {children}
    </button>
  );
};
