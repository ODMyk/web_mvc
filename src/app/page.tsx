import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css";

interface ISession {
  user?: {isAdmin: boolean};
}

// const session: ISession = {user: {isAdmin: true}};
const session: ISession = {};

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.hero}>
        <article>
          <p className={styles.header}>Know</p>
          <p className={styles.header}>Cool</p>
          <p className={styles.header}>Places ?</p>
          <p className={styles.desc}>
            Share them! With our website it is so easy to explore new and share
            your favorite spots
          </p>
        </article>
        <div>
          <Image src="/spot.jpg" alt="Beautiful spot" fill />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        {session.user ? (
          <Link href={"/places"}>Explore places</Link>
        ) : (
          <Link href="register">Create an account</Link>
        )}
      </div>
    </main>
  );
}
