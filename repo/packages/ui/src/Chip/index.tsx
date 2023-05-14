import clsx from "clsx";

type ChipProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "outlined" | "standard";
  clickable?: boolean;
  size?: "small" | "medium" | "large";
  right?: React.ComponentType<any>;
  left?: React.ComponentType<any>;
};

export const Chip = ({
  variant = "standard",
  size = "medium",
  clickable = false,
  right: Right,
  left: Left,
  ...props
}: ChipProps) => {
  return (
    <button
      id={props?.id || "Chip"}
      {...props}
      className={clsx(
        props?.className,
        //base classes
        "um-overflow-hidden um-min-w-max um-whitespace-nowrap um-select-none um-max-w-fit um-transition um-ease-out um-cursor-default",
        "um-flex um-flex-nowrap um-items-center um-gap-2",
        "um-rounded-md um-px-[0.7em] um-py-[0.2em]",
        { "active:um-scale-95": clickable },
        { "um-cursor-pointer": clickable },
        { "hover:um-translate-y-[-1.5px]": clickable },
        "disabled:um-opacity-50",
        "disabled:um-cursor-not-allowed",
        "disabled:active:um-transform-none",
        "disabled:hover:um-transform-none",
        "um-font-medium dark:um-font-normal",
        "um-text-p-0 dark:um-text-p-10",
        //size
        {
          "um-text-xs": size == "small",
          "um-text-sm": size == "medium",
          "um-text-base": size == "large",
        },
        //variants
        {
          //standard
          "um-bg-p-9 dark:um-bg-p-2": variant == "standard",
          "um-border-[1.5px] um-border-p-8 dark:um-border-p-2 dark:hover:um-border-p-3":
            variant == "standard",
          "hover:um-border-p-0 dark:hover:um-border-p-3":
            variant == "standard" && clickable,
          //outlined
          "um-bg-p-10 dark:um-bg-p-1 ": variant == "outlined",
          "hover:um-bg-p-9 dark:hover:um-bg-p-2":
            variant == "outlined" && clickable,
          "um-border-[1.5px] dark:um-border-[1px] um-border-p-0 dark:um-border-p-6":
            variant == "outlined",
        }
      )}
    >
      {Left ? (
        <Left
          className={clsx(
            "um-h-full um-aspect-square",
            "um-text-p-0 dark:um-text-p-10"
          )}
        />
      ) : null}
      {props?.children}
      {Right ? (
        <Right
          className={clsx(
            "um-h-full um-aspect-square",
            "um-text-p-0 dark:um-text-p-10"
          )}
        />
      ) : null}
    </button>
  );
};
