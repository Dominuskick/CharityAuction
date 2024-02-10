import React from 'react';
import styles from './lotlist.module.css';
import { Header, Footer } from '@/layout';
import { AccountMenu, Button, CheckBox, LotCard } from '@/components';
import { Link } from 'react-router-dom';
import catImg from '../../assets/img/catHome.png';
import bookImg from '../../assets/img/bookHome.png';
import candleImg from '../../assets/img/candleHome.png';
import Select from 'react-select';

const index = () => {
  const name = 'traygard';

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
                <Button>Створити лот</Button>
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
