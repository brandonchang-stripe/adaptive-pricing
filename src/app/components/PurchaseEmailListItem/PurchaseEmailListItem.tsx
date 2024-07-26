import styles from "./PurchaseEmailListItem.module.css";
import { PurchasedItem, useConvertedPrice } from "@/app/store";
import EmailListItem from "../EmailListItem/EmailListItem";

type Props = {
  item: PurchasedItem;
  index: number;
};

export default function PurchaseEmailListItem({ item, index }: Props) {
  const { merchant, title, usdPrice, score, saved } = item;
  const paid = useConvertedPrice(usdPrice, true);
  const discount = useConvertedPrice(saved, true);

  return (
    <EmailListItem
      subject={title}
      from={merchant}
      index={index}
      imageSrc={`/sprites/icons/${item.icon}.png`}
      openSounds={item.score > 0 ? ["close", "gainShort"] : ["close"]}
    >
      <div className={styles.prices}>
        <div className={styles.paid}>{paid}</div>
        {score > 0 && <div className={styles.discount}>[{discount} saved]</div>}
      </div>
    </EmailListItem>
  );
}
