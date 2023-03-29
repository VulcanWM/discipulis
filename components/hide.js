import styles from "./hide.module.css";

function Hide({ content, isVisible, failed }) {
  return (
    <div
      className={[
        styles.card,
        isVisible ? styles.shown : "",
        failed ? styles.failed : styles.passed,
      ].join(" ")}
    >
      <div className={styles.cardFront}>Click to reveal</div>
      <div className={styles.cardBack}>{content}</div>
    </div>
  );
}

export default Hide;
