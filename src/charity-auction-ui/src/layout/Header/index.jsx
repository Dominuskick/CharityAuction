import React from 'react';
import styles from './header.module.css';
import { Link } from 'react-router-dom';

const index = () => {
  return (
    <header className={styles.header}>
      <Link to={'/'}>
        <div className={styles.logoWrapper}>
          <div className={styles.logo}>
            <span>BOG</span>
          </div>
          <h1>BetOnGoodness</h1>
        </div>
      </Link>
      <div className={styles.searchBar}>
        <span></span>
        <input type="text" placeholder="Що шукаєте" />
      </div>
      <div className={styles.links}>
        <Link to={'/lots'}>Лоти</Link>
        <a>Мета</a>
        <a>FAQ</a>
      </div>
      <div className={styles.auth}>
        <span></span>
        <span>Увійти</span>
      </div>
    </header>
  );
};

export default index;
