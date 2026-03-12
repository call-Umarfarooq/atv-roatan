import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Script from "next/script";
import { Suspense } from "react";
import AdminGateModal from "@/components/AdminGateModal";

const uberMove = localFont({
  src: "../../public/font/UberMoveMedium.otf",
  variable: "--font-uber-move",
  display: "swap"
});

import ConditionalFooter from "@/components/ConditionalFooter";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  // General & SEO
  title: "Roatan Shore Excursions & Honduras Tours | ATV Roatan",
  description: "ATV Roatan offers the best Roatan shore excursions and Honduras tours. Book a local tour guide for buggy, adventures & cruise excursions luxury experience.",
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


  metadataBase: new URL('https://atvroatan.com'),

  // Favicon
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
  },

  // Open Graph (for Facebook, Discord, etc.)
  openGraph: {
    type: 'website',
    url: '/',
    title: "Roatan Shore Excursions & Honduras Tours | ATV Roatan",
    description: 'ATV Roatan offers the best Roatan shore excursions and Honduras tours. Book a local tour guide for buggy, adventures & cruise excursions luxury experience.',
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
    title: "Roatan Shore Excursions & Honduras Tours | ATV Roatan",
    description: 'ATV Roatan offers the best Roatan shore excursions and Honduras tours. Book a local tour guide for buggy, adventures & cruise excursions luxury experience.',
    images: ['/assets/Banner.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Header />
        {children}
        <Suspense fallback={null}>
          <AdminGateModal />
        </Suspense>
        <ConditionalFooter />
        {/* <WhatsAppButton /> */}
        <script src="//code.tidio.co/bxpgyt5mdoulzj9kjkgbdghxc8vhntwm.js" async></script>
      </body>
    </html>
  );
}

