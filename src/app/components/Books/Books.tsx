import styles from "./Books.module.css"

export default function Books() {
  return (
    <a className={`${styles.books} plausible-event-name=Press`} href="https://press.stripe.com" target="_blank"></a>
  )
}