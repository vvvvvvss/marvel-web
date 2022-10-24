import { Paper, Box, Span, Heading, Button, Paragraph } from '@marvel/web-ui';
import Navbar from '../components/Navbar';

export function Index() {
  return (
    <Paper variant="window">
      <Navbar home />
      <Box
        css={{
          py: '$9',
          px: '$4',
          width: '100%',
          maxWidth: '$lg',
          '@bp2': { px: '0px' },
        }}
      >
        <Box
          css={{
            display: 'flex',
            fd: 'column',
            ai: 'center',
            width: '100%',
            '@bp2': { mt: '$6' },
          }}
        >
          <Heading css={{ position: 'relative', zIndex: '1' }}>
            <Span
              css={{
                fontSize: '$5',
                color: '$p7',
                ml: '2.5%',
              }}
            >
              UVCE's
            </Span>
            <br />
            <Span
              css={{
                fontSize: 'min(25vw, 120px)',
                fontWeight: '400',
                lineHeight: '0.5em',
                '@bp2': { fontSize: 'min(25vw, 200px)' },
              }}
            >
              marvel
            </Span>
          </Heading>
          <Box
            css={{
              display: 'flex',
              flexWrap: 'wrap',
              jc: 'center',
              zIndex: '1',
            }}
          >
            <Button
              variant={'standard'}
              css={{ mr: '$2', fontSize: '$2', mb: '$2' }}
            >
              Dashboard
            </Button>
            <Button
              variant={'standard'}
              css={{ mr: '$2', fontSize: '$2', mb: '$2' }}
            >
              About
            </Button>
            <Button
              variant={'standard'}
              css={{ mr: '$2', fontSize: '$2', mb: '$2' }}
            >
              Tracks
            </Button>
            <Button
              variant={'standard'}
              css={{ mr: '$2', fontSize: '$2', mb: '$2' }}
            >
              Courses
            </Button>
            <Button
              variant={'standard'}
              css={{ mr: '$2', fontSize: '$2', mb: '$2' }}
            >
              Search
            </Button>
            <Button variant={'standard'} css={{ fontSize: '$2', mb: '$2' }}>
              Explore
            </Button>
          </Box>
          <Paragraph
            css={{
              color: '$p8',
              maxWidth: '600px',
              marginLeft: '1%',
              fontSize: '$5',
              fontWeight: '400',
              textAlign: 'center',
            }}
          >
            Makerspace for Advanced Research, Vital Education and Learning AKA
            Marvel at University of Visvesvaraya College of Engineering.
          </Paragraph>
        </Box>
      </Box>
    </Paper>
  );
}

export default Index;
