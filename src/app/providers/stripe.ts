import qs from "querystring";
import { countryData } from "../components/gameData";

type QuoteResponse = {
  id: string;
  created: number;
  lock_expires_at: number;
  lock_duration: string;
  to_currency: string;
  lock_status: string;
  rates: Record<string, ExchangeRate>;
};

type ExchangeRate = {
  exchange_rate: number;
  rate_details: {
    base_rate: number;
    fx_fee_rate: number;
  };
};

type Currencies = {
  toCurrency: string;
  rates: Record<string, number>;
};

export async function getCurrencies() {
  const res = await fetch("https://api.stripe.com/v1/fx_quotes", {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(process.env.STRIPE_API_KEY || "").toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify({
      to_currency: "usd",
      "from_currencies[]": countryData.map((c) => c.currencyCode),
      lock_duration: "none",
    }),
  });

  const quotes = (await res.json()) as QuoteResponse;

  return quotes;
}
