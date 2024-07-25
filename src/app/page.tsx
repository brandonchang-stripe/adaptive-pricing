import { headers } from "next/headers";
import App from "./App";
import { getCurrencies } from "./providers/stripe";

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
