import { IconBase } from 'react-icons';
import { BsDot } from 'react-icons/bs';

export const LoadingPulser = ({
  className,
  ...props
}: JSX.IntrinsicElements['div']) => {
  return (
    <div
      className={`${
        className || ''
      } aspect-square h-5 rounded-full animate-pulse bg-p-3 dark:text-p-8`}
    />
  );
};
