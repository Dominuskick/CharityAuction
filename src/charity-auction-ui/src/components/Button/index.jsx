import React from 'react';
import styles from './button.module.css';

const index = ({ children, isWhite }) => {
  return (
    <button
      className={`${styles.btn} ${isWhite ? styles.btn__white : undefined}`}
    >
      {children}
    </button>
  );
};

export default index;
