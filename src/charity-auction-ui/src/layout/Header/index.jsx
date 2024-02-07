import React from 'react';
import styles from './header.module.css';
import { Link } from 'react-router-dom';

const index = () => {
  return (
    <header className={styles.header}>
      <Link to={'/'}>
        <h1>Main page</h1>
      </Link>
      <Link to={'/about'}>
        <h2>About</h2>
      </Link>
    </header>
  );
};

export default index;
