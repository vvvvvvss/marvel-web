import Navbar from "../components/Navbar";
import Context from "./Context";
import "ui/styles.css";
import "../styles/globals.css";

function RootLayout({ children, ...pageProps }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ scrollbarGutter: "stable" }}>
      <head>
        <title>marvel.</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body>
        <Context>
          {children}
          <Navbar />
        </Context>
      </body>
    </html>
  );
}

export default RootLayout;
