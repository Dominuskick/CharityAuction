import React from 'react';
import styles from './button.module.css';
import { LoaderInline } from '..';

const index = ({ children, isBlack, isWide, onClick, disabled, loading }) => {
  return (
    <button
      className={`${styles.btn} ${isBlack && styles.btn__black} ${
        isWide && styles.btn__wide
      } ${(disabled || loading) && styles.btn__disabled}`}
      onClick={onClick}
    >
      {loading ? <LoaderInline height={30} width={50} /> : children}
    </button>
  );
};

export default index;
