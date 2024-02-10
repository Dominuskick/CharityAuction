import React from 'react';
import styles from './checkbox.module.css';

const index = ({ children, isBlack, isWide, setValue }) => {
  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        onChange={(e) => setValue && setValue(e.target.checked)}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default index;
