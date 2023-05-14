"use client";

import clsx from "clsx";
import { useProgressBar, AriaProgressBarProps } from "react-aria";

type LoadingPulserProps = AriaProgressBarProps & { className?: string };

export const LoadingPulser = ({ ...props }: LoadingPulserProps) => {
  const showLabel = !!props?.label;
  let { progressBarProps, labelProps } = useProgressBar({
    ...props,
    label: props?.label,
    isIndeterminate: true,
  });

  return (
    <div
      {...progressBarProps}
      className={clsx(
        props?.className,
        "um-flex um-w-fit um-h-fit um-flex-col um-gap-2 um-items-center"
      )}
    >
      <div className="um-flex um-gap-1 um-items-center um-justify-center">
        <div className="um-transition um-rounded-full um-aspect-square um-w-2 um-animate-pulse um-ease-in-out um-bg-p-4 dark:um-bg-p-6" />
        <div
          className="um-transition um-rounded-full um-aspect-square um-w-2 um-animate-pulse um-ease-in-out um-bg-p-4 dark:um-bg-p-6"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="um-transition um-rounded-full um-aspect-square um-w-2 um-animate-pulse um-ease-in-out um-bg-p-4 dark:um-bg-p-6"
          style={{ animationDelay: "300ms" }}
        />
      </div>
      {showLabel && (
        <label
          className="um-text-xs um-text-p-3 dark:um-text-p-6"
          {...labelProps}
        >
          {props?.label}
        </label>
      )}
    </div>
  );
};
