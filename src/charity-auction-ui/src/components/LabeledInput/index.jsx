import React from 'react';
import styles from './labeledInput.module.css';

const index = ({ label, type, placeholder, setState }) => {
  return (
    <div className={styles.inputWrapper}>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default index;
