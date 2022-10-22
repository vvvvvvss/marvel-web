import {
  Paper,
  Appbar,
  Box,
  Span,
  Heading,
  Heading2,
  Button,
  IconButton,
} from '@marvel/web-ui';
import { DropdownMenuIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import Navbar from '../components/Navbar';

const Uitest = () => {
  return (
    <Paper variant="window">
      <Navbar />
      <Box css={{ py: '$9', px: '$2', width: '100%' }}>
        <Heading>Uitest</Heading>
        <Heading2>components</Heading2>
        <Button variant={'standard'}>Button</Button>
        <Button variant={'outlined'}>Button</Button>
        <Button variant={'text'}>Button</Button>
        <IconButton>
          <DropdownMenuIcon />
        </IconButton>
        <IconButton variant={'outlined'}>
          <DropdownMenuIcon />
        </IconButton>
        <IconButton variant={'text'}>
          <DropdownMenuIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default Uitest;
