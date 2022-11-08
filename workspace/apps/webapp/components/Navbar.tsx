'use client';

import { Appbar, IconButton, Span, Button, Avatar } from '@marvel/web-ui';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

const Navbar = ({ home = false }) => {
  const { data: session } = useSession();

  return (
    <Appbar>
      <div
        className={`w-full max-w-screen-lg flex justify-between items-center relative `}
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
        <Link href={'/'}>
          <Span
            css={{
              color: '$p8',
              fontSize: '$3',
              fontWeight: '600',
              position: 'absolute',
              width: '100%',
              textAlign: 'center',
              cursor: 'pointer',
              '@bp1': {
                position: 'static',
                width: 'auto',
              },
            }}
          >
            MARVEL.
          </Span>
        </Link>

        {!home && (
          <div>
            <Button variant={'text'} className={`mr-2`}>
              Dashboard
            </Button>
            <Button variant={'text'} className={`mr-2`}>
              About
            </Button>
            <Button variant={'text'} className={`mr-2`}>
              Tracks
            </Button>
            <Button variant={'text'} className={`mr-2`}>
              Search
            </Button>
            <Button variant={'text'}>Explore</Button>
          </div>
        )}
        {session?.user ? (
          <div className="flex items-center">
            <Link href={`/profile/${session?.user?.slug}`}>
              <Avatar
                src={session?.user?.profilePic}
                alt={session?.user?.name}
                className={'absolute md:static mr-4'}
              />
            </Link>
            <Button onClick={() => signOut()} className="text-sm">
              Sign Out
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => signIn('google', { redirect: false })}
            variant={'standard'}
          >
            Sign In
          </Button>
        )}
      </div>
    </Appbar>
  );
};

export default Navbar;
