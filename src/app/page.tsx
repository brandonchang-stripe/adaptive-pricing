import { headers } from "next/headers";
import App from "./App";
import { getCurrencies } from "./providers/stripe";

export default async function PageLayout() {
  const nonce = headers().get("x-nonce")!;
  const country = headers().get("X-Vercel-IP-Country") || "US";
  const currencies = await getCurrencies(country);
  console.log(currencies);

  return <App nonce={nonce} />;
}
