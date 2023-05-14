import { ReactNode } from "react";
import clsx from "clsx";
type AppbarProps = {
  children?: ReactNode;
  className?: String;
};

export const Appbar = ({ children, className, ...props }: AppbarProps) => {
  return (
    <nav
      className={clsx(
        "um-backdrop-blur-md",
        "um-border-y-[1.5px] dark:um-border-y",
        "um-border-p-9 dark:um-border-p-1",
        "um-flex",
        "um-justify-center",
        "um-py-2",
        "um-px-5",
        className
      )}
      {...props}
    >
      {children}
    </nav>
  );
};
