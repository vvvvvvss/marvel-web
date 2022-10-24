import { styled, lightTheme } from './Stitches';

export const Paper = styled('div', {
  backgroundColor: '$p10',
  variants: {
    variant: {
      window: {
        width: '100vw',
        position: 'relative',
        minHeight: '100vh',
        overflowX: 'hidden',
        display: 'flex',
        jc: 'center',
        backgroundColor: '$p0',
        [`.${lightTheme} &`]: {
          backgroundColor: '$p10',
        },
      },
    },
  },
});
