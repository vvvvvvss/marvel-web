export const Avatar = ({ ...props }: JSX.IntrinsicElements['img']) => {
  return (
    <img
      src={props?.src}
      alt={props?.alt || 'Avatar'}
      className={`${
        props?.className || ''
      } relative overflow-hidden rounded-full aspect-square w-8 object-cover `}
      {...props}
    />
  );
};
