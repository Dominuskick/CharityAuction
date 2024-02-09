import React from 'react';
import styles from './header.module.css';
import { Link } from 'react-router-dom';
import { Logo, ResponsiveWrapper } from '@/components';

const index = () => {
  return (
    <header className={styles.header}>
      <ResponsiveWrapper>
        <div className={styles.row}>
          <Logo />
          <div className={styles.searchBar}>
            <span></span>
            <input type="text" placeholder="Що шукаєте" />
          </div>
          <div className={styles.links}>
            <Link to={'/lots'}>Лоти</Link>
            <a href="#scope">Мета</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className={styles.authWrapper}>
            <Link to={'/registration'}>
              <div className={styles.auth}>
                <span></span>
                <span>Увійти</span>
              </div>
            </Link>
          </div>
        </div>
      </ResponsiveWrapper>
    </header>
  );
};

export default index;
