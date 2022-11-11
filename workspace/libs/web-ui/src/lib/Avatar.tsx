export const Avatar = ({
  className,
  ...props
}: JSX.IntrinsicElements['img']) => {
  return (
    <img
      {...props}
      className={`${
        className || ''
      } relative overflow-hidden rounded-full aspect-square w-8 object-cover text-transparent`}
    />
  );
};
