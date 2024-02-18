import React, { useEffect } from 'react';
import styles from './lotlist.module.css';
import { Header, Footer } from '@/layout';
import { AccountMenu, Button } from '@/components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ACCOUNT_CREATE_LOT_ROUTE } from '@/utils/constants/routes';

const index = () => {
  const name = useSelector((state) => state.auth.login);

  return (
    <>
      <Header />
      <main className={styles.darkMain}>
        <div className={styles.mainContent}>
          <div className="responsiveWrapper">
            <div className={styles.row}>
              <div className={styles.column}>
                <div className={styles.nameWrapper}>{name}</div>
                <AccountMenu />
              </div>
              <div className={styles.welcomeMessage}>
                <h2>
                  {name}, ми раді Вас бачити у Вашому профілі BetOnGoodness!
                </h2>
                <p>
                  Тут ви можете проглядати ваші ставки, викладати та редагувати
                  ваші лоти. Ми, в свою чергу, забезпечимо вам комфортне
                  перебування на нашій платформі
                </p>
                <Link to={ACCOUNT_CREATE_LOT_ROUTE}>
                  <Button>Створити лот</Button>
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
