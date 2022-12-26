type PaperProps = JSX.IntrinsicElements['div'] & {
  shadow?: Boolean;
  border?: Boolean;
};

export const Paper = ({
  children,
  className,
  shadow = false,
  border = false,
  ...props
}: PaperProps) => {
  return (
    <div
      className={`${className || ''}
    ${shadow ? 'shadow-2xl shadow-p-0 dark:shadow-p-2' : ''}
    ${border ? 'border border-p-2 dark:border-p-6' : ''}
    `}
      {...props}
    >
      {children}
    </div>
  );
};
