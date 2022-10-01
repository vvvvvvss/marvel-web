import { styled } from './Stitches';
//Appbar is a bar that stretches accross the app. By default, its fixed at the top. New variants will be defined later
export const Appbar = styled('nav', {
  position: 'fixed',
  top: 0,
  right: 0,
  left: 0,
  backgroundColor: '$primary5',
  display: 'flex',
  jc: 'center',
  py: '$2', //padding of 2 space units
  px: '$2',
});
