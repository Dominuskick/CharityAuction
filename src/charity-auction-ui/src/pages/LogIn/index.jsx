import React from 'react';
import styles from './login.module.css';
import { Header, Footer } from '@/layout';
import { Button, CheckBox } from '@/components';
import { Link } from 'react-router-dom';

const index = () => {
  return (
    <>
      <Header />
      <main className={styles.darkMain}>
        <div className={styles.mainContent}>
          <div className={styles.loginWrapper}>
            <div className={styles.login}>
              <h2>Для продовження увійдіть до особистого кабінету</h2>
              <hr />
              <div className={styles.inputListWrapper}>
                <div className={styles.inputWrapper}>
                  <label>Email</label>
                  <input type="email" placeholder="example@gmail.com" />
                </div>
                <div className={styles.inputWrapper}>
                  <label>Пароль</label>
                  <input type="password" placeholder="********" />
                </div>
                <div className={styles.inputWrapperLine}>
                  <CheckBox />
                  <label className={styles.text}>Запам’ятати мене</label>
                </div>
              </div>
              <div className={styles.btnWrapper}>
                <Link to={'/account'}>
                  <Button>Увійти до кабінету</Button>
                </Link>
              </div>
              <div className={styles.row}>
                <span>Ще не зареєстровані?</span>
                <Link to={'/registration'}>
                  <span className={styles.underLine}>Зареєструватись</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default index;
