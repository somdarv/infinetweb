import localFont from "next/font/local";
import "./globals.css";

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${aloevera.variable} ${erstoria.variable} ${hogira.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
