import { createStitches } from '@stitches/react';
import { sage as primary, sageDark as primaryDark } from '@radix-ui/colors';

export const { createTheme, styled } = createStitches({
  theme: {
    colors: {
      primary1: primary.sage1,
      primary2: primary.sage2,
      primary3: primary.sage3,
      primary4: primary.sage4,
      primary5: primary.sage5,
      primary6: primary.sage6,
      primary7: primary.sage7,
      primary8: primary.sage8,
      primary9: primary.sage9,
      primary10: primary.sage10,
      primary11: primary.sage11,
      primary12: primary.sage12,
      accent: '#CC4E6C',
    },
    fonts: {},
  },
});

export const darkTheme = createTheme({
  colors: {
    primary1: primaryDark.sage1,
    primary2: primaryDark.sage2,
    primary3: primaryDark.sage3,
    primary4: primaryDark.sage4,
    primary5: primaryDark.sage5,
    primary6: primaryDark.sage6,
    primary7: primaryDark.sage7,
    primary8: primaryDark.sage8,
    primary9: primaryDark.sage9,
    primary10: primaryDark.sage10,
    primary11: primaryDark.sage11,
    primary12: primaryDark.sage12,
    accent: '#CC4E6C',
  },
});
