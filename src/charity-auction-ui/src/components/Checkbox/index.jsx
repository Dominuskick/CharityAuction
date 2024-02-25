import React from 'react';
import styles from './checkbox.module.css';

const index = ({ children, isBlack, isWide, value, setValue }) => {
  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => setValue && setValue(e.target.checked)}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default index;
