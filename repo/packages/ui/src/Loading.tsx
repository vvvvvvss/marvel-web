import clsx from "clsx";

export const LoadingPulser = ({
  className,
  ...props
}: JSX.IntrinsicElements["div"]) => {
  return (
    <div
      className={clsx(
        className,
        "ui-aspect-square",
        "ui-h-5",
        "ui-rounded-full",
        "ui-animate-pulse",
        "ui-bg-p-3",
        "dark:ui-text-p-8"
      )}
    />
  );
};
