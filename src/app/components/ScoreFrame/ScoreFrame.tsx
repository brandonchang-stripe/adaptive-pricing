import styles from "./ScoreFrame.module.css";
import { useEffect, useState } from "react";
import { useAudio } from "@/app/hooks/useAudio";
import { formatDisplayPrice, useAppStore, useUsdToCurrency } from "@/app/store";
import Frame from "../Frame/Frame";
import Button from "../Button/Button";
import ScoreMileCounter from "./ScoreMileCounter";

export default function ScoreFrame() {
  const audio = useAudio();
  const scores = useAppStore((state) => state.score);
  const items = useAppStore((state) => state.purchasedItems);
  const transitionState = useAppStore((state) => state.transitionState);

  const localCurrency = useAppStore((state) => state.localCurrency);
  const totalSpendUSD = items.reduce((acc, item) => acc + item.usdPrice, 0);
  const totalSpend = formatDisplayPrice(useUsdToCurrency(totalSpendUSD, localCurrency), localCurrency);
  const totalSavedUSD = items.reduce((acc, item) => acc + item.saved, 0);
  const totalSaved = formatDisplayPrice(useUsdToCurrency(totalSavedUSD, localCurrency), localCurrency);
  const totalScore = scores.reduce((acc, s) => acc + s, 0) * 100;
  const scoreDigits = totalScore.toString().split("");

  const [visible, setVisible] = useState(false);
  const shareLink = handleShare();

  useEffect(() => {
    const vis = setTimeout(() => {
      setVisible(true);
    }, (items.length + 5) * 300);

    const score = setTimeout(() => {
      audio("score");
    }, (items.length + 5) * 300 + 600);

    return () => {
      clearTimeout(vis);
      clearTimeout(score);
    };
  }, [audio, items.length]);

  function handlePlayAgain() {
    transitionState("MAIN_MENU");
  }

  function handleShare() {
    const url = new URL("https://www.priceadapter.com");
    const encoded = btoa(JSON.stringify(scores));
    url.searchParams.append("scores", encoded);
    const message = `I scored ${totalScore} points planning my trip playing ${url.toString()}, Stripe's Adaptive Pricing game.`;
    // share to twitter with a custom open graph image
    return `https://twitter.com/intent/tweet?text=${encodeURI(message)}`
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
                  <td>Price Adapter</td>
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
                  <td>Your trip spend:</td>
                  <td>{totalSpend}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Total savings:</td>
                  <td>[{totalSaved}]</td>
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
              With <b>Adaptive Pricing</b>, Stripe automatically converts prices into your buyer&apos;s local currency, increasing
              revenue by an average of 17.8%.
            </p>
            <p>
              <a
                href="https://docs.stripe.com/payments/checkout/adaptive-pricing?utm_source=d819&utm_campaign=GLOBAL_40d1&utm_content=8afb&utm_term=762d2b62986b#enable-adaptive-pricing"
                target="_blank"
              >
                Get started
              </a>{" "}
              with Adaptive Pricing on Checkout or Payment Links.
            </p>
            <div className="spacer"></div>
            <div className={styles.shareButton}>
              <Button href={shareLink} as="a">Share</Button>
            </div>
            <div className={styles.nextStopButton}>
              <Button onClick={handlePlayAgain}>Play again</Button>
            </div>
          </div>
        </div>
      </Frame>
    )
  );
}
