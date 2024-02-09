import React from 'react';
import styles from './lotbets.module.css';
import { Header, Footer } from '@/layout';
import { Button, CheckBox } from '@/components';
import { Link } from 'react-router-dom';
import img from '../../assets/img/catHome.png';

const index = () => {
  const name = 'Картина “50 котів”';
  const data = [
    {
      name: 'Arcan689',
      bet: 1100,
      time: '13.02.2024, 18:48',
    },
    {
      name: 'Capibara54',
      bet: 950,
      time: '13.02.2024, 16:12',
    },
    {
      name: 'Arcan689',
      bet: 840,
      time: '11.02.2024, 07:37',
    },
    {
      name: 'Mangust189',
      bet: 750,
      time: '10.02.2024, 13:21',
    },
  ];

  return (
    <>
      <Header />
      <main className={styles.darkMain}>
        <div className={styles.mainContent}>
          <div className={styles.betsWrapper}>
            <div className={styles.betsContent}>
              <h2>{name}</h2>
              <div className={styles.betList}>
                <div className={styles.betListHeader}>
                  <h3>Учасник:</h3>
                  <h3>Ставка:</h3>
                  <h3>Час:</h3>
                </div>
                <div className={styles.betListBody}>
                  {data.map((item) => (
                    <div className={styles.bet}>
                      <p className={styles.name}>{item.name}</p>
                      <p className={styles.betValue}>{item.bet}</p>
                      <p className={styles.time}>{item.time}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.btnContainer}>
                <Link to={'/lot'}>
                  <Button>Повернутись до лоту</Button>
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
