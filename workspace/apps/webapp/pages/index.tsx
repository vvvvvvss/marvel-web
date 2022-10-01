import { Paper, Appbar, Box, Span } from '@marvel/web-ui';
import { useSession, signIn, signOut } from 'next-auth/react';

export function Index() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <Paper
      css={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        jc: 'center',
      }}
    >
      <Appbar css={{ backgroundColor: '$primary1' }}>
        <Box css={{ maxWidth: '$lg' }}>
          <Box></Box>
        </Box>
      </Appbar>
      <Box css={{ maxWidth: '$xl', marginTop: '$8', width: '100%' }}>
        {session ? (
          <>
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut({ redirect: false })}>
              Sign out
            </button>
          </>
        ) : (
          <>
            Not signed in <br />
            <button onClick={() => signIn('google', { redirect: false })}>
              Sign in
            </button>
          </>
        )}
      </Box>
    </Paper>
  );
}

export default Index;
