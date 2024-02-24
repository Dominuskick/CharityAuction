import React from 'react';
import styles from './error.module.css';
import { Footer, Header } from '@/layout';
import { Button, ResponsiveWrapper } from '@/components';
import errorImg from '../../assets/img/error.png';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '@/utils/constants/routes';

const index = () => {
  return (
    <>
      <Header />
      <main className={styles.darkMain}>
        <div className={styles.mainContent}>
          <ResponsiveWrapper>
            <h2 className={styles.header}>ВИНИКЛА ПОМИЛКА</h2>
            <img className={styles.img} src={errorImg} alt="Помилка 404" />
            <p className={styles.message}>
              Сторінка, яку ви намагалися знайти, була видалена, перенесена або
              посилання було введене неправильно. Перейдіть на головну сторінку
              і спройбуте знайти інформацю там
            </p>
            <Link to={HOME_ROUTE}>
              <Button isBlack={true}>Повернутись на головну</Button>
            </Link>
          </ResponsiveWrapper>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default index;
