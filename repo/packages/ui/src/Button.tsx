import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "text" | "outlined" | "standard";
};

export const Button = ({ variant = "standard", ...props }: ButtonProps) => {
  return (
    <button
      id={props?.id || "Button"}
      {...props}
      className={clsx(
        props?.className,
        //base classes
        "overflow-hidden min-w-max whitespace-nowrap cursor-pointer select-none",
        "rounded-full px-[1.2em] py-[0.5em]",
        "hover:translate-y-[-1px] active:scale-[97%] transition",
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

export const IconButton = ({
  children,
  variant = "standard",
  ...props
}: ButtonProps) => {
  return (
    <button
      id={props?.id || "Button"}
      {...props}
      className={clsx(
        props?.className,
        //base classes
        "overflow-hidden min-w-max whitespace-nowrap cursor-pointer select-none",
        "rounded-full p-2 aspect-square",
        "hover:translate-y-[-1px] active:scale-[97%] transition",
        "text-p-0 dark:text-p-10",
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
      {children}
    </button>
  );
};
