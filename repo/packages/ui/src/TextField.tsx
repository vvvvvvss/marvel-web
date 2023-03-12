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
      className={clsx(
        className,
        "py-2 px-3 rounded-lg dark:bg-p-2 bg-p-9 border-[1.5px] dark:border border-p-4 dark:border-p-5 placeholder:text-p-2 dark:placeholder:text-p-6",
        {
          "w-full": fullwidth,
        }
      )}
      {...props}
    >
      {children}
    </input>
  );
};
