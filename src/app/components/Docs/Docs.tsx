import styles from "./Docs.module.css";

export default function Docs() {
  return (
    <a className={styles.link} href="https://docs.stripe.com/payments/checkout/adaptive-pricing?utm_source=d819&utm_campaign=GLOBAL_40d1&utm_content=8afb&utm_term=762d2b62986b#enable-adaptive-pricing" target="_blank">
      <img className={styles.image} src="/sprites/docs.png" alt="Read the docs" />
    </a>
  );
}