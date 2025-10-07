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

const erstoria = localFont({
  src: [{
    path: './fonts/Erstoria.otf',
    weight: '600',
  },],
  variable: "--font-erstoria",
})

const hogira = localFont({
  src: [{
    path: './fonts/Hogira-Bold.otf',
    weight: '600',
  },],
  variable: "--font-hogira",
})

export const metadata = {
  title: "Infinet Wallet",
  description: "Pay Instant, Pay Cool!",
  author: "Infinet Wallet",
  keywords: "payments, instant pay, cool payments, Infinet Wallet"
};

export default function RootLayout({ children, metaImage, metaDescription }) {
  const defaultMetaDescription = "Welcome to Infinet Wallet - Pay Instant, Pay Cool!";

  return (
    <html lang="en">
      <head>
        {/* Dynamic Meta Tags */}
        <meta property="og:image" content={metaImage} />
        <meta property="og:description" content={metaDescription || defaultMetaDescription} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={metaImage} />
        <meta name="twitter:description" content={metaDescription || defaultMetaDescription} />
        
        {/* Paystack Script - FIXED: Use Next.js Script component with afterInteractive */}
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="afterInteractive"
        />
        
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
      <body className={`${aloevera.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}