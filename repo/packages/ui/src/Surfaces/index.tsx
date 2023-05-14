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
          ? "um-transition um-ease-out hover:um-shadow-2xl active:um-shadow-lg hover:um-shadow-p-1 dark:hover:um-shadow-p-2"
          : shadow
          ? "um-shadow-2xl um-shadow-p-0 dark:um-shadow-p-2"
          : "",
        border &&
          "um-border-[1.5px] dark:um-border um-border-p-0 dark:um-border-p-6",
        elevateOnHover
          ? "um-transition um-ease-out hover:um-translate-y-[-1.5px] active:um-scale-[97%]"
          : ""
      )}
      {...props}
    >
      {children}
    </div>
  );
};
