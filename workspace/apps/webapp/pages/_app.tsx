import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '../styles.css';
import { ThemeProvider } from 'next-themes';

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider
      session={session}
      refetchOnWindowFocus={false}
      refetchInterval={60 * 20}
    >
      <ThemeProvider
        attribute="class"
        enableSystem={false}
        defaultTheme={'dark'}
        themes={['light', 'dark']}
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default CustomApp;
