import React from "react";
import styles from "./TopBar.module.css";

export function TopBar({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles.topBar}>
      <span>
        <b>LIMITED OFFER</b> &nbsp;Sign up and receive 20% bonus discount on checkout.
      </span>
      <button className={styles.closeButton} onClick={onClose} aria-label="Close">&times;</button>
    </div>
  );
}
