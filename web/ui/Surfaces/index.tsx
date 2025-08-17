import clsx from "clsx";

import type { JSX } from "react";

type PaperProps = JSX.IntrinsicElements["div"] & {
  shadow?: Boolean | "hover";
  border?: Boolean;
  elevateOnHover?: Boolean;
};

export const Paper = ({
  children,
  className,
  shadow = false,
  border = false,
  elevateOnHover = false,
  ...props
}: PaperProps) => {
  return (
    <div
      className={clsx(
        className,
        shadow === "hover"
          ? "transition ease-out hover:shadow-2xl active:shadow-lg hover:shadow-p-1 dark:hover:shadow-p-2"
          : shadow
          ? "shadow-2xl shadow-p-0 dark:shadow-p-2"
          : "",
        border && "border-[1.5px] dark:border border-p-0 dark:border-p-6",
        elevateOnHover
          ? "transition ease-out hover:translate-y-[-1.5px] active:scale-[97%]"
          : ""
      )}
      {...props}
    >
      {children}
    </div>
  );
};
