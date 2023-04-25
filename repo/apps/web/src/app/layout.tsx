import Navbar from "../components/Navbar";
import Context from "./Context";
import { IBM_Plex_Sans, IBM_Plex_Serif, IBM_Plex_Mono } from "next/font/google";
import "ui/styles.css";
import "../styles/globals.css";
import { Metadata } from "next";
import Script from "next/script";

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

//seo
export const metadata: Metadata = {
  title: "marvel.",
  description: "UVCE's own Makerspace",
  applicationName: "UVCE Marvel",
  authors: [{ name: "UVCE" }, { name: "UVCE MARVEL" }],
  category: "Education and Research",
  icons: {
    icon: "/images/icon.png",
    shortcut: "/images/icon.png",
    apple: "/images/icon.png",
  },
  keywords: [
    "UVCE",
    "UVCE MARVEL",
    "University of visveswaraya college of engineering",
    "Makerspace for advanced research vital education and learning",
    "AIML",
    "cloud computing",
    "cyber security",
    "design and prototyping",
    "IOT",
    "Renewable energy",
  ],
  openGraph: {
    type: "website",
    title: "marvel.",
    description: "UVCE's own Makerspace",
    images: [
      {
        url: "https://res.cloudinary.com/marvelweb/image/upload/v1678988482/Group_38_qrhqag.jpg",
        secureUrl:
          "https://res.cloudinary.com/marvelweb/image/upload/v1678988482/Group_38_qrhqag.jpg",
        type: "image/jpeg",
        width: 800,
        height: 800,
      },
    ],
  },
  verification: {
    google:
      "google-site-verification=Y5hIMuxUte2UyH-z8ckmijpiceu351-U7pdhDgKfSSo",
  },
};

function RootLayout({ children, ...pageProps }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
      style={{ scrollbarGutter: "stable" }}
    >
      <head>
        {/* microsoft clarity tracking */}
        <Script id="clarity-ms" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "aew7b13k2i");
          `}
        </Script>
        {/* google analytics tracking */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-VV9ZYE0VC2"
        ></Script>
        <Script strategy="afterInteractive" id="g-tag">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-VV9ZYE0VC2');
          `}
        </Script>
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
