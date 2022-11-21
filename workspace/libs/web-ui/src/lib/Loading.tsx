import { IconBase } from 'react-icons';
import { BsDot } from 'react-icons/bs';

export const LoadingPulser = ({
  className,
  ...props
}: JSX.IntrinsicElements['div']) => {
  return (
    <BsDot
      className={`${
        className || ''
      } aspect-square animate-pulse text-p-4 dark:text-p-8`}
    />
  );
};
