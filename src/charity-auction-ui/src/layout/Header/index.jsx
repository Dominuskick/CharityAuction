import React, { useEffect } from 'react';
import styles from './header.module.css';
import { Link, useLocation } from 'react-router-dom';
import { Logo, ResponsiveWrapper } from '@/components';

const index = () => {
  const location = useLocation();

  useEffect(() => {
    const { hash } = location;

    if (hash) {
      const element = document.querySelector(hash);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

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
            <Link to={'/#scope'}>Мета</Link>
            <Link to={'/#faq'}>FAQ</Link>
          </div>
          <div className={styles.authWrapper}>
            <Link to={'/login'}>
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
