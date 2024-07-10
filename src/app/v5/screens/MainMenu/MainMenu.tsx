import styles from "./MainMenu.module.css";

import Button from "@/app/components/Button/Button";
import Frame from "@/app/components/Frame/Frame";
import { useAppStore, useCountryItems } from "../../store";
import TravelMap from "@/app/components/TravelMap/TravelMap";

export default function MainMenu() {
  const setState = useAppStore((state) => state.setState);
  const countryItems = useCountryItems();

  function handleStart() {
    setState("IN_GAME");
  }

  return (
    <>
      <TravelMap key="travel-map" />
      <Frame
        allowDrag
        label="Notes"
        position="starting-notes"
        type="note"
        index={2}
      >
        <>
          <p><b>NOTES TO SELF!</b></p>
          <p>
            Its finally time for my trip around the world, but before I go I
            need to buy everything I need for the trip.
          </p>
          <p>PS: Dont leave everything for the last minute again</p>
        </>
      </Frame>

      <Frame
        allowDrag
        label="List"
        position="level-select-note"
        type="note"
        index={3}
      >
        <div className={styles.tripListContainer}>
          <p><b>Buy before trip:</b></p>
          <ul className={styles.tripList}>
            {countryItems.map((item) => (
              <li className={styles.tripListItem} key={item.type}>
                <div className={styles.tripListItemName}>[ ] {item.type}</div>
                <div className={styles.tripListItemLine} />
                <div className={styles.tripListItemQuantity}>
                  {item.quantity}
                </div>
              </li>
            ))}
          </ul>
          <div className="spacer"></div>
          <Button onClick={handleStart}>Start shopping</Button>
        </div>
      </Frame>
    </>
  );
}
