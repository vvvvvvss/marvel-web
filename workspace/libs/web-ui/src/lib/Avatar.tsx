import { styled } from './Stitches';

export const Avatar = styled('img', {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '$round',
  userSelect: 'none',
  aspectRatio: '1 / 1',
  width: '$5',
  objectFit: 'cover',
  textIndent: '10000',
  '&::before': {
    content: `'@'`,
    color: '$p5',
    backgroundColor: '$p2',
    display: 'block',
    textAlign: 'center',
    position: 'absolute',
    width: '$5',
    aspectRatio: '1 / 1',
    overflow: 'hidden',
    borderRadius: '$round',
    userSelect: 'none',
    borderColor: '$p5',
    border: '1px solid',
    transform: 'translate(-1px, -1px)',
  },
});
