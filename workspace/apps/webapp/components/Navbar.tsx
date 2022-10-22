import { Appbar, Box, IconButton, Span, Button, Avatar } from '@marvel/web-ui';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

const Navbar = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  console.log(session);

  return (
    <Appbar>
      <Box
        css={{
          width: '100%',
          maxWidth: '$lg',
          display: 'flex',
          jc: 'space-between',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <IconButton
          variant={'text'}
          css={{
            display: 'absolute',
            left: '$4',
            zIndex: '$4',
            '@bp2': { display: 'none' },
          }}
        >
          <HamburgerMenuIcon />
        </IconButton>
        <Span
          css={{
            color: '$p8',
            fontSize: '$3',
            fontWeight: '600',
            position: 'absolute',
            width: '100%',
            textAlign: 'center',
            '@bp1': {
              position: 'static',
              width: 'auto',
            },
          }}
        >
          MARVEL.
        </Span>
        <Box
          css={{
            display: 'none',
            '@bp1': { display: 'flex', alignItems: 'center', jc: 'center' },
          }}
        >
          <Button variant={'text'} css={{ mr: '$2', fontSize: '$2' }}>
            Dashboard
          </Button>
          <Button variant={'text'} css={{ mr: '$2', fontSize: '$2' }}>
            About
          </Button>
          <Button variant={'text'} css={{ mr: '$2', fontSize: '$2' }}>
            Tracks
          </Button>
          <Button variant={'text'} css={{ mr: '$2', fontSize: '$2' }}>
            Search
          </Button>
          <Button variant={'text'} css={{ fontSize: '$2' }}>
            Explore
          </Button>
        </Box>
        {session?.user ? (
          <Avatar
            src={session?.user?.image}
            alt={session?.user?.name}
            css={{
              fontSize: '$2',
              position: 'absolute',
              right: '$4',
              cursor: 'pointer',
              '@bp1': { position: 'static' },
            }}
          />
        ) : (
          <Button
            onClick={() =>
              session?.user
                ? signOut({ redirect: false })
                : signIn('google', { redirect: false })
            }
            variant={'standard'}
            css={{
              fontSize: '$2',
              position: 'absolute',
              right: '$4',
              '@bp1': { position: 'static' },
            }}
          >
            Sign In
          </Button>
        )}
      </Box>
    </Appbar>
  );
};

export default Navbar;
