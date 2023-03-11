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
        "ui-overflow-hidden",
        "ui-rounded-full",
        "ui-px-[1.2em]",
        "ui-py-[0.5em]",
        "ui-min-w-max",
        "ui-whitespace-nowrap",
        "ui-cursor-pointer",
        "ui-select-none",
        "ui-transition",
        "hover:ui-translate-y-[-1px]",
        "active:ui-scale-[97%]",
        "ui-border",
        "disabled:ui-opacity-50",
        "disabled:ui-cursor-not-allowed",
        "disabled:active:ui-transform-none",
        "disabled:hover:ui-transform-none",
        "hover:ui-bg-p-2",
        "ui-text-p-10",
        {
          "ui-bg-p-1": variant == "outlined",
          "ui-border-p-6": variant == "outlined",
          "ui-border-transparent": variant == "text",
          "active:md:ui-text-p-8": variant == "text",
          "ui-bg-transparent": variant == "text",
          "ui-bg-p-2": variant == "standard",
          "hover:ui-bg-p-3": variant == "standard",
          "ui-border-p-2": variant == "standard",
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
        "ui-overflow-hidden",
        "ui-rounded-full",
        "ui-p-2",
        "ui-aspect-square",
        "ui-min-w-max",
        "ui-cursor-pointer",
        "ui-select-none",
        "ui-transition",
        "hover:ui-translate-y-[-1px]",
        "active:ui-scale-[97%]",
        "ui-border",
        "disabled:ui-opacity-50",
        "disabled:ui-cursor-not-allowed",
        "disabled:active:ui-transform-none",
        "disabled:hover:ui-transform-none",
        "hover:ui-bg-p-2",
        "ui-text-p-10",
        {
          "ui-bg-p-1": variant === "outlined",
          "ui-border-p-6": variant === "outlined",
          "ui-border-transparent": variant === "text",
          "hover:ui-border-p-2": variant === "text",
          "ui-bg-transparent": variant === "text",
          "active:sm:ui-text-p-8": variant === "text",
          "ui-bg-p-2": variant === "standard",
          "hover:ui-bg-p-3": variant === "standard",
          "ui-border-p-2": variant === "standard",
          "hover:ui-border-p-3": variant === "standard",
        }
      )}
    >
      {children}
    </button>
  );
};
