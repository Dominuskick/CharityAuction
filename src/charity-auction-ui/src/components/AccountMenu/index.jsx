import React from 'react';
import styles from './accountMenu.module.css';
import { NavLink } from 'react-router-dom';

const index = () => {
  return (
    <div className={styles.menu}>
      <NavLink
        to={'/account'}
        end
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        <div className={styles.menuItem}>
          <span className={styles.menuHome}></span>
          Головна
        </div>
      </NavLink>
      <NavLink
        to={'/account/lots'}
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        <div className={styles.menuItem}>
          <span className={styles.menuLots}></span>
          Мої лоти
        </div>
      </NavLink>
      <NavLink
        to={'/account/bets'}
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        <div className={styles.menuItem}>
          <span className={styles.menuBets}></span>
          Мої ставки
        </div>
      </NavLink>
      <NavLink
        to={'/account/notifications'}
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
