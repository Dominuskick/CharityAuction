import React from 'react';
import styles from './button.module.css';

const index = ({ children, isBlack, isWide, onClick }) => {
  return (
    <button
      className={`${styles.btn} ${isBlack ? styles.btn__black : undefined} ${
        isWide ? styles.btn__wide : undefined
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default index;
