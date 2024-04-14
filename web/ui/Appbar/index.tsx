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
        "backdrop-blur-md",
        "border-y-[1.5px] dark:border-y",
        "border-p-9 dark:border-p-1",
        "flex",
        "justify-center",
        "py-2",
        "px-5",
        className
      )}
      {...props}
    >
      {children}
    </nav>
  );
};
