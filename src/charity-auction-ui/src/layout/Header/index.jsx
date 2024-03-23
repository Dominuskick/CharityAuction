import { useState, useEffect } from 'react';
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
  const [isInputInFocus, setIsInputInFocus] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Logo isHeader className={styles.logo} />
          <div
            className={`${styles.searchBar} ${
              isInputInFocus && styles.isFocus
            }`}
          >
            <span></span>
            <input
              type="text"
              placeholder="Що шукаєте"
              onFocus={() => setIsInputInFocus(true)}
              onBlur={() => setIsInputInFocus(false)}
            />
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
                  <span className={styles.accountText}>Особистий кабінет</span>
                  <span className={styles.accountTextMobile}>Кабінет</span>
                </div>
              </Link>
            )}
          </div>
          <div
            className={styles.burgerMenuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div
              className={`${styles.burgerMenuIcon} ${
                isMenuOpen ? styles.active : ''
              }`}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </header>
      <div
        className={`${styles.burgerMenu} ${isMenuOpen ? styles.active : ''}`}
      >
        <div className={styles.burgerMenuContent}>
          <div className={styles.burgerLinks}>
            <Link to={LOTS_ROUTE}>
              <div
                className={styles.burgerLink}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                Лоти
              </div>
            </Link>
            <Link to={SCOPE_ANCHOR}>
              <div
                className={styles.burgerLink}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                Мета
              </div>
            </Link>
            <Link to={FAQ_ANCHOR}>
              <div
                className={styles.burgerLink}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                FAQ
              </div>
            </Link>
          </div>
          <div
            className={`${styles.searchBar} ${styles.searchBarBurger} ${
              isInputInFocus && styles.isFocus
            }`}
          >
            <span></span>
            <input
              type="text"
              placeholder="Пошук"
              onFocus={() => setIsInputInFocus(true)}
              onBlur={() => setIsInputInFocus(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
