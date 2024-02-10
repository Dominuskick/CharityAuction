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

  const lotCardsData = [
    {
      name: 'Картина “50 котів”',
      endTime: '19.02.2024, 20:00',
      highestBid: 1100,
      src: catImg,
    },
    {
      name: 'Книга “Мовчазна пацієнтка”',
      endTime: '20.02.2024, 22:00',
      highestBid: 300,
      src: bookImg,
    },
  ];

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
              <div className={styles.lotListWrapper}>
                <h2>Ваші лоти</h2>
                <div className={styles.lotList}>
                  {lotCardsData.map((data) => (
                    <LotCard {...data} isEditable={true} />
                  ))}
                </div>
                <div className={styles.rowBtns}>
                  <p className={styles.numberOfLots}>Всього лотів: 2</p>
                  <h4 className={styles.lotsArchive}>Архів лотів</h4>
                </div>
                <div className={styles.btnWrapper}>
                  <Link to={'/account/createLot'}>
                    <Button>Створити лот</Button>
                  </Link>
                </div>
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
