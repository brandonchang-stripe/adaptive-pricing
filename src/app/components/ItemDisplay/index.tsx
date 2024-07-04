import { useAppStore, useCurrentCountry } from "@/app/store";
import style from './ItemDisplay.module.css'
import { relativeRound } from "@/app/util/math";

export function ItemDisplay() {
  const item = useAppStore((state) => state.currentItem);
  const country = useCurrentCountry();
  const isValid = item && country;

  return (
    <>
      {isValid && (
        <div>
          <div className={style.text}>
            {item.name} from {country.name}
          </div>
          <div className="price">{country.currencySymbol} {relativeRound(item.usdPrice * country.conversionRateDefault)}</div>
        </div>
      )}
    </>
  );
}
