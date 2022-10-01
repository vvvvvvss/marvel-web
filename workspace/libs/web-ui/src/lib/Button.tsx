import { styled } from './Stitches';

export const Button = styled('button', {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '$pill',
  border: '1.5px solid',
  px: '1.2em',
  py: '0.5em',
  fontSize: '$3',
  fontWeight: '600',
  cursor: 'pointer',
  '& + button': {
    marginLeft: '10px',
  },
  variants: {
    variant: {
      standard: {
        backgroundColor: '$primary9',
        borderColor: '$primary9',
        color: '$primary1',
        '&:hover': {
          borderColor: '$primary10',
          backgroundColor: '$primary10',
        },
        '&:active': {
          backgroundColor: '$primary11',
          borderColor: '$primary11',
        },
      },
      outlined: {
        backgroundColor: 'rgba(0,0,0,0)',
        color: '$primary11',
        borderColor: '$primary11',
        '&:hover': {
          backgroundColor: '$primary4',
        },
      },
      text: {
        backgroundColor: 'rgba(0,0,0,0)',
        color: '$primary12',
        borderColor: 'rgba(0,0,0,0)',
        '&:hover': {
          backgroundColor: '$primary5',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'standard',
  },
});
