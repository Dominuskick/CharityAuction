import React, { useState, useEffect } from 'react';
import styles from './lot.module.css';
import { Header, Footer } from '@/layout';
import { Button, CheckBox } from '@/components';
import { Link } from 'react-router-dom';
import defaultLotImg from '../../assets/img/defaultLot.jpg';
import { useParams } from 'react-router-dom';
import auctionService from '@/utils/api/auctionService';
import {
  formatDateString,
  calculateTimeRemaining,
} from '@/utils/helpers/dateManipulation';
import bidsService from '@/utils/api/bidsService';
import { LOT_BETS_ROUTE } from '@/utils/constants/routes';

const index = () => {
  const { lotId } = useParams();

  const [lotCardData, setLotCardData] = useState([]);

  const [bid, setBid] = useState('');

  const [bids, setBids] = useState([]);

  const [btnTrigger, setBtnTrigger] = useState(false);

  useEffect(() => {
    const getAuction = async () => {
      try {
        const response = await auctionService.getAuction(lotId);
        console.log('Receive auction successful:', response.data);

        if (response) {
          setLotCardData(response.data);
          setSelectedImg(response.data.pictures[0]);
        }
      } catch (error) {
        console.error('Receive auction failed:', error);
      }
    };

    getAuction();
  }, [btnTrigger]);

  useEffect(() => {
    const getBids = async () => {
      try {
        const bidsResponse = await bidsService.getBids(lotId);

        if (bidsResponse) {
          setBids(bidsResponse.data);
        }
      } catch (error) {
        console.error('Receive bids failed:', error);
      }
    };

    getBids();
  }, [btnTrigger]);

  const createBid = async () => {
    const data = {
      amount: bid,
      auctionId: lotId,
    };

    console.log(data);

    try {
      const response = await bidsService.createBid(data);
      console.log('Create bid successful:', response);

      if (response) {
        setBid(0);
        setBtnTrigger((val) => !val);
      }
    } catch (error) {
      console.error('Create auction failed:', error);
    }
  };

  const [selectedImg, setSelectedImg] = useState(defaultLotImg);

  return (
    <>
      <Header />
      <main className={styles.darkMain}>
        <div className={styles.mainContent}>
          <div className="responsiveWrapper">
            <h2 className={styles.name}>{lotCardData.title}</h2>
            <div className={styles.line}>
              <div className={styles.images}>
                <div className={styles.imageSelected}>
                  <img
                    src={selectedImg}
                    alt={`Зображення лоту з назвою ${
                      lotCardData && lotCardData.title
                    }`}
                  />
                </div>
                <div className={styles.imgRow}>
                  {lotCardData && lotCardData.pictures ? (
                    lotCardData.pictures.map(
                      (pic, i) =>
                        i < 4 && (
                          <img
                            src={pic}
                            alt={`Зображення лоту з назвою ${
                              lotCardData && lotCardData.title
                            } під номером ${i}`}
                            className={`${styles.microImg} ${
                              selectedImg === lotCardData.pictures[i] &&
                              styles.microImgSelected
                            }`}
                            onClick={() =>
                              setSelectedImg(lotCardData.pictures[i])
                            }
                            key={`Зображення лоту з назвою ${
                              lotCardData && lotCardData.title
                            } під номером ${i}`}
                          />
                        )
                    )
                  ) : (
                    <img
                      src={defaultLotImg}
                      alt={`Зображення лоту з назвою ${
                        lotCardData && lotCardData.title
                      }`}
                    />
                  )}
                </div>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.infoCardContent}>
                  <p>
                    <b>Закінчення</b>
                    <span>{formatDateString(lotCardData.endDate)}</span>
                  </p>
                  <p>
                    <b>До закінчення</b>
                    <span>{calculateTimeRemaining(lotCardData.endDate)}</span>
                  </p>
                  <div>
                    <div className={styles.column}>
                      <b>Поточна ціна</b>
                      <Link to={LOT_BETS_ROUTE}>
                        <span>({bids.length} ставок)</span>
                      </Link>
                    </div>
                    <span>
                      {lotCardData.currentPrice !== undefined
                        ? lotCardData.currentPrice.toLocaleString()
                        : 'Нема ціни...'}{' '}
                      грн
                    </span>
                  </div>
                  <div className={styles.makeBid}>
                    <label>Зробити ставку</label>
                    <div className={styles.bidInput}>
                      <input
                        type="number"
                        placeholder="Ваша ставка"
                        onChange={(e) => {
                          setBid(e.target.value);
                        }}
                        value={bid}
                      />
                      <span>грн</span>
                    </div>
                  </div>
                  <div className={styles.btnContainer}>
                    <Button onClick={createBid}>Підтвердити ставку</Button>
                  </div>
                </div>
              </div>
            </div>
            <p className={styles.description}>{lotCardData.description}</p>
            <div className={styles.comments}>
              <h3>
                Коментарі <span>2</span>
              </h3>
              <div className={styles.commentsList}>
                <div className={styles.comment}>
                  <hr />
                  <div className={styles.commentHeader}>
                    <span className={styles.authorName}>Arcan689</span>
                    <span className={styles.publishTime}>
                      08.02.2024, 15:46
                    </span>
                  </div>
                  <p className={styles.commentBody}>
                    Доброго дня, чи можете ви завантажити додаткові фотографії
                    картини?
                  </p>
                </div>
                <div className={styles.comment}>
                  <hr />
                  <div className={styles.commentHeader}>
                    <span className={styles.authorName}>Capibara54</span>
                    <span className={styles.publishTime}>
                      07.02.2024, 09:40
                    </span>
                  </div>
                  <p className={styles.commentBody}>
                    Ви відправляєте лоти Новою поштою?
                  </p>
                </div>
              </div>
              <h4>Додати коментар</h4>
              <textarea placeholder="Будь ласка, напишіть Ваш коментар" />
              <div className={styles.btnContainer}>
                <Button isBlack={true}>Надіслати</Button>
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
