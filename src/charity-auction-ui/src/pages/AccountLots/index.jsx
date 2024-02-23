import React, { useState, useEffect, createRef } from 'react';
import styles from './lotlist.module.css';
import { Header, Footer } from '@/layout';
import { AccountMenu, Button, Loader, LotCard } from '@/components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import auctionService from '@/utils/api/auctionService';
import defaultImg from '../../assets/img/defaultLot.jpg';
import { ACCOUNT_CREATE_LOT_ROUTE } from '@/utils/constants/routes';
import { getUserAuctionList } from '@/http/auctionAPI';
import { refreshTokens } from '@/http/userAPI';
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from 'react-transition-group';

const index = () => {
  const name = useSelector((state) => state.auth.login);

  const [lotCardsData, setLotCardsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLotListHandle = async () => {
      try {
        const response = await getUserAuctionList();
        setLotCardsData(response.data);
      } catch (e) {
        if (e.response.status === 401) {
          try {
            await refreshTokens();
            const response = await getUserAuctionList();
            setLotCardsData(response.data);
          } catch (e) {
            // тут редирект на страницу ошибки
            console.error(e);
          }
        } else {
          // тут редирект на страницу ошибки
          console.error(e);
        }
      } finally {
        setLoading(false);
      }
    };

    getLotListHandle();
  }, []);

  const deleteHandle = (id) => {
    const arrayCopy = lotCardsData.slice();
    const filteredArray = arrayCopy.filter((el) => el.id !== id);
    setLotCardsData(filteredArray);
  };

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
                  {loading ? (
                    <Loader />
                  ) : (
                    <TransitionGroup className={styles.lotList}>
                      {lotCardsData.map((lotCardData) => (
                        <CSSTransition
                          key={lotCardData.id} // Assuming 'id' is a unique identifier
                          timeout={300}
                          classNames="lot-card"
                        >
                          <LotCard
                            name={lotCardData.title}
                            endTime={lotCardData.endDate}
                            highestBid={lotCardData.currentPrice}
                            pictures={lotCardData.pictures}
                            id={lotCardData.id}
                            isEditable={true}
                            onDelete={deleteHandle}
                          />
                        </CSSTransition>
                      ))}
                    </TransitionGroup>
                  )}
                </div>
                <div className={styles.rowBtns}>
                  <p className={styles.numberOfLots}>
                    Всього лотів: {lotCardsData.length}
                  </p>
                  <h4 className={styles.lotsArchive}>Архів лотів</h4>
                </div>
                <div className={styles.btnWrapper}>
                  <Link to={ACCOUNT_CREATE_LOT_ROUTE}>
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
