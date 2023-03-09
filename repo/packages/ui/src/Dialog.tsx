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

export const Dialog = ({
  open,
  className,
  children,
  ...props
}: JSX.IntrinsicElements['dialog']) => {
  return (
    <dialog
      open={open}
      className={`${className || ''}
    fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg backdrop-blur-md p-5
    flex justify-center bg-[rgba(0,0,0,0.5)] overflow-y-auto
    `}
      {...props}
    >
      {children}
    </dialog>
  );
};
