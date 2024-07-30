import { headers } from "next/headers";
import App from "./App";
import { getCurrencies } from "./providers/stripe";

import type { Metadata, ResolvingMetadata } from "next";

type MetaProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ searchParams }: MetaProps): Promise<Metadata> {
  const { scores } = searchParams;

  return {
    title: "Price Adapter",
    description: "Play Stripe's Price Adapter game.",
    icons: [{ url: "/favicon.png" }],
    openGraph: {
      type: "website",
      url: "https://priceadapter.com",
      title: "Price Adapter",
      description: "Play Stripe's Price Adapter game.",
      images: [
        {
          url: scores ? `https://priceadapter.com/og/score/${scores}` : "/share-image.png",
          width: 1200,
          height: 630,
          alt: "A fictional pixel art passport with a stamps from Brazil, Japan, New Zealand, and Mexico. Each stamp shows a score. In the bottom left a logo reads Price Adapter",
        },
      ],
    },
  };
}

export default async function PageLayout() {
  const nonce = headers().get("x-nonce")!;
  const country = headers().get("X-Vercel-IP-Country") || "US";
  let currencies = null;
  try {
    currencies = await getCurrencies(country);
  } catch (e) {
    console.error(e);
  }

  return <App nonce={nonce} currencies={currencies} />;
}
