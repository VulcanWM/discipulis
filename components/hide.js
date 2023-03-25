import { useState } from "react";
import styles from "./hide.module.css";

function Hide({ content, isVisible }) {
  return (
    <div className={[styles.card, isVisible ? styles.shown : ""].join(" ")}>
      <div className={styles.cardFront}>Click to reveal</div>
      <div className={styles.cardBack}>{content}</div>
    </div>
  );
}

export default Hide;
