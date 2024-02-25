import React from 'react';
import styles from './index.module.css';
import { Oval, ThreeDots } from 'react-loader-spinner';

const index = ({ size = '80', color = '#131313', height, width }) => {
  return (
    <ThreeDots
      visible={true}
      height={height || size}
      width={width || size}
      color={color}
      radius="9"
      ariaLabel="three-dots-loading"
    />
  );
};

export default index;
