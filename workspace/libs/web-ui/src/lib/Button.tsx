type ButtonProps = JSX.IntrinsicElements['button'] & {
  variant?: 'text' | 'outlined' | 'standard';
};

export const Button = ({ variant = 'standard', ...props }: ButtonProps) => {
  return (
    <button
      id={props?.id || 'Button'}
      {...props}
      className={`${props?.className || ''}
      relative overflow-hidden rounded-full px-[1.2em] py-[0.5em] min-w-max whitespace-nowrap cursor-pointer select-none
      transition hover:translate-y-[-1px] active:scale-[97%] border
      ${
        variant == 'outlined'
          ? 'bg-p-1 hover:bg-p-2 text-p-10 border-p-6'
          : variant == 'text'
          ? 'bg-transparent text-p-10 border-transparent hover:bg-p-2 active:md:text-p-8'
          : 'text-p-10 bg-p-2 hover:bg-p-3 border-p-2 hover:border-p-3'
      }
      `}
    >
      {props?.children}
    </button>
  );
};

export const IconButton = ({
  children,
  variant = 'standard',
  ...props
}: ButtonProps) => {
  return (
    <button
      id={props?.id || 'Button'}
      {...props}
      className={`${props?.className || ''}
      relative overflow-hidden rounded-full p-2 aspect-square min-w-max cursor-pointer select-none
      transition hover:translate-y-[-1px] active:scale-[97%] border
      ${
        variant == 'outlined'
          ? 'bg-p-1 hover:bg-p-2 text-p-10 border-p-6'
          : variant == 'text'
          ? 'text-p-10 bg-transparent border-transparent hover:border-p-2 hover:bg-p-2 active:sm:text-p-8 '
          : 'text-p-10 bg-p-2 border-p-2 hover:bg-p-3  hover:border-p-3'
      }
      `}
    >
      {children}
    </button>
  );
};
