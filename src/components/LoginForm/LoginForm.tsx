'use client';
import React, {
  startTransition,
  useActionState,
  useCallback,
  useState,
} from 'react';
import {login, loginGoogle} from '@/lib/actions';
import styles from './LoginForm.module.css';
import Link from 'next/link';

export default function LoginForm() {
  const [formState, formAction, pending] = useActionState(login, null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit: React.FormEventHandler = useCallback(
    e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      startTransition(() => formAction(formData));
      setPassword('');
    },
    [formAction],
  );

  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit}>
        <h3>Sign In</h3>
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
        {formState?.error && (
          <span className={styles.error}>{formState.error.message}</span>
        )}
        <button aria-disabled={pending} disabled={pending} type="submit">
          Sign In
        </button>
      </form>
      <form action={loginGoogle}>
        <button type="submit" className={styles.link}>
          Continue with Google
        </button>
      </form>
      <Link className={styles.link} href={'/register'}>
        {"I don't have an account"}
      </Link>
    </div>
  );
}
