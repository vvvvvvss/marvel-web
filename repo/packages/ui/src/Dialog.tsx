import clsx from "clsx";

export const FullScreenDialog = ({
  open,
  className,
  children,
  ...props
}: JSX.IntrinsicElements["dialog"]) => {
  return (
    <dialog
      open={open}
      className={clsx(
        className,
        "w-screen",
        "h-screen",
        "fixed",
        "inset-x-0",
        "top-0",
        "rounded-lg",
        "backdrop-blur-md",
        "p-5",
        "flex",
        "justify-center",
        "overflow-y-auto",
        "bg-p-10 dark:bg-p-1",
        "bg-opacity-50"
      )}
      {...props}
    >
      {children}
    </dialog>
  );
};

export const Dialog = ({
  open,
  className,
  children,
  ...props
}: JSX.IntrinsicElements["dialog"]) => {
  return (
    <dialog
      open={open}
      className={clsx(
        className,
        "top-1/2 -translate-y-1/2",
        "left-1/2 -translate-x-1/2",
        "fixed",
        "min-w-[300px]",
        "rounded-lg",
        "backdrop-blur-md",
        "p-5",
        "flex",
        "justify-center",
        "overflow-y-auto",
        `bg-[hsla(0, 0%, 9%, 0.5)]`
      )}
      {...props}
    >
      {children}
    </dialog>
  );
};
