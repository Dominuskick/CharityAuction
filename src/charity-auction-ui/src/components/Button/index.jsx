import React from 'react';
import styles from './button.module.css';

const index = ({ children, isBlack, isWide, onClick, disabled }) => {
  return (
    <button
      className={`${styles.btn} ${isBlack && styles.btn__black} ${
        isWide && styles.btn__wide
      } ${disabled && styles.btn__disabled}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default index;
