import clsx from "clsx";

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
          ? "ui-transition active:ui-shadow-none hover:ui-shadow-2xl hover:ui-shadow-p-0 dark:hover:ui-shadow-p-2"
          : shadow
          ? "ui-shadow-2xl ui-shadow-p-0 dark:ui-shadow-p-2"
          : "",
        border ? "ui-border ui-border-p-2 dark:ui-border-p-6" : "",
        elevateOnHover
          ? "ui-transition hover:ui-translate-y-[-1px] active:ui-scale-[97%]"
          : ""
      )}
      {...props}
    >
      {children}
    </div>
  );
};
