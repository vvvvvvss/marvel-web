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
        "overflow-hidden min-w-max whitespace-nowrap select-none max-w-fit transition ease-out cursor-default",
        "flex flex-nowrap items-center gap-2",
        "rounded-md px-[0.7em] py-[0.2em]",
        { "active:scale-95": clickable },
        { "cursor-pointer": clickable },
        { "hover:translate-y-[-1.5px]": clickable },
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
        "disabled:active:transform-none",
        "disabled:hover:transform-none",
        "font-medium dark:font-normal",
        "text-p-0 dark:text-p-10",
        //size
        {
          "text-xs": size == "small",
          "text-sm": size == "medium",
          "text-base": size == "large",
        },
        //variants
        {
          //standard
          "bg-p-9 dark:bg-p-2": variant == "standard",
          "border-[1.5px] border-p-8  dark:border-p-2 dark:hover:border-p-3":
            variant == "standard",
          "hover:border-p-0 dark:hover:border-p-3":
            variant == "standard" && clickable,
          //outlined
          "bg-p-10 dark:bg-p-1 ": variant == "outlined",
          "hover:bg-p-9 dark:hover:bg-p-2": variant == "outlined" && clickable,
          "border-[1.5px] dark:border-[1px] border-p-0 dark:border-p-6":
            variant == "outlined",
        }
      )}
    >
      {Left ? (
        <Left
          className={clsx("h-full aspect-square", "text-p-0 dark:text-p-10")}
        />
      ) : null}
      {props?.children}
      {Right ? (
        <Right
          className={clsx("h-full aspect-square", "text-p-0 dark:text-p-10")}
        />
      ) : null}
    </button>
  );
};
