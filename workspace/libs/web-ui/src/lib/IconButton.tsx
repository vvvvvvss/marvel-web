import { styled } from './Stitches';

export const IconButton = styled('button', {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '$pill',
  aspectRatio: '1 / 1',
  border: '1.2px solid',
  padding: '$2',
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'background-color 200ms, transform 200ms',
  '@hover': {
    '&:hover': {
      transform: 'translate(0px, -1px)',
    },
  },
  '&:active': {
    transform: 'scale(0.97, 0.97)',
  },
  '&:disabled': {
    cursor: 'not-allowed',
    color: '$p5',
    '&:hover': {
      transform: 'none',
    },
    '&:active': {
      color: '$p5',
    },
  },
  variants: {
    variant: {
      standard: {
        backgroundColor: '$p2',
        borderColor: '$p2',
        color: '$p10',
        '@hover': {
          '&:hover': {
            borderColor: '$p3',
            backgroundColor: '$p3',
          },
        },
      },
      outlined: {
        backgroundColor: 'rgba(0,0,0,0)',
        color: '$p10',
        borderColor: '$p10',
        '@hover': {
          '&:hover': {
            backgroundColor: '$p2',
          },
        },
      },
      text: {
        backgroundColor: 'hsla(0,0%,0%,0)',
        color: '$p10',
        borderColor: 'hsla(0,0%,0%,0)',
        '&:active': {
          color: '$p8',
        },
        '@hover': {
          '&:hover': {
            backgroundColor: '$p2',
          },
          '&:active': {
            color: '$p10',
          },
        },
      },
    },
  },
  defaultVariants: {
    variant: 'standard',
  },
});
