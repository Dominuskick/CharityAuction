import React from 'react';
import styles from './checkbox.module.css';

const index = ({ children, isBlack, isWide }) => {
  return (
    <label className={styles.container}>
      <input type="checkbox" />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default index;
