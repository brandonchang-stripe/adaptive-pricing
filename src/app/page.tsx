import { headers } from "next/headers";
import App from "./App";
import { getCurrencies } from "./providers/stripe";

import type { Metadata, ResolvingMetadata } from "next";

type MetaProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ searchParams }: MetaProps, parent: ResolvingMetadata): Promise<Metadata> {
  const { scores } = searchParams;

  let imageUrl;
  if (scores && Array.isArray(scores)) {
    const url = new URL("https://priceadapter.com/og/score");
    scores.forEach((score) => url.searchParams.append("scores", score));
    imageUrl = url.toString();
  } else {
    imageUrl = "https://priceadapter.com/og/main";
  }

  return {
    title: "Price Adapter",
    description: "",
    openGraph: {
      type: "website",
      url: "https://priceadapter.com",
      title: "Price Adapter",
      description: "Price Adapter",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Price Adapter",
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

  return <App nonce={nonce} currencies={currencies} isPreview />;
}
