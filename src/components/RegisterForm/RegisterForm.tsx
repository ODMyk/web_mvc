"use client";
import React, {
  startTransition,
  useActionState,
  useCallback,
  useState,
} from "react";
import {register} from "@/lib/actions";
import styles from "./RegisterForm.module.css";
import Link from "next/link";

export default function RegisterForm() {
  const [formState, formAction, pending] = useActionState(register, null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const onSubmit: React.FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      startTransition(() => formAction(formData));
      setPassword("");
      setPasswordConfirm("");
    },
    [formAction],
  );

  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit}>
        <div className={styles.container}>
          <div className={styles.form}>
            <h3>Create an account</h3>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="usename">
                Username
              </label>
              <input
                className={styles.input}
                name="username"
                type="text"
                placeholder="Mystic Traveller"
                autoComplete="off"
                value={username}
                onChange={({target}) => setUsername(target.value)}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <input
                className={styles.input}
                name="email"
                type="text"
                placeholder="your.mail@example.com"
                autoComplete="off"
                value={email}
                onChange={({target}) => setEmail(target.value)}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <input
                className={styles.input}
                name="password"
                type="password"
                placeholder="Describe Schema"
                value={password}
                onChange={({target}) => setPassword(target.value)}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="passwordConfirm">
                Confirm Password
              </label>
              <input
                className={styles.input}
                name="passwordConfirm"
                type="password"
                placeholder="Repeat your password"
                value={passwordConfirm}
                onChange={({target}) => setPasswordConfirm(target.value)}
              />
            </div>
          </div>
          <div className={styles.tips}>
            <h3>Information</h3>
            <ul>
              <li className={formState?.username && styles.error}>
                3-30 symbols. Any english letter, digits and space
              </li>
              <li className={formState?.email && styles.error}>
                Valid email, that will be used for login
              </li>
              <li className={formState?.password && styles.error}>
                3-30 symbols, at least 1 character and 1 digit
              </li>
              <li className={formState?.passwordConfirm && styles.error}>
                Passwords should match
              </li>
            </ul>
          </div>
        </div>
        <button aria-disabled={pending} disabled={pending} type="submit">
          Sign Up
        </button>
      </form>
      <button className={styles.link}>Continue with Google</button>
      <Link className={styles.link} href={"/login"}>
        I already have an account
      </Link>
    </div>
  );
}
