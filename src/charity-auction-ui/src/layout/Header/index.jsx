import { useEffect } from 'react';
import styles from './header.module.css';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components';
import { useSelector } from 'react-redux';
import {
  ACCOUNT_ROUTE,
  FAQ_ANCHOR,
  LOGIN_ROUTE,
  LOTS_ROUTE,
  SCOPE_ANCHOR,
} from '@/utils/constants/routes';

const Header = () => {
  const location = useLocation();
  const login = useSelector((state) => state.auth.login);

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
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.searchBar}>
          <span></span>
          <input type="text" placeholder="Що шукаєте" />
        </div>
        <div className={styles.links}>
          <Link to={LOTS_ROUTE}>Лоти</Link>
          <Link to={SCOPE_ANCHOR}>Мета</Link>
          <Link to={FAQ_ANCHOR}>FAQ</Link>
        </div>
        <div className={styles.authWrapper}>
          {!login ? (
            <Link to={LOGIN_ROUTE}>
              <div className={styles.auth}>
                <span></span>
                <span>Увійти</span>
              </div>
            </Link>
          ) : (
            <Link to={ACCOUNT_ROUTE}>
              <div className={styles.account}>
                <span></span>
                <span>Особистий кабінет</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
