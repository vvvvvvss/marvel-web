import clsx from "clsx";

type TabGroupProps = JSX.IntrinsicElements["div"];

export const TabGroup = ({ children, className, ...props }: TabGroupProps) => {
  return (
    <div
      className={clsx(
        className,
        "ui-flex",
        "ui-border",
        "ui-rounded-full",
        "ui-max-w-min",
        "ui-p-2",
        "ui-border-p-6",
        "ui-w-min"
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
        "ui-relative",
        "ui-overflow-hidden",
        "ui-rounded-full",
        "ui-px-[1.2em]",
        "ui-py-[0.5em]",
        "ui-min-w-max",
        "ui-whitespace-nowrap",
        "ui-cursor-pointer",
        "ui-select-none",
        "ui-transition",
        "active:ui-scale-[97%]",
        "ui-border",
        "ui-border-transparent",
        "disabled:ui-opacity-50",
        "disabled:ui-cursor-not-allowed",
        "hover:ui-bg-p-1",
        "ui-text-p-10",
        "hover:ui-border-p-6",
        "active:ui-text-p-8",
        active && "ui-text-p-10",
        active && "ui-bg-p-2",
        active && "ui-border-p-2",
        active && "ui-pointer-events-none",
        active && "ui-cursor-not-allowed"
      )}
      {...props}
    >
      {children}
    </button>
  );
};
