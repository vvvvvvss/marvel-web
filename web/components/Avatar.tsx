"use client";;
import * as RadixAvatar from "@radix-ui/react-avatar";
import clsx from "clsx";

import type { JSX } from "react";

type AvatarProps = JSX.IntrinsicElements["img"];

export const Avatar = ({ className, src, alt, ...props }: AvatarProps) => {
  return (
    <RadixAvatar.Root
      className={clsx(
        className,
        "inline-flex items-center justify-center overflow-hidden select-none w-full max-h-10 max-w-[40px] aspect-square rounded-full"
      )}
    >
      <RadixAvatar.Image
        className="w-full aspect-square object-cover"
        src={src}
        alt={alt}
      />
      <RadixAvatar.Fallback
        className={clsx(
          "text-base border border-p-6 w-full h-full rounded-full flex justify-center items-center bg-p-10 dark:bg-p-0"
        )}
        delayMs={600}
      >
        {(alt || "A")[0]}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
};
