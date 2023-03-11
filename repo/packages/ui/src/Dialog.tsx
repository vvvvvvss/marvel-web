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
        "ui-w-screen",
        "ui-h-screen",
        "ui-fixed",
        "ui-inset-x-0",
        "ui-top-0",
        "ui-rounded-lg",
        "ui-backdrop-blur-md",
        "ui-p-5",
        "ui-flex",
        "ui-justify-center",
        "ui-overflow-y-auto",
        "ui-bg-[hsla(0, 0%, 9%, 0.5)]"
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
        "ui-fixed",
        "ui-top-1/2",
        "ui-left-1/2",
        "-ui-translate-x-1/2",
        "-ui-translate-y-1/2",
        "ui-rounded-lg",
        "ui-backdrop-blur-md",
        "ui-p-5",
        "ui-flex",
        "ui-justify-center",
        "ui-overflow-y-auto",
        `ui-bg-[hsla(0, 0%, 9%, 0.5)]`
      )}
      {...props}
    >
      {children}
    </dialog>
  );
};
