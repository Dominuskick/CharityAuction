import { useState, useEffect } from 'react';
import styles from './lot.module.css';
import { Button, LoaderInline, PageStructure } from '@/components';
import { Link, useNavigate } from 'react-router-dom';
import defaultLotImg from '../../assets/img/defaultLot.jpg';
import { useParams } from 'react-router-dom';
import {
  formatDateString,
  calculateTimeRemaining,
} from '@/utils/helpers/dateManipulation';
import { ERROR_ROUTE } from '@/utils/constants/routes';
import { getAuctionById } from '@/http/auctionAPI';
import { createBid, getAuctionBidsById } from '@/http/bidAPI';
import { useSelector } from 'react-redux';

const Lot = () => {
  const { lotId } = useParams();
  const login = useSelector((state) => state.auth.login);
  const navigate = useNavigate();

  const [lotCardData, setLotCardData] = useState([]);
  const [bid, setBid] = useState('');
  const [bids, setBids] = useState([]);
  const [selectedImg, setSelectedImg] = useState(defaultLotImg);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAuctionAndBidsData = async () => {
      try {
        const response = await getAuctionById(lotId);
        setLotCardData(response.data);
        if (response.data.pictures.length > 0) {
          setSelectedImg(response.data.pictures[0]);
        }
        await getAndSetBids(lotId);
      } catch (e) {
        console.error(e);
        navigate(ERROR_ROUTE);
      } finally {
        setLoading(false);
      }
    };

    getAuctionAndBidsData();
  }, []);

  const getAndSetBids = async (id) => {
    getAuctionBidsById(id)
      .then((response) => {
        setBids(response.data);
      })
      .catch((e) => {
        console.error(e);
        navigate(ERROR_ROUTE);
      });
  };

  const createBidHandle = async () => {
    try {
      await createBid(bid, lotId);
      setBid('');
      getAndSetBids(lotCardData.id);
    } catch (e) {
      console.error(e);
      navigate(ERROR_ROUTE);
    }
  };

  return (
    <PageStructure>
      {loading ? (
        <LoaderInline height="46px" width="100px" color="#fff" />
      ) : (
        <h2 className={styles.name}>{lotCardData.title}</h2>
      )}
      <div className={styles.category}>
        Категорія:{' '}
        {loading ? (
          <LoaderInline size="28" color="#fff" />
        ) : (
          lotCardData?.categoryNames?.join(', ')
        )}
      </div>
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
            {lotCardData && lotCardData.pictures?.length > 0 ? (
              lotCardData.pictures.map(
                (pic, i) =>
                  i < 4 && (
                    <div
                      className={`${styles.imageWrapper} ${
                        selectedImg === lotCardData.pictures[i] &&
                        styles.microImgSelected
                      }`}
                      key={`Зображення лоту з назвою ${
                        lotCardData && lotCardData.title
                      } під номером ${i}`}
                    >
                      <img
                        src={pic}
                        alt={`Зображення лоту з назвою ${
                          lotCardData && lotCardData.title
                        } під номером ${i}`}
                        className={`${styles.microImg}`}
                        onClick={() => setSelectedImg(lotCardData.pictures[i])}
                      />
                    </div>
                  )
              )
            ) : (
              <div
                className={`${styles.imageWrapper} ${styles.microImgSelected}`}
              >
                <img
                  src={defaultLotImg}
                  alt={`Зображення лоту з назвою ${
                    lotCardData && lotCardData.title
                  }`}
                  className={`${styles.microImg}`}
                />
              </div>
            )}
          </div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoCardContent}>
            <div className={styles.infoCardContentDate}>
              <b>Закінчення</b>
              <span>
                {loading ? (
                  <LoaderInline size="28" />
                ) : (
                  formatDateString(lotCardData.endDate)
                )}
              </span>
            </div>
            <div>
              <b>До закінчення</b>
              <span>
                {loading ? (
                  <LoaderInline size="28" />
                ) : (
                  calculateTimeRemaining(lotCardData.endDate)
                )}
              </span>
            </div>
            <div>
              <div className={styles.column}>
                <b>Поточна ціна</b>
                <Link to={`/lots/${lotId}/bets`}>
                  <span style={{ display: 'flex', gap: '5px' }}>
                    ({loading ? <LoaderInline size="21" /> : bids.length}{' '}
                    ставок)
                  </span>
                </Link>
              </div>
              <span>
                {loading ? (
                  <LoaderInline size="28" />
                ) : lotCardData.currentPrice !== undefined ? (
                  lotCardData.currentPrice.toLocaleString() + ' грн'
                ) : (
                  'Нема ціни... '
                )}
              </span>
            </div>
            <div>
              <b>
                Мін. крок <span className={styles.betStepWord}>ставки</span>
              </b>
              <span>
                {loading ? (
                  <LoaderInline size="28" />
                ) : (
                  lotCardData.minIncrease + ' грн'
                )}
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
                  disabled={!login}
                />
                <span>грн</span>
              </div>
            </div>
            <div className={styles.btnContainer}>
              <Button
                onClick={createBidHandle}
                disabled={
                  !login ||
                  (bids.length == 0
                    ? bid < lotCardData?.currentPrice
                    : bid <
                      lotCardData?.currentPrice + lotCardData?.minIncrease)
                }
              >
                Підтвердити ставку
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.description}>
        {loading ? (
          <LoaderInline height="36px" width="100px" color="#fff" />
        ) : (
          <p>{lotCardData.description}</p>
        )}
      </div>
      <div className={styles.comments}>
        <h3>
          Коментарі <span>2</span>
        </h3>
        <div className={styles.commentsList}>
          <div className={styles.comment}>
            <hr />
            <div className={styles.commentHeader}>
              <span className={styles.authorName}>Arcan689</span>
              <span className={styles.publishTime}>08.02.2024, 15:46</span>
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
              <span className={styles.publishTime}>07.02.2024, 09:40</span>
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
    </PageStructure>
  );
};

export default Lot;
