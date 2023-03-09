export const Window = ({
  children,
  className,
  ...props
}: JSX.IntrinsicElements['div']) => {
  return (
    <div
      {...props}
      className={`${className || ''} w-full min-h-screen overflow-x-hidden 
    flex justify-center bg-p-10 dark:bg-p-0`}
    >
      {children}
    </div>
  );
};
