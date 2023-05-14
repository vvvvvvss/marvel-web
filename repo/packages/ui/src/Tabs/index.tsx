import clsx from "clsx";

type TabGroupProps = JSX.IntrinsicElements["div"] & {
  orientation?: "vertical" | "horizontal";
};

export const TabGroup = ({
  children,
  className,
  orientation = "horizontal",
  ...props
}: TabGroupProps) => {
  return (
    <div
      className={clsx(
        className,
        "um-flex",
        "um-transition um-ease-out",
        "um-overflow-auto",
        orientation == "vertical" && "um-flex-col",
        "um-border-[1.5px] dark:um-border",
        orientation === "vertical" ? "um-rounded-lg" : "um-rounded-full",
        "um-max-w-min",
        "um-p-2",
        "um-border-p-0 dark:um-border-p-6",
        "um-w-min"
      )}
      {...props}
    >
      {children}
    </div>
  );
};

type TabProps = JSX.IntrinsicElements["button"] & {
  active?: boolean;
};

export const Tab = ({
  active = false,
  children,
  className,
  ...props
}: TabProps) => {
  return (
    <button
      className={clsx(
        className,
        "um-relative",
        "um-overflow-hidden",
        "um-rounded-full",
        "um-px-[1.2em]",
        "um-py-[0.5em]",
        "um-min-w-max",
        "um-whitespace-nowrap",
        "um-cursor-pointer",
        "um-select-none",
        "um-transition",
        "active:um-scale-95",
        "um-border-[1.5px] dark:um-border",
        "um-border-transparent",
        "disabled:um-opacity-50",
        "disabled:um-cursor-not-allowed",
        "hover:um-bg-p-9 dark:hover:um-bg-p-1",
        "um-text-p-0 dark:um-text-p-10",
        "hover:um-border-p-0 dark:hover:um-border-p-6",
        "dark:active:um-text-p-8",
        active && "um-text-p-0 dark:um-text-p-10",
        active && "um-bg-p-8 dark:um-bg-p-2",
        active && "um-border-p-8 dark:um-border-p-2",
        active && "um-pointer-events-none",
        active && "um-cursor-not-allowed"
      )}
      {...props}
    >
      {children}
    </button>
  );
};
