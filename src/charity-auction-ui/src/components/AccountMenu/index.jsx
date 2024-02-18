import React from 'react';
import styles from './accountMenu.module.css';
import { NavLink } from 'react-router-dom';
import {
  ACCOUNT_BETS_ROUTE,
  ACCOUNT_LOTS_ROUTE,
  ACCOUNT_NOTIFICATIONS_ROUTE,
  ACCOUNT_ROUTE,
} from '@/utils/constants/routes';

const index = () => {
  return (
    <div className={styles.menu}>
      <NavLink
        to={ACCOUNT_ROUTE}
        end
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        <div className={styles.menuItem}>
          <span className={styles.menuHome}></span>
          Головна
        </div>
      </NavLink>
      <NavLink
        to={ACCOUNT_LOTS_ROUTE}
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        <div className={styles.menuItem}>
          <span className={styles.menuLots}></span>
          Мої лоти
        </div>
      </NavLink>
      <NavLink
        to={ACCOUNT_BETS_ROUTE}
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        <div className={styles.menuItem}>
          <span className={styles.menuBets}></span>
          Мої ставки
        </div>
      </NavLink>
      <NavLink
        to={ACCOUNT_NOTIFICATIONS_ROUTE}
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        <div className={styles.menuItem}>
          <span className={styles.menuNotifications}></span>
          Сповіщення
        </div>
      </NavLink>
    </div>
  );
};

export default index;
