import styles from "./PurchaseEmailListItem.module.css";
import { PurchasedItem } from "@/app/v5/store";
import EmailListItem from "../EmailListItem/EmailListItem";

type Props = {
  item: PurchasedItem;
  index: number;
};

export default function PurchaseEmailListItem({ item, index }: Props) {
  const { merchant, title, usdPrice, score } = item;

  return (
    <EmailListItem
      subject={title}
      from={merchant}
      index={index}
      imageSrc=""
      openSounds={item.score > 0 ? ["open", "auto"] : ["open"]}
    >
      <div className={styles.prices}>
        <div className={styles.paid}>${usdPrice.toFixed(2)}</div>
        {score > 0 && (
          <div className={styles.discount}>[${usdPrice.toFixed(2)} saved]</div>
        )}
      </div>
    </EmailListItem>
  );
}
