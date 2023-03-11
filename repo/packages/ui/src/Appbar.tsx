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
        "ui-fixed",
        "ui-z-max",
        "ui-inset-x-0",
        `ui-bg-[hsla(0, 0%, 9%, 0.5)]`,
        "ui-backdrop-blur-md",
        "ui-border-y",
        "ui-border-p-1",
        "ui-flex",
        "ui-justify-center",
        "ui-p-2"
      )}
      {...props}
    >
      {children}
    </nav>
  );
};
