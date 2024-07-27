import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Price Adapter",
  description: "",
  openGraph: {
    type: "website",
    url: "https://priceadapter.com",
    title: "Price Adapter",
    description: "",
    images: [
      {
        url: "/og/image?scores=1000&500",
        width: 1200,
        height: 630,
        alt: "Price Adapter",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={dogica.className} lang="en">
      <body>{children}</body>
    </html>
  );
}
