import { styled } from './Stitches';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

export const Divider = styled(SeparatorPrimitive.Root, {
  backgroundColor: '$p3',
  '&[data-orientation=horizontal]': { height: 1, width: '100%' },
  '&[data-orientation=vertical]': { height: '100%', width: 1 },
});
