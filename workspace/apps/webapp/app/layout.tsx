import { Session } from 'next-auth';
import AuthContext from './Context';
import './globals.css';

function RootLayout({
  children,
  pageProps: { session, ...pageProps },
}: {
  children: React.ReactNode;
  pageProps: { session: Session };
}) {
  return (
    <html lang="en">
      <head>
        <title>marvel.</title>
      </head>
      <body>
        <AuthContext session={session}>{children}</AuthContext>
      </body>
    </html>
  );
}

export default RootLayout;
