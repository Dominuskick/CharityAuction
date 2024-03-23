import styles from './accountMenu.module.css';
import { NavLink } from 'react-router-dom';
import {
  ACCOUNT_BETS_ROUTE,
  ACCOUNT_LOTS_ROUTE,
  ACCOUNT_NOTIFICATIONS_ROUTE,
  ACCOUNT_ROUTE,
} from '@/utils/constants/routes';
import { logout } from '@/http/userAPI';
import { useDispatch } from 'react-redux';
import { setLogin } from '@/slices/authSlice';

const index = () => {
  const dispatch = useDispatch();

  const logOutHandle = () => {
    try {
      logout();
      dispatch(setLogin(null));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <nav className={styles.menu}>
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
      <div className={styles.menuItem} onClick={logOutHandle}>
        <span className={styles.menuLogout}></span>
        <div className={styles.logoutText}>Вийти з кабінету</div>
        <div className={styles.logoutTextSmallerScreen}>Вихід</div>
      </div>
    </nav>
  );
};

export default index;
