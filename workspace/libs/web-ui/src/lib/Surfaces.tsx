type PaperProps = JSX.IntrinsicElements['div'] & {
  shadow?: Boolean;
  border?: Boolean;
};

export const Paper = ({
  children,
  className,
  shadow = false,
  border = false,
}: PaperProps) => {
  return (
    <div
      className={`${className || ''}
    ${shadow ? 'shadow-2xl shadow-p-0 dark:shadow-p-3' : ''}
    ${border ? 'border border-p-2 dark:border-p-7' : ''}
    `}
    >
      {children}
    </div>
  );
};
