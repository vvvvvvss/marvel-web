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
      className={clsx(className, "py-2 px-3 rounded-lg bg-p-2", {
        "w-full": fullwidth,
      })}
      {...props}
    >
      {children}
    </input>
  );
};
