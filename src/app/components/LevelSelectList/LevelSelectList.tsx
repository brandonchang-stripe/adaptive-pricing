import styles from "./LevelSelect.module.css";
import Frame from "../Frame/Frame";
import Button from "../Button/Button";
import { useCurrentCountry } from "@/app/store";

type props = {
  onLevelStart: () => void;
};

export default function LevelSelectList({ onLevelStart }: props) {
  const country = useCurrentCountry();

  return (
    <Frame allowDrag label="List" position="level-select-note" type="note" index={3}>
      <div className={styles.tripListContainer}>
        <p>
          <b>Buy before trip:</b>
        </p>
        <ul className={styles.tripList}>
          {country.items.map((item) => (
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
