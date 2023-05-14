"use client";
import { ReactEventHandler, SyntheticEvent, useState } from "react";
import clsx from "clsx";

export type AvatarProps = JSX.IntrinsicElements["image"] & {
  src: string;
  alt: string;
  size?: "small" | "medium" | "large";
  fallbackChar?: string;
  className?: string;
};

export const Avatar = ({
  src,
  alt,
  size = "medium",
  fallbackChar,
  className,
  ...props
}: AvatarProps) => {
  const [status, setStatus] = useState<"error" | "ready">("ready");
  const handleError: ReactEventHandler = (
    e: SyntheticEvent<SVGImageElement, Event>
  ) => {
    setStatus("error");
    props?.onError && props?.onError(e);
  };

  const handleLoad: ReactEventHandler = (
    e: SyntheticEvent<SVGImageElement, Event>
  ) => {
    setStatus("ready");
    props?.onLoad && props?.onLoad(e);
  };

  return (
    <div
      className={clsx(
        "um-select-none",
        "um-flex um-items-center um-justify-center um-aspect-square",
        "um-bg-p-8 dark:um-bg-p-3 um-rounded-full",
        "um-border-[1.5px] dark:um-border um-border-p-0 dark:um-border-p-7",
        {
          "um-w-8 um-h-8": size == "small",
          "um-w-10 um-h-10": size == "medium",
          "um-w-12 um-h-12": size == "large",
        },
        className
      )}
    >
      {status === "error" ? (
        <span className="um-text-p-4 dark:um-text-p-7 um-p-2">
          {fallbackChar?.[0] || alt?.[0]}
        </span>
      ) : (
        <img
          src={src}
          className="um-w-full um-h-full um-object-cover um-object-center um-rounded-full"
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
};
