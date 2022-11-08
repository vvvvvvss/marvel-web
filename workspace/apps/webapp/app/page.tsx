import { Paper, Span, Heading, Button, Paragraph } from '@marvel/web-ui';
import Navbar from '../components/Navbar';

export function Index() {
  return (
    <Paper variant="window">
      <Navbar home />
      <div>
        <div>
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
                color: '$p9',
                fontSize: 'min(25vw, 120px)',
                fontWeight: '400',
                lineHeight: '0.5em',
                '@bp2': { fontSize: 'min(25vw, 200px)' },
              }}
            >
              marvel
            </Span>
          </Heading>
          <div>
            <Button variant={'standard'}>Dashboard</Button>
            <Button variant={'standard'}>About</Button>
            <Button variant={'standard'}>Tracks</Button>
            <Button variant={'standard'}>Courses</Button>
            <Button variant={'standard'}>Search</Button>
            <Button variant={'standard'}>Explore</Button>
          </div>
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
        </div>
      </div>
    </Paper>
  );
}

export default Index;
