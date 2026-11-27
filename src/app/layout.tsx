import type { Metadata } from "next";
import Script from "next/script";
import {
  Faculty_Glyphic,
  Geist,
  Geist_Mono,
  Nunito,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const facultyGlyphic = Faculty_Glyphic({
  variable: "--font-faculty-glyphic",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ogbor Youth Tech Fest 2026 | Unlocking a New Digital Era",
  description: "Join Ogbor Youth Tech Fest 2026 in Aba, Abia State for a day of digital skills, innovation, entrepreneurship and new opportunities.",
};

const FACEBOOK_PIXEL_ID = "3592487504246114";

const FACEBOOK_PIXEL_SCRIPT = `
!function(f,b,e,v,n,t,s){
  if(f.fbq)return;
  n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
  t=b.createElement(e);t.async=!0;t.src=v;
  s=b.getElementsByTagName(e)[0];
  if(s&&s.parentNode){s.parentNode.insertBefore(t,s)}else{b.head.appendChild(t)}
}(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
window.fbq('init', '${FACEBOOK_PIXEL_ID}');
window.fbq('track', 'PageView');
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} ${spaceGrotesk.variable} ${facultyGlyphic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {FACEBOOK_PIXEL_SCRIPT}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      </body>
    </html>
  );
}
