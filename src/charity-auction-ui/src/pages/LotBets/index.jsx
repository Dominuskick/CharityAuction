import React, { useState, useEffect } from 'react';
import styles from './lotbets.module.css';
import { Header, Footer } from '@/layout';
import { Button } from '@/components';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import auctionService from '@/utils/api/auctionService';
import bidsService from '@/utils/api/bidsService';
import { formatDateString } from '@/utils/helpers/dateManipulation';
import { LOTS_ROUTE } from '@/utils/constants/routes';

const index = () => {
  const { lotId } = useParams();

  const [lotCardData, setLotCardData] = useState([]);
  const [bidsData, setBidsData] = useState([]);

  useEffect(() => {
    const getAuction = async () => {
      try {
        const response = await auctionService.getAuction(lotId);
        console.log('Receive bids successful:', response.data);
        const response2 = await bidsService.getBids(lotId);

        if (response && response2) {
          setLotCardData(response.data);
          setBidsData(response2.data);
          console.log(lotId);
          console.log(response2.data);
        }
      } catch (error) {
        console.error('Receive bids failed:', error);
      }
    };

    getAuction();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.darkMain}>
        <div className={styles.mainContent}>
          <div className={styles.betsWrapper}>
            <div className={styles.betsContent}>
              <h2>{lotCardData && lotCardData.title}</h2>
              <div className={styles.betList}>
                <div className={styles.betListHeader}>
                  <h3>Учасник:</h3>
                  <h3>Ставка:</h3>
                  <h3>Час:</h3>
                </div>
                <div className={styles.betListBody}>
                  {bidsData.map((item, i) => (
                    <div className={styles.bet} key={i}>
                      <p className={styles.name}>{item.userName}</p>
                      <p className={styles.betValue}>{item.amount}</p>
                      <p className={styles.time}>
                        {formatDateString(item.date)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.btnContainer}>
                <Link to={LOTS_ROUTE}>
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
