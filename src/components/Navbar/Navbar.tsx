import Link from 'next/link';
import React, {useState} from 'react';

import Links from '@/components/Links/Links';
import Logo from '@/components/Logo/Logo';
import ProfileButton from '@/components/ProfileButton/ProfileButton';
import {auth} from '@/lib/auth';

import styles from './Navbar.module.css';

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className={styles.wrapper}>
      <Logo />
      <div className={styles.container}>
        <Links session={session} />
      </div>
      <div className={styles.buttonWrapper}>
        {session ? (
          <ProfileButton session={session} />
        ) : (
          <Link href="/login" className={styles.full}>
            <button>Sign In</button>
          </Link>
        )}
      </div>
    </nav>
  );
}
