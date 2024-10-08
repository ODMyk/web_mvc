import React from "react";

import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getUTCFullYear();
  return (
    <div className={styles.wrapper}>Copyright Dmytro Ostapenko {year}</div>
  );
}
