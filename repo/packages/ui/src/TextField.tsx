import clsx from "clsx";

type TextFieldProps = JSX.IntrinsicElements["input"] & {
  fullwidth?: boolean;
};

export const TextField = ({
  children,
  className,
  fullwidth,
  ...props
}: TextFieldProps) => {
  return (
    <input
      className={clsx(className, "ui-py-2 ui-px-3 ui-rounded-lg ui-bg-p-2", {
        "ui-w-full": fullwidth,
      })}
      {...props}
    >
      {children}
    </input>
  );
};
