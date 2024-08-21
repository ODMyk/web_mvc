"use client";
import Link from "next/link";
import React from "react";
import styles from "./Links.module.css";
import {usePathname} from "next/navigation";

const ROUTES = [
  {title: "Home", route: "/"},
  {title: "Places", route: "/places"},
  {title: "Tags", route: "/tags"},
];

export interface LinksIE {
  session: any;
}

export default function Links({session}: LinksIE) {
  const path = usePathname();
  return (
    <>
      {ROUTES.map(({title, route}) => (
        <Link
          className={`${styles.link} ${path === route ? styles.active : ""}`}
          href={route}
          key={title}
        >
          {title}
        </Link>
      ))}
      {session?.user?.isAdmin && (
        <Link
          className={`${styles.link} ${path === "/admin" ? styles.active : ""}`}
          href={"/admin"}
        >
          Admin
        </Link>
      )}
    </>
  );
}
