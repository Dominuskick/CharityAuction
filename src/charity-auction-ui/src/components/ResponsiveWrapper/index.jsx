import React from 'react';
import styles from './responsiveWrapper.module.css';

const index = ({ children }) => {
  return <div className={styles.responsiveWrapper}>{children}</div>;
};

export default index;
