// import { styled } from './Stitches';

// export const Button = styled('button', {
//   position: 'relative',
//   overflow: 'hidden',
//   borderRadius: '$pill',
//   border: '1.2px solid',
//   px: '1.2em',
//   py: '0.5em',
//   fontSize: '$3',
//   whiteSpace: 'nowrap',
//   minWidth: 'max-content',
//   cursor: 'pointer',
//   userSelect: 'none',
//   transition: 'background-color 200ms, transform 200ms',
//   '@hover': {
//     '&:hover': {
//       transform: 'translate(0px, -1px)',
//     },
//   },
//   '&:active': {
//     transform: 'scale(0.97, 0.97)',
//   },
//   variants: {
//     variant: {
//       standard: {
//         backgroundColor: '$p2',
//         borderColor: '$p2',
//         color: '$p10',
//         '@hover': {
//           '&:hover': {
//             borderColor: '$p3',
//             backgroundColor: '$p3',
//           },
//         },
//       },
//       outlined: {
//         backgroundColor: '$p1',
//         color: '$p10',
//         borderColor: '$p6',
//         '@hover': {
//           '&:hover': {
//             backgroundColor: '$p2',
//           },
//         },
//       },
//       text: {
//         backgroundColor: 'hsla(0,0%,0%,0)',
//         color: '$p10',
//         borderColor: 'hsla(0,0%,0%,0)',
//         '&:active': {
//           color: '$p8',
//         },
//         '@hover': {
//           '&:hover': {
//             backgroundColor: '$p2',
//           },
//           '&:active': {
//             color: '$p10',
//           },
//         },
//       },
//     },
//   },
//   defaultVariants: {
//     variant: 'standard',
//   },
// });

type ButtonProps = JSX.IntrinsicElements['button'] & { variant?: String };

export const Button = ({ variant = 'standard', ...props }: ButtonProps) => {
  return (
    <button
      className={`${props?.className || ''} 
    relative overflow-hidden rounded-full px-4 py-2 min-w-max whitespace-nowrap cursor-pointer select-none 
    transition hover:translate-y-px active:scale-95 border
    ${
      variant == 'outlined'
        ? 'bg-p-1 hover:bg-p-2 text-p-10 border-p-6'
        : variant == 'text'
        ? 'bg-transparent text-p-10 border-transparent '
        : ''
    }
    `}
    >
      {props?.children}
    </button>
  );
};
