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
        className,
        "fixed",
        "z-max",
        "inset-x-0",
        "backdrop-blur-md",
        "border-y-[1.5px] dark:border-y",
        "dark:border-p-1 border-p-9",
        "flex",
        "justify-center",
        "p-2"
      )}
      {...props}
    >
      {children}
    </nav>
  );
};
