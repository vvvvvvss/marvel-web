import clsx from "clsx";

export const LoadingPulser = ({
  className,
  ...props
}: JSX.IntrinsicElements["div"]) => {
  return (
    <div
      className={clsx(
        className,
        "aspect-square",
        "h-5",
        "rounded-full",
        "animate-pulse",
        "bg-p-3",
        "dark:text-p-8"
      )}
    />
  );
};
