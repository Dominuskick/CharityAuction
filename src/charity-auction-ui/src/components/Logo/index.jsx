import styles from './logo.module.css';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '@/utils/constants/routes';

const index = ({ isHeader }) => {
  return (
    <Link to={HOME_ROUTE}>
      <div className={styles.logoWrapper}>
        <div className={styles.logo}>
          <span>BOG</span>
        </div>
        <h1 className={isHeader && styles.headerLogoName}>BetOnGoodness</h1>
      </div>
    </Link>
  );
};

export default index;
