type TabGroup = JSX.IntrinsicElements['div'];

export const TabGroup = ({ children, className, ...props }: TabGroup) => {
  return (
    <div className={`${className || ''} flex`} {...props}>
      {children}
    </div>
  );
};

type TabProps = JSX.IntrinsicElements['button'] & { active?: boolean };

export const Tabs = ({
  active = false,
  children,
  className,
  ...props
}: TabProps) => {
  return (
    <button
      className={
        className ||
        '' +
          'relative overflow-hidden rounded-full p-2 aspect-square min-w-max cursor-pointer select-none transition hover:translate-y-[-1px] active:scale-[97%] border'
      }
      {...props}
    >
      {children}
    </button>
  );
};
