import clsx from "clsx";

type ChipProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "text" | "outlined" | "standard";
  clickable?: boolean;
};

export const Chip = ({
  variant = "standard",
  clickable = false,
  ...props
}: ChipProps) => {
  return (
    <button
      id={props?.id || "Chip"}
      {...props}
      className={clsx(
        props?.className,
        //base classes
        "overflow-hidden min-w-max whitespace-nowrap select-none max-w-fit text-sm transition",
        "rounded-lg px-[0.7em] py-[0.2em]",
        { "active:scale-[97%]": clickable },
        { "cursor-pointer": clickable },
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
        "disabled:active:transform-none",
        "disabled:hover:transform-none",
        //variants
        {
          //standanrd
          "bg-p-8 hover:bg-p-9 dark:bg-p-2 dark:hover:bg-p-3":
            variant == "standard",
          "border-[1.5px] border-p-8 hover:border-p-0 dark:border-p-2 dark:hover:border-p-3":
            variant == "standard",
          //outlined
          "bg-p-10 hover:bg-p-9 dark:bg-p-1 dark:hover:bg-p-2":
            variant == "outlined",
          "border-[1.5px] dark:border-[1px] border-p-0 dark:border-p-6":
            variant == "outlined",
          //text
          "underline hover:bg-p-9 hover:dark:bg-p-1": variant === "text",
        }
      )}
    >
      {props?.children}
    </button>
  );
};
