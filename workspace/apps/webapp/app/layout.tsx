'use client';

import AuthContext from './Context';
import './globals.css';

function RootLayout({ children, ...pageProps }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>marvel.</title>
      </head>
      <body>
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}

export default RootLayout;
