type TabGroup = JSX.IntrinsicElements['div'];

export const TabGroup = ({ children, className, ...props }: TabGroup) => {
  return (
    <div
      className={`${
        className || ''
      } flex border rounded-full max-w-min p-2 border-p-6 w-min`}
      {...props}
    >
      {children}
    </div>
  );
};

type TabProps = JSX.IntrinsicElements['button'] & { active?: boolean };

export const Tab = ({
  active = false,
  children,
  className,
  ...props
}: TabProps) => {
  return (
    <button
      className={`${
        className || ''
      } relative overflow-hidden rounded-full px-[1.2em] py-[0.5em] min-w-max whitespace-nowrap cursor-pointer select-none
      transition active:scale-[97%] border border-transparent
     hover:bg-p-1 text-p-10 hover:border-p-6 active:text-p-8
      ${
        active
          ? 'text-p-10 bg-p-2 border-p-2 pointer-events-none cursor-not-allowed'
          : ''
      }
      `}
      {...props}
    >
      {children}
    </button>
  );
};
