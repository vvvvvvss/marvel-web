import './globals.css';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>marvel.</title>
      </head>
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
