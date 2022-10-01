import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '../styles.css';

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider
      session={session}
      refetchOnWindowFocus={false}
      refetchInterval={60 * 5}
    >
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default CustomApp;
