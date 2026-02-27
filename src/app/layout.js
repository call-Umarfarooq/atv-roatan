import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Script from "next/script";

const uberMove = localFont({
  src: "../../public/font/UberMoveMedium.otf",
  variable: "--font-uber-move",
  display: "swap"
});

import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  // General & SEO
  title: "ATV Roatan – Jungle Buggy & Island Tours in Honduras",
  description: "Roatan shore excursions, ATV buggy tours, family friendly Roatan tours",
  applicationName: "ATV Roatan",
  keywords: [
"adventure tours",
"roatan adventure tours",
"adventure touring motorcycle",
"tours honduras",
"honduras tours",
"tours en roatan honduras",
"roatan honduras tours",
"tours en honduras",
"honduras tour guide",
"roatan excursions and tours",
"roatan excursions west bay tours",
"roatan excursions & tours",
"roatan tours excursions"
  ],
  generator: "Next.js",
  creator: "Roatan ATV Buggy and Golf Cart Adventure Tours",
  authors: [{ name: "Roatan ATV Buggy and Golf Cart Adventure Tours", url: "" }],

  // Indexing & Canonical URL
  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "/",
  },

  metadataBase: new URL('https://roatanatvbuggytours.com'),

  // Favicon
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },

  // Open Graph (for Facebook, Discord, etc.)
  openGraph: {
    type: 'website',
    url: '/',
    title: "ATV Roatan – Jungle Buggy & Island Tours in Honduras",
    description: 'Roatan shore excursions, ATV buggy tours, family friendly Roatan tours',
    siteName: 'ATV Roatan',
    images: [
      {
        url: '/assets/Banner.png',
      },
    ],
  },

  // Twitter Card (for X/Twitter)
  twitter: {
    card: 'summary_large_image',
    site: '@ATVRoatan',
    title: "ATV Roatan – Jungle Buggy & Island Tours in Honduras",
    description: 'Roatan shore excursions, ATV buggy tours, family friendly Roatan tours',
    images: ['/assets/Banner.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${uberMove.variable} font-sans antialiased`}
      >
        <Header />
        {children}
        
        <Footer />
        {/* <WhatsAppButton /> */}
        <script src="//code.tidio.co/bxpgyt5mdoulzj9kjkgbdghxc8vhntwm.js" async></script>
      </body>
    </html>
  );
}

