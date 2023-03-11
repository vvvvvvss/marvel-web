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
        `bg-[hsla(0, 0%, 9%, 0.5)]`,
        "backdrop-blur-md",
        "border-y",
        "border-p-1",
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
