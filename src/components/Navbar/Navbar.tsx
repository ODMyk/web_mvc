import Link from "next/link";
import React from "react";
import styles from "./Navbar.module.css";
import Logo from "@/components/Logo/Logo";
import {auth} from "@/lib/auth";
import Links from "../Links/Links";
import {logout} from "@/lib/actions";

export default async function Navbar() {
  const session = await auth();
  console.log(session);
  return (
    <nav className={styles.wrapper}>
      <Logo />
      <div className={styles.container}>
        <Links session={session} />
      </div>
      <div className={styles.buttons}>
        {session?.user ? (
          <form action={logout}>
            <button>Logout</button>
          </form>
        ) : (
          <Link href="/login">
            <button>Sign In</button>
          </Link>
        )}
      </div>
    </nav>
  );
}
