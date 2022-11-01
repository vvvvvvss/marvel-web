'use client';

import { SessionProvider } from 'next-auth/react'; //session context.
import { ThemeProvider } from 'next-themes'; //provides theme context. not related to tailwind

function Context({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchOnWindowFocus={false} refetchInterval={60 * 20}>
      <ThemeProvider
        attribute="class"
        enableSystem={false}
        defaultTheme={'dark'}
        themes={['light', 'dark']}
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}

export default Context;
