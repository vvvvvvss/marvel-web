import { styled } from './Stitches';

export const Avatar = styled('img', {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '$pill',
  userSelect: 'none',
  aspectRatio: '1 / 1',
  width: '$5',
  objectFit: 'cover',
  textIndent: '10000',
  color: 'transparent',
  '&::before': {
    content: `'@'`,
    color: '$p5',
    backgroundColor: '$p2',
    display: 'flex',
    jc: 'center',
    ai: 'center',
    position: 'absolute',
    borderRadius: '$round',
    width: '$5',
    aspectRatio: '1 / 1',
    borderColor: '$p5',
    border: '1px solid',
    transform: 'translate(-3%, -3%)',
  },
});
