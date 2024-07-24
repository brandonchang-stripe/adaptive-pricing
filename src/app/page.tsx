import { headers } from "next/headers";
import App from "./App";

export default async function PageLayout() {
  const nonce = headers().get("x-nonce")!;
  // const country = headers().get("X-Vercel-IP-Country") || "US";

  return <App nonce={nonce} />;
}
