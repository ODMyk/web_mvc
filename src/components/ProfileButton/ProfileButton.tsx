'use client';
import {Session} from 'next-auth';
import React, {useCallback, useState} from 'react';

import LogoutIcon from '@/assets/icons/LogoutIcon';
import SettignsIcon from '@/assets/icons/SettignsIcon';
import {logout} from '@/lib/actions';

import styles from './ProfileButton.module.css';

export interface ProfileButtonIE {
  session?: Session;
}

export default function ProfileButton({session}: ProfileButtonIE) {
  const [isOpened, setIsopened] = useState(false);
  const toggleDropdown = useCallback(
    () => setIsopened(prev => !prev),
    [setIsopened],
  );
  const handleLogout = useCallback(() => logout(), []);
  return (
    <>
      <button className={styles.trigger} onClick={toggleDropdown}>
        Profile
      </button>
      <div className={`${styles.dropdown} ${isOpened ? styles.visible : ''}`}>
        <div className={styles.nameContainer}>
          <p>{session?.user?.name}</p>
        </div>
        <hr />
        <ul>
          <li>
            <SettignsIcon height={16} width={16} color="currentColor" />
            <div>Settings</div>
          </li>
          <li onClick={handleLogout}>
            <LogoutIcon height={16} width={16} color="currentColor" />
            <div>Logout</div>
          </li>
        </ul>
      </div>
    </>
  );
}
