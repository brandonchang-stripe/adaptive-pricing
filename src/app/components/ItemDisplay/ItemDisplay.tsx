import styles from "./ItemDisplay.module.css" 
import { ActiveItem, useAppStore, useCurrentCountry } from "@/app/store";
import Frame from "../Frame/Frame";
import Button from "../Button/Button";
import { relativeRound } from "@/app/util/math";

type ItemDisplayFrameProps = {
  item: ActiveItem;
  index: number;
};

export default function ItemDisplayFrame({ item, index }: ItemDisplayFrameProps) {
  const currentCountry = useCurrentCountry()!;
  const evaluate = useAppStore((state) => state.evaluate);

  return (
    <Frame allowDrag key={item.type} label={item.merchant} position={`item-${index}`} index={index}>
      <div className={styles.itemDisplay}>
        <div className={styles.itemDisplayContainer}>
          <div className={styles.itemDisplayImage} />
          <div className={styles.itemDisplayData}>
            <div>{item.type}</div>
            <div className={styles.itemDisplayPrice}>
              {item.converted
                ? `$${item.usdPrice.toFixed(2)}`
                : `${currentCountry!.currencySymbol} ${relativeRound(
                    item.usdPrice * currentCountry.conversionRateDefault
                  )}`}
            </div>
          </div>
        </div>
        <Button onClick={() => evaluate(item.merchant)}>Buy</Button>
      </div>
    </Frame>
  );
}