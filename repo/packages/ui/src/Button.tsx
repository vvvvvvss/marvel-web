import clsx from "clsx";

type ButtonProps = JSX.IntrinsicElements["button"] & {
  variant?: "text" | "outlined" | "standard";
};

export const Button = ({
  variant = "standard",
  color = "p",
  ...props
}: ButtonProps) => {
  return (
    <button
      id={props?.id || "Button"}
      {...props}
      className={clsx(
        props?.className,
        "overflow-hidden",
        "rounded-full",
        "px-[1.2em]",
        "py-[0.5em]",
        "min-w-max",
        "whitespace-nowrap",
        "cursor-pointer",
        "select-none",
        "transition",
        "hover:translate-y-[-1px]",
        "active:scale-[97%]",
        "border",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
        "disabled:active:transform-none",
        "disabled:hover:transform-none",
        "hover:bg-p-2",
        "text-p-10",
        {
          "bg-p-1": variant == "outlined",
          "border-p-6": variant == "outlined",
          "border-transparent": variant == "text",
          "active:md:text-p-8": variant == "text",
          "bg-transparent": variant == "text",
          "bg-p-2": variant == "standard",
          "hover:bg-p-3": variant == "standard",
          "border-p-2": variant == "standard",
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
        "overflow-hidden",
        "rounded-full",
        "p-2",
        "aspect-square",
        "min-w-max",
        "cursor-pointer",
        "select-none",
        "transition",
        "hover:translate-y-[-1px]",
        "active:scale-[97%]",
        "border",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
        "disabled:active:transform-none",
        "disabled:hover:transform-none",
        "hover:bg-p-2",
        "text-p-10",
        {
          "bg-p-1": variant === "outlined",
          "border-p-6": variant === "outlined",
          "border-transparent": variant === "text",
          "hover:border-p-2": variant === "text",
          "bg-transparent": variant === "text",
          "active:sm:text-p-8": variant === "text",
          "bg-p-2": variant === "standard",
          "hover:bg-p-3": variant === "standard",
          "border-p-2": variant === "standard",
          "hover:border-p-3": variant === "standard",
        }
      )}
    >
      {children}
    </button>
  );
};
