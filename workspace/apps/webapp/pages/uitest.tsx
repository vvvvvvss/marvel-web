import {
  Paper,
  Appbar,
  Box,
  Span,
  Heading,
  Heading2,
  Button,
} from '@marvel/web-ui';

const Uitest = () => {
  return (
    <Paper
      css={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        jc: 'center',
        backgroundColor: '$primary1',
      }}
    >
      <Appbar>
        <Box css={{ maxWidth: '$lg' }}>
          <Box>
            <Span>uvce marvel</Span>
          </Box>
        </Box>
      </Appbar>
      <Box css={{ py: '$9', px: '$2', width: '100%' }}>
        <Heading>Uitest</Heading>
        <Heading2>components</Heading2>
        <Button variant={'standard'}>Button</Button>
        <Button variant={'outlined'}>Button</Button>
        <Button variant={'text'}>Button</Button>
      </Box>
    </Paper>
  );
};

export default Uitest;
