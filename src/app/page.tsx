import { headers } from "next/headers";
import App from "./App";

export default function PageLayout() {
  const nonce = headers().get("x-nonce")!;

  return <App nonce={nonce} />;
}
