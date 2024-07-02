import { useAppStore, useCurrentCountry } from "@/app/store";

export function Conversion() {
  const country = useCurrentCountry();
  return (
    <>
      {country && (
        <div className="price">
          {country.currencySymbol} {country.conversionRateDefault} = $USD 1.00
        </div>
      )}
    </>
  );
}
