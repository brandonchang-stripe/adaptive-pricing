import { useAppStore, useCurrentCountry } from "@/app/store";
import style from './ItemDisplay.module.css'

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
          <div className="price">{country.currencySymbol} {item.localPrice}</div>
        </div>
      )}
    </>
  );
}
