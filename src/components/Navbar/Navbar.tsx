"use client";
import Link from "next/link";
import React from "react";
import styles from "./Navbar.module.css";
import Logo from "@/components/Logo/Logo";
import {usePathname} from "next/navigation";

interface ISession {
  user?: {isAdmin: boolean};
}

// const session: ISession = {user: {isAdmin: true}};
const session: ISession = {};

const ROUTES = [
  {title: "Home", route: "/"},
  {title: "Places", route: "/places"},
  {title: "Tags", route: "/tags"},
];

export default function Navbar() {
  const path = usePathname();
  return (
    <nav className={styles.wrapper}>
      <Logo />
      <div className={styles.container}>
        {ROUTES.map(({title, route}) => (
          <Link
            className={`${styles.link} ${path === route ? styles.active : ""}`}
            href={route}
            key={title}
          >
            {title}
          </Link>
        ))}
        {session.user?.isAdmin && (
          <Link
            className={`${styles.link} ${
              path === "/admin" ? styles.active : ""
            }`}
            href={"/admin"}
          >
            Admin
          </Link>
        )}
      </div>
      <div className={styles.buttons}>
        {session.user ? <button>Logout</button> : <button>Sign In</button>}
      </div>
    </nav>
  );
}
