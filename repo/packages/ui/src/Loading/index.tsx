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
    <progress
      className={clsx(
        props?.className,
        "flex w-fit h-fit flex-col gap-2 items-center"
      )}
    >
      <div
        {...progressBarProps}
        className="flex gap-1 items-center justify-center"
      >
        <div className="transition rounded-full aspect-square w-2 animate-pulse ease-in-out bg-p-4 dark:bg-p-6" />
        <div
          className="transition rounded-full aspect-square w-2 animate-pulse ease-in-out bg-p-4 dark:bg-p-6"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="transition rounded-full aspect-square w-2 animate-pulse ease-in-out bg-p-4 dark:bg-p-6"
          style={{ animationDelay: "300ms" }}
        />
      </div>
      {showLabel && (
        <label className="text-xs text-p-3 dark:text-p-6" {...labelProps}>
          {props?.label}
        </label>
      )}
    </progress>
  );
};
