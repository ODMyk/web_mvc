import Image from "next/image";
import Link from "next/link";
import React from "react";

import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={styles.wrapper}>
      <Link href={"/"}>
        <Image src={"favicon.svg"} alt="Logo" width="50" height="50" />
      </Link>
    </div>
  );
}
