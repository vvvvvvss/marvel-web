import clsx from "clsx";

export const Window = ({
  children,
  className,
  ...props
}: JSX.IntrinsicElements["div"]) => {
  return (
    <div
      {...props}
      className={clsx(
        className,
        "um-w-full um-min-h-screen um-overflow-x-hidden um-flex um-justify-center um-bg-p-10 dark:um-bg-p-0"
      )}
    >
      {children}
    </div>
  );
};
