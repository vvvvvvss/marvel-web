type PaperProps = JSX.IntrinsicElements['div'] & {
  shadow?: Boolean | 'hover';
  border?: Boolean;
  elevateOnHover?: Boolean;
};

export const Paper = ({
  children,
  className,
  shadow = false,
  border = false,
  elevateOnHover = false,
  ...props
}: PaperProps) => {
  return (
    <div
      className={`${className || ''}
    ${
      shadow === 'hover'
        ? `transition active:shadow-none hover:shadow-2xl hover:shadow-p-0 dark:hover:shadow-p-2`
        : shadow
        ? 'shadow-2xl shadow-p-0 dark:shadow-p-2'
        : ''
    }
    ${border ? 'border border-p-2 dark:border-p-6' : ''}
    ${
      elevateOnHover
        ? 'transition hover:translate-y-[-1px] active:scale-[97%]'
        : ''
    }
    `}
      {...props}
    >
      {children}
    </div>
  );
};
