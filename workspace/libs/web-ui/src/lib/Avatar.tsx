import { styled } from './Stitches';

export const Avatar = styled('img', {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '$round',
  userSelect: 'none',
  aspectRatio: '1 / 1',
  width: '$5',
  objectFit: 'cover',
});
