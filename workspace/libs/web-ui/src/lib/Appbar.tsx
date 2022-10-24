import { styled, lightTheme } from './Stitches';
export const Appbar = styled('nav', {
  position: 'fixed',
  zIndex: '$max',
  top: 0,
  right: 0,
  left: 0,
  backgroundColor: 'hsla(0, 0%, 9%, 0.5)',
  backdropFilter: 'blur(10px)',
  border: '1px solid',
  borderColor: '$p1',
  display: 'flex',
  jc: 'center',
  py: '$2',
  px: '$2',
});
