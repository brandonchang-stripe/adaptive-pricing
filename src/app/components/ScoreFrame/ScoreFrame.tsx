import styles from "./ScoreFrame.module.css";
import { useEffect, useState } from "react";
import { useAudio } from "@/app/hooks/useAudio";
import { useAppStore } from "@/app/store";
import Frame from "../Frame/Frame";
import Button from "../Button/Button";
import ScoreMileCounter from "./ScoreMileCounter";

export default function ScoreFrame() {
  const audio = useAudio();
  const country = useAppStore((state) => state.countryIndex);
  const score = useAppStore((state) => state.score);
  const items = useAppStore((state) => state.purchasedItems);
  const transitionState = useAppStore((state) => state.transitionState);
  const totalSpend = items.reduce((acc, item) => acc + item.usdPrice, 0);
  const totalSaved = items.reduce((acc, item) => acc + item.saved, 0);
  const totalScore = score.reduce((acc, s) => acc + s, 0);
  const scoreDigits = (totalScore * 100).toString().split("");

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const play = setTimeout(() => {
      setVisible(true);
      audio("finishSmall");
    }, (items.length + 5) * 300);

    return () => clearTimeout(play);
  }, [audio, items.length]);

  function handlePlayAgain() {
    transitionState("MAIN_MENU");
  }

  function handleShare() {
    // share to twitter with a custom open graph image
    window.open(
      `https://twitter.com/intent/tweet?text=I%20just%20spent%20$${totalSpend}%20on%20my%20${country}%20trip%20and%20earned%20${totalScore}%20points!%20%23TravelBudgeter%20%23Stripe%20%23AdaptivePricing%20%23Travel%20%23${country}`,
      "_blank"
    );
  }

  return (
    visible && (
      <Frame allowDrag label="Your travel total" position="score-frame" index={0}>
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

            <div className={styles.scoreFrameScoreContainer}>
              <div>
                <b>Total points earned:</b>
              </div>
              <div className={styles.numberContainer}>
                {scoreDigits.map((digit, i) => (
                  <ScoreMileCounter key={i} index={i} digit={parseInt(digit)} />
                ))}
              </div>
            </div>
          </div>
          <div className={styles.blurb}>
            <p>Let Stripe handle currency conversion for you.</p>
            <p>
              With <b>Adaptive Pricing</b>, Stripe automatically calculates the localized price and handles all currency
              conversion so your customers can pay in their local currency worldwide.
            </p>
            <p>
              <a href="https://docs.stripe.com/payments/checkout/adaptive-pricing">Get started</a> with Adaptive Pricing
              on Checkout or Payment Links.
            </p>
            <div className="spacer"></div>
            <div className={styles.shareButton}>
              <Button onClick={handleShare}>Share to X</Button>
            </div>
            <div className={styles.nextStopButton}>
              <Button onClick={handlePlayAgain}>PLAY AGAIN</Button>
            </div>
          </div>
        </div>
      </Frame>
    )
  );
}
