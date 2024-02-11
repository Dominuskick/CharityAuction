import React from 'react';
import styles from './lotCard.module.css';
import { Button } from '..';
import { Link } from 'react-router-dom';
import {
  formatDateString,
  calculateTimeRemaining,
} from '@/utils/helpers/dateManipulation';
import auctionService from '@/utils/api/auctionService';
import defaultImg from '../../assets/img/defaultLot.jpg';

const index = ({
  name,
  endTime,
  highestBid,
  id,
  btnDisable,
  pictures,
  isEditable,
  setDeleteToggle,
}) => {
  if (!isEditable) {
    return (
      <Link to={`/lot/${id}`}>
        <div className={styles.lotCard}>
          <img
            src={pictures ? pictures[0] : defaultImg}
            alt={`Картинка лоту під назвою ${name}`}
          ></img>
          <div className={styles.lotCardDescription}>
            <h3>{name}</h3>
            <div className={styles.lotCardDescriptionPoints}>
              <p>
                <b>Закінчення:</b>
                <span>{formatDateString(endTime)}</span>
              </p>
              <p>
                <b>До закриття лоту:</b>
                <span>{calculateTimeRemaining(endTime)}</span>
              </p>
              <p>
                <b>Найвища ставка:</b>
                <span>{highestBid.toLocaleString()} грн</span>
              </p>
            </div>
            {!btnDisable && <Button>Зробити ставку</Button>}
          </div>
        </div>
      </Link>
    );
  } else {
    const deleteAuctionById = async () => {
      try {
        const response = await auctionService.deleteAuctionById(id);
        console.log('Delete auction successful:', response.data);

        if (response) {
          setDeleteToggle((cur) => !cur);
        }
      } catch (error) {
        console.error('Delete auction failed:', error);
      }
    };

    return (
      <div className={`${styles.lotCard} ${styles.editable}`}>
        <Link to={`/lot/${id}`}>
          <div className={styles.row}>
            <img
              src={pictures ? pictures[0] : defaultImg}
              alt={`Картинка лоту під назвою ${name}`}
            ></img>
            <div className={styles.lotCardDescription}>
              <h3>{name}</h3>
              <div className={styles.lotCardDescriptionPoints}>
                <p>
                  <b>Закінчення:</b>
                  <span>{formatDateString(endTime)}</span>
                </p>
                <p>
                  <b>До закриття лоту:</b>
                  <span>5 днів 4 години</span>
                </p>
                <p>
                  <b>Найвища ставка:</b>
                  <span>{highestBid.toLocaleString()} грн</span>
                </p>
              </div>
            </div>
          </div>
        </Link>
        <hr />
        <div className={styles.controls}>
          <span className={styles.btn}>Редагувати</span>
          <span className={styles.btn} onClick={deleteAuctionById}>
            Видалити
          </span>
        </div>
      </div>
    );
  }
};

export default index;
