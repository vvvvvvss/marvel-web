import Navbar from "../components/Navbar";
import Context from "./Context";
import { IBM_Plex_Sans, IBM_Plex_Serif, IBM_Plex_Mono } from "next/font/google";
import "ui/styles.css";
import "../styles/globals.css";
import { Metadata } from "next";

//fonts
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
