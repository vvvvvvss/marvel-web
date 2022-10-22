import { styled, lightTheme } from './Stitches';

export const Paper = styled('div', {
  backgroundColor: '$p10',
  variants: {
    variant: {
      window: {
        width: '100vw',
        minHeight: '100vh',
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
