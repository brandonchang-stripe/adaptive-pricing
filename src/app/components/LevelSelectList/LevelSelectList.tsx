import styles from "./LevelSelect.module.css";
import { useCountryItems } from "@/app/store";
import Frame from "../Frame/Frame";
import Button from "../Button/Button";

type props = {
  onLevelStart: () => void;
};

export default function LevelSelectList({ onLevelStart }: props) {
  const countryItems = useCountryItems();

  return (
    <Frame allowDrag label="List" position="level-select-note" type="note" index={3}>
      <div className={styles.tripListContainer}>
        <p>
          <b>Buy before trip:</b>
        </p>
        <ul className={styles.tripList}>
          {countryItems.map((item) => (
            <li className={styles.tripListItem} key={item.type}>
              <div className={styles.tripListItemName}>[ ] {item.type}</div>
              <div className={styles.tripListItemLine} />
              <div className={styles.tripListItemQuantity}>{item.quantity}</div>
            </li>
          ))}
        </ul>
        <div className="spacer"></div>
        <Button onClick={onLevelStart}>Start shopping</Button>
      </div>
    </Frame>
  );
}
