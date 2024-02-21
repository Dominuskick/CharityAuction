import React from 'react';
import styles from './index.module.css';
import { Oval } from 'react-loader-spinner';

const index = () => {
  return (
    <Oval
      visible={true}
      height="80"
      width="80"
      color="#131313"
      secondaryColor="#fff"
      ariaLabel="oval-loading"
    />
  );
};

export default index;
