"use client";
import { ReactEventHandler, SyntheticEvent, useState, type JSX } from "react";
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
        "select-none",
        "flex items-center justify-center aspect-square",
        "bg-p-8 dark:bg-p-3 rounded-full",
        "border-[1.5px] dark:border border-p-0 dark:border-p-7",
        {
          "w-8 h-8": size == "small",
          "w-10 h-10": size == "medium",
          "w-12 h-12": size == "large",
        },
        className
      )}
    >
      {status === "error" ? (
        <span className="text-p-4 dark:text-p-7 p-2">
          {fallbackChar?.[0] || alt?.[0]}
        </span>
      ) : (
        <img
          src={src}
          className="w-full h-full object-cover object-center rounded-full"
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
};
