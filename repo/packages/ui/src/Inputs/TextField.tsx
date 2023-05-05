import clsx from "clsx";
import { useTextField } from "react-aria";
import type { AriaTextFieldProps } from "react-aria";
import { useRef } from "react";

export type TextFieldProps = AriaTextFieldProps & {
  fullWidth?: boolean;
  label?: string;
  className?: string;
};

export const TextField = ({
  className,
  fullWidth = false,
  ...props
}: TextFieldProps) => {
  let ref = useRef(null);
  let { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props, ref);

  return (
    <div
      className={clsx(
        className,
        "flex flex-col items-start",
        fullWidth ? "w-full" : "w-fit"
      )}
    >
      {props?.label ? (
        <label
          className={clsx("font-medium max-w-full", {
            "after:content-[*]": props?.isRequired,
          })}
          {...labelProps}
        >
          {props?.label}
        </label>
      ) : null}
      {props?.description ? (
        <p
          className={clsx("text-xs text-p-3 dark:text-p-7 max-w-full")}
          {...descriptionProps}
        >
          {props?.description}
        </p>
      ) : null}

      <div className="w-full">
        <input
          className={clsx(
            "py-2 px-3 my-1 rounded-md dark:bg-p-2 bg-p-9 w-full",
            "transition ease-out",
            "hover:-translate-y-[1.5px] active:-translate-y-[1.5px] focus:-translate-y-[1.5px]",
            "focus:bg-p-10 focus:dark:bg-p-1",
            "border-[1.5px] dark:border border-p-4 dark:border-p-5",
            "placeholder:text-p-4 dark:placeholder:text-p-6",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
          )}
          {...inputProps}
          ref={ref}
        />
      </div>

      {props?.errorMessage ? (
        <p className="text-xs text-[red] max-w-full" {...errorMessageProps}>
          {props?.errorMessage}
        </p>
      ) : null}
    </div>
  );
};
