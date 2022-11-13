export const FullScreenDialog = ({
  open,
  className,
  children,
  ...props
}: JSX.IntrinsicElements['dialog']) => {
  return (
    <dialog
      open={open}
      className={`${className || ''}
    w-screen h-screen fixed inset-x-0 top-0 rounded-lg backdrop-blur-md p-5
    flex justify-center bg-[rgba(0,0,0,0.5)] overflow-y-auto
    `}
      {...props}
    >
      {children}
    </dialog>
  );
};
