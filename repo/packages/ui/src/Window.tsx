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
        "ui-w-full ui-min-h-screen ui-overflow-x-hidden ui-flex ui-justify-center ui-bg-p-10 dark:ui-bg-p-0"
      )}
    >
      {children}
    </div>
  );
};
