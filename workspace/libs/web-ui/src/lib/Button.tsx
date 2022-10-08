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
        backgroundColor: '$primary30',
        borderColor: '$primary30',
        color: '$primary60',
        '&:hover': {
          borderColor: '$primary25',
          backgroundColor: '$primary25',
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
