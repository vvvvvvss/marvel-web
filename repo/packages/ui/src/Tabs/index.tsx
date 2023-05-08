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
        "flex",
        "transition ease-out",
        "overflow-auto",
        orientation == "vertical" && "flex-col",
        "border-[1.5px] dark:border",
        orientation === "vertical" ? "rounded-lg" : "rounded-full",
        "max-w-min",
        "p-2",
        "border-p-0 dark:border-p-6",
        "w-min"
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
        "relative",
        "overflow-hidden",
        "rounded-full",
        "px-[1.2em]",
        "py-[0.5em]",
        "min-w-max",
        "whitespace-nowrap",
        "cursor-pointer",
        "select-none",
        "transition",
        "active:scale-95",
        "border-[1.5px] dark:border",
        "border-transparent",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
        "hover:bg-p-9 dark:hover:bg-p-1",
        "text-p-0 dark:text-p-10",
        "hover:border-p-0 dark:hover:border-p-6",
        "dark:active:text-p-8",
        active && "text-p-0 dark:text-p-10",
        active && "bg-p-8 dark:bg-p-2",
        active && "border-p-8 dark:border-p-2",
        active && "pointer-events-none",
        active && "cursor-not-allowed"
      )}
      {...props}
    >
      {children}
    </button>
  );
};
