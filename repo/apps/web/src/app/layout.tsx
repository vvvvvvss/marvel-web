import Navbar from "../components/Navbar";
import Context from "./Context";
import { IBM_Plex_Sans, IBM_Plex_Serif, IBM_Plex_Mono } from "next/font/google";
import "ui/styles.css";
import "../styles/globals.css";

const sans = IBM_Plex_Sans({
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-ibm-sans",
  display: "swap",
  subsets: ["latin-ext"],
});

const serif = IBM_Plex_Serif({
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-ibm-serif",
  display: "swap",
  subsets: ["latin-ext"],
});

const mono = IBM_Plex_Mono({
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-ibm-mono",
  display: "swap",
  subsets: ["latin-ext"],
});

function RootLayout({ children, ...pageProps }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
      style={{ scrollbarGutter: "stable" }}
    >
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
