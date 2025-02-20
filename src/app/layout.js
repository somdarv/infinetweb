import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

const aloevera = localFont({
  src: [
    {
      path: './fonts/aloevera/AloeveraDisplay-Thin.ttf',
      weight: '100',
    },
    {
      path: './fonts/aloevera/AloeveraDisplay-ExtraLight.ttf',
      weight: '200',
    },
    {
      path: './fonts/aloevera/AloeveraDisplay-Light.ttf',
      weight: '300',
    },
    {
      path: './fonts/aloevera/AloeveraDisplay-Regular.ttf',
      weight: '400',
    },
    {
      path: './fonts/aloevera/AloeveraDisplay-Medium.ttf',
      weight: '500',
    },
    {
      path: './fonts/aloevera/AloeveraDisplay-SemiBold.ttf',
      weight: '600',
    },
    {
      path: './fonts/aloevera/AloeveraDisplay-Bold.ttf',
      weight: '700',
    },
    {
      path: './fonts/aloevera/AloeveraDisplay-ExtraBold.ttf',
      weight: '800',
    },
    {
      path: './fonts/aloevera/AloeveraDisplay-Black.ttf',
      weight: '900',
    },
  ],
  variable: "--font-aloevera",
});



export const metadata = {
  title: "Infinet Wallet",
  description: "Pay Instant, Pay Cool!",
  author: "Infinet Wallet",
  keywords: "payments, instant pay, cool payments, Infinet Wallet"
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <head>
           {/* Google Tag Manager */}
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=G-K2FNJLME4Y`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-K2FNJLME4Y', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
        </head>
        <body
          className={`${aloevera.variable} antialiased`}
        >
            {children}
        </body>
      </html>
  );
}
