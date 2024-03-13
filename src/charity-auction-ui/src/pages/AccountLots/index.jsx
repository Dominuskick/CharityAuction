import { useState, useEffect } from 'react';
import styles from './lotlist.module.css';
import { AccountPageStructure, Button, Loader, LotCard } from '@/components';
import { Link, useNavigate } from 'react-router-dom';
import {
  ACCOUNT_CREATE_LOT_ROUTE,
  ERROR_ROUTE,
} from '@/utils/constants/routes';
import { getUserAuctionList } from '@/http/auctionAPI';
import { refreshTokens } from '@/http/userAPI';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const AccountLots = () => {
  const navigate = useNavigate();

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
            console.error(e);
            navigate(ERROR_ROUTE);
          }
        } else {
          console.error(e);
          navigate(ERROR_ROUTE);
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
    <AccountPageStructure>
      <h2 className={styles.header}>Ваші лоти</h2>
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
      <Link to={ACCOUNT_CREATE_LOT_ROUTE}>
        <Button>Створити лот</Button>
      </Link>
    </AccountPageStructure>
  );
};

export default AccountLots;
