import React from 'react';
import styles from './logo.module.css';
import { Link } from 'react-router-dom';

const index = ({ children, isWhite }) => {
  return (
    <Link to={'/'}>
      <div className={styles.logoWrapper}>
        <div className={styles.logo}>
          <span>BOG</span>
        </div>
        <h1>BetOnGoodness</h1>
      </div>
    </Link>
  );
};

export default index;
