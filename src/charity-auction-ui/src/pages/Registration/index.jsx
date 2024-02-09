import React from 'react';
import styles from './registration.module.css';
import { Header, Footer } from '@/layout';
import { Button, CheckBox } from '@/components';
import { Link } from 'react-router-dom';

const index = () => {
  return (
    <>
      <Header />
      <main className={styles.darkMain}>
        <div className={styles.mainContent}>
          <div className={styles.registrationWrapper}>
            <div className={styles.registration}>
              <h2>Реєстрація</h2>
              <hr />
              <div className={styles.inputListWrapper}>
                <div className={styles.inputWrapper}>
                  <label>Ім’я</label>
                  <input type="text" placeholder="Петро" />
                </div>
                <div className={styles.inputWrapper}>
                  <label>Прізвище</label>
                  <input type="text" placeholder="Петренко" />
                </div>
                <div className={styles.inputWrapper}>
                  <label>Email</label>
                  <input type="email" placeholder="petro@gmail.com" />
                </div>
                <div className={styles.inputWrapper}>
                  <label>Номер телефону</label>
                  <input type="tel" placeholder="+380 680 000 000" />
                </div>
                <div className={styles.inputWrapperLine}>
                  <CheckBox />
                  <label className={styles.text}>
                    Підтверджую, що мені є 18 років
                  </label>
                </div>
                <div className={styles.inputWrapper}>
                  <label>Логін</label>
                  <input type="text" placeholder="Ananas87" />
                </div>
                <div className={styles.inputWrapper}>
                  <label>Пароль</label>
                  <input type="password" placeholder="********" />
                </div>
                <div className={styles.inputWrapper}>
                  <label>Повторити пароль</label>
                  <input type="tel" placeholder="********" />
                </div>
                <div className={styles.inputWrapperLine}>
                  <CheckBox />
                  <label className={styles.text}>
                    Я приймаю умови{' '}
                    <a className={styles.underLine}>
                      політики конфіденційності
                    </a>{' '}
                    та{' '}
                    <a className={styles.underLine}>
                      обробки персональних даних
                    </a>
                  </label>
                </div>
              </div>
              <Button>Зареєструватись</Button>
              <div className={styles.row}>
                <span>Вже маєте акаунт?</span>
                <Link to={'/login'}>
                  <span className={styles.underLine}>Увійти</span>
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
