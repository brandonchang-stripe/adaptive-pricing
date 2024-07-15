import styles from "./ScoreFrame.module.css";
import { useEffect } from "react";
import { useAudio } from "@/app/hooks/useAudio";
import { useAppStore } from "@/app/store";
import Frame from "../Frame/Frame";
import Button from "../Button/Button";

export default function ScoreFrame() {
  const country = useAppStore((state) => state.countryIndex);
  const score = useAppStore((state) => state.score);
  const items = useAppStore((state) => state.purchasedItems);
  const nextCountry = useAppStore((state) => state.nextCountry);
  const totalSpend = items.reduce((acc, item) => acc + item.usdPrice, 0);
  const totalSaved = items.reduce((acc, item) => acc + item.saved, 0);
  const scoreDigits = (score * 100).toString().split("");
  const audio = useAudio();

  useEffect(() => {
    const play = setTimeout(() => {
      audio("finishSmall");
    }, (items.length + 5) * 300);

    return () => clearTimeout(play);
  }, [audio, items.length]);

  function handleNextStop() {
    nextCountry();
  }

  return (
    <Frame allowDrag label="Your travel total" position="score-frame" index={items.length + 4}>
      <div className={styles.scoreFrame}>
        <div className={styles.scoreFrameContainer}>
          <table className={styles.scoreFrameTable}>
            <tbody>
              <tr>
                <td>from:</td>
                <td>Travel Budgeter</td>
              </tr>
              <tr>
                <td>sent:</td>
                <td>today</td>
              </tr>
              <tr>
                <td>subject:</td>
                <td>Your travel total</td>
              </tr>
            </tbody>
          </table>

          <table className={styles.scoreFrameTable}>
            <tbody>
              <tr>
                <td>Your {country} trip spend:</td>
                <td>[${totalSpend}]</td>
              </tr>
              <tr>
                <td></td> <td></td>
              </tr>
              <tr>
                <td>Total savings:</td>
                <td>[${totalSaved}]</td>
              </tr>
            </tbody>
          </table>

          <div className={styles.scoreFrameMilesContainer}>
            <div>Total miles earned:</div>
            <div className={styles.scoreFrameMilesSquares}>
              {scoreDigits.map((digit, i) => (
                <div key={i} className={styles.scoreFrameMilesSquare}>
                  <div className={styles.scoreFrameMilesDigit}>{digit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <img className={styles.scoreFrameImage} src="/sprites/plane-image.png" draggable={false} alt="" />
        <Button onClick={handleNextStop}>NEXT STOP</Button>
      </div>
    </Frame>
  );
}
