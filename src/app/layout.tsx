import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

const dogica = localFont({
  src: [
    {
      path: "../../public/fonts/dogica/dogicapixel.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/dogica/dogicapixel.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/dogica/dogicapixelbold.woff2",
      weight: "800",
      style: "bold",
    },
    {
      path: "../../public/fonts/dogica/dogicapixelbold.ttf",
      weight: "800",
      style: "bold",
    },
    {
      path: "../../public/fonts/dogica/dogicapixelbold.otf",
      weight: "800",
      style: "bold",
    },
  ],
  display: "block",
  variable: "--font-dogica",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={dogica.className} lang="en">
      <Script data-domain="priceadapter.com" src="https://plausible.io/js/script.js" />
      <body>{children}</body>
    </html>
  );
}
