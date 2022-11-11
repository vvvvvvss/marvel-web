'use client';

import { Appbar, Button, Avatar, IconButton } from '@marvel/web-ui';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import MenuIcon from '@heroicons/react/24/solid/Bars2Icon';

const Navbar = ({ home = false }) => {
  const { data: session } = useSession();

  return (
    <Appbar>
      <div
        className={`w-full max-w-screen-lg flex justify-between items-center relative `}
      >
        <div className="flex items-center">
          <IconButton variant={'text'} className="mr-2">
            <MenuIcon className="h-6 w-6 text-p-10" />
          </IconButton>
          <Link href={'/'}>
            <span className="text-p-8 font-semibold text-center cursor-pointer">
              MARVEL.
            </span>
          </Link>
        </div>
        {!home && (
          <div className="hidden md:block">
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
            <Link href={`/u/${session?.user?.slug}`} className="mr-3">
              <Avatar
                src={session?.user?.profilePic}
                alt={session?.user?.name}
              />
            </Link>
            <Button
              onClick={() => signOut()}
              className="text-sm hidden md:block"
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => signIn('google', { redirect: false })}
            className={'text-sm'}
          >
            Sign In
          </Button>
        )}
      </div>
    </Appbar>
  );
};

export default Navbar;
