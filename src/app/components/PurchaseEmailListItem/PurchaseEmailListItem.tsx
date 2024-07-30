import styles from "./PurchaseEmailListItem.module.css";
import { PurchasedItem, formatDisplayPrice, useAppStore, useUsdToCurrency } from "@/app/store";
import EmailListItem from "../EmailListItem/EmailListItem";

type Props = {
  item: PurchasedItem;
  index: number;
};

export default function PurchaseEmailListItem({ item, index }: Props) {
  const { merchant, title, usdPrice, score, saved } = item;
  const localCurrency = useAppStore((state) => state.localCurrency);
  const paid = useUsdToCurrency(usdPrice, localCurrency);
  const discount = useUsdToCurrency(saved, localCurrency);

  return (
    <EmailListItem
      subject={title}
      from={merchant}
      index={index}
      imageSrc={`/sprites/icons/${item.icon}.png`}
      openSounds={item.score > 0 ? ["close", "gainShort"] : ["close"]}
    >
      <div className={styles.prices}>
        <div className={styles.paid}>{formatDisplayPrice(paid, localCurrency)}</div>
        {score > 0 && <div className={styles.discount}>[{formatDisplayPrice(discount, localCurrency)} saved]</div>}
      </div>
    </EmailListItem>
  );
}
