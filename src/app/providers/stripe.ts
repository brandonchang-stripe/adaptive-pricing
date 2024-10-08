import qs from "querystring";
import { countryData, subCountryData } from "../components/gameData";
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

export type Currencies = Record<string, number>;

export async function getCurrencies(localCountryCode: string) {
  const localCurrencyCode = getCountryData(localCountryCode as TCountryCode).currency[0].toLowerCase();

  const from_currencies = countryData.map((c) => c.currencyCode.toLowerCase());
  from_currencies.push(subCountryData.currencyCode.toLowerCase());
  if (from_currencies.indexOf(localCurrencyCode) === -1 && localCurrencyCode !== "usd") {
    from_currencies.push(localCurrencyCode);
  }

  const res = await fetch("https://api.stripe.com/v1/fx_quotes", {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(process.env.STRIPE_API_KEY || "").toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify({
      to_currency: "usd",
      "from_currencies[]": from_currencies,
      lock_duration: "none",
    }),
  });

  const quotes = (await res.json()) as QuoteResponse | ErrorResponse;

  if ("error" in quotes) {
    throw new Error(quotes.error.message);
  }

  const currencies: Currencies = {};

  for (const [currencyCode, rate] of Object.entries(quotes.rates)) {
    currencies[currencyCode] = rate.exchange_rate;
  }

  return { currencies, localCurrencyCode };
}
