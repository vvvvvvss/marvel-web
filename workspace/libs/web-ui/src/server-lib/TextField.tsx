type TextFieldProps = JSX.IntrinsicElements['input'] & {
  fullwidth?: boolean;
};

export const TextField = ({
  children,
  className,
  fullwidth,
  ...props
}: TextFieldProps) => {
  return (
    <input
      className={`${className} 
    py-2 px-3 rounded-lg bg-p-2 
    ${fullwidth && 'w-full'}`}
      {...props}
    >
      {children}
    </input>
  );
};
