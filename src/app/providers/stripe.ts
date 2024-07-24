import qs from "querystring";
import { countryData } from "../components/gameData";
import { type TCountryCode, getCountryData } from "countries-list";

type QuoteResponse = {
  id: string;
  created: number;
  lock_expires_at: number;
  lock_duration: string;
  to_currency: string;
  lock_status: string;
  rates: Record<string, ExchangeRate>;
};

type ErrorResponse = {
  error: {
    message: string;
  };
};

type ExchangeRate = {
  exchange_rate: number;
  rate_details: {
    base_rate: number;
    fx_fee_rate: number;
  };
};

export type Currencies = {
  toCurrency: string;
  rates: Record<string, number>;
};

export async function getCurrencies(countryCode: string): Promise<Currencies> {
  const currency = getCountryData(countryCode as TCountryCode).currency[0];

  const from_currencies = countryData.map((c) => c.currencyCode.toLowerCase());
  if (currency !== "USD") {
    from_currencies.push("usd");
  }

  const res = await fetch("https://api.stripe.com/v1/fx_quotes", {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(process.env.STRIPE_API_KEY || "").toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify({
      to_currency: currency,
      "from_currencies[]": from_currencies,
      lock_duration: "none",
    }),
  });

  const quotes = (await res.json()) as QuoteResponse | ErrorResponse;

  if ("error" in quotes) {
    throw new Error(quotes.error.message);
  }

  const currencies: Currencies = {
    toCurrency: currency.toLowerCase(),
    rates: {},
  };

  for (const [currencyCode, rate] of Object.entries(quotes.rates)) {
    currencies.rates[currencyCode] = rate.exchange_rate;
  }

  return currencies;
}
