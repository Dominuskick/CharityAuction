import { useState, useEffect } from 'react';
import styles from './lotbets.module.css';
import { Button, LoaderInline, PageStructure } from '@/components';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { formatDateString } from '@/utils/helpers/dateManipulation';
import { ERROR_ROUTE, LOTS_ROUTE } from '@/utils/constants/routes';
import { getAuctionById } from '@/http/auctionAPI';
import { getAuctionBidsById } from '@/http/bidAPI';

const LotBets = () => {
  const { lotId } = useParams();
  const navigate = useNavigate();

  const [lotCardData, setLotCardData] = useState([]);
  const [bidsData, setBidsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAuction = async () => {
      try {
        const auctionResponse = await getAuctionById(lotId);
        const bidsResponse = await getAuctionBidsById(lotId);
        setLotCardData(auctionResponse.data);
        setBidsData(bidsResponse.data);
      } catch (e) {
        navigate(ERROR_ROUTE);
      } finally {
        setLoading(false);
      }
    };

    getAuction();
  }, []);

  return (
    <PageStructure>
      <div className={styles.betsWrapper}>
        <div className={styles.betsContent}>
          {loading ? (
            <div style={{ marginBottom: '24px' }}>
              <LoaderInline height="46px" width="100px" color="#131313" />
            </div>
          ) : (
            <h2>{lotCardData && lotCardData.title}</h2>
          )}
          <div className={styles.betList}>
            <div className={styles.betListHeader}>
              <h3>Учасник:</h3>
              <h3>Ставка:</h3>
              <h3>Час:</h3>
            </div>
            <div className={styles.betListBody}>
              {loading ? (
                <div className={styles.loadingBet}>
                  <LoaderInline height="28px" width="50px" />
                  <LoaderInline height="28px" width="50px" />
                  <LoaderInline height="28px" width="50px" />
                </div>
              ) : (
                bidsData.map((item, i) => (
                  <div className={styles.bet} key={i}>
                    <p className={styles.name}>{item.userName}</p>
                    <p className={styles.betValue}>{item.amount} грн</p>
                    <p className={styles.time}>{formatDateString(item.date)}</p>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className={styles.btnContainer}>
            <Link to={LOTS_ROUTE}>
              <Button>Повернутись до лоту</Button>
            </Link>
          </div>
        </div>
      </div>
    </PageStructure>
  );
};

export default LotBets;
