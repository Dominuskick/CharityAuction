import React from 'react';
import styles from './lotCard.module.css';
import { Button } from '..';
import { Link } from 'react-router-dom';

const index = ({ name, endTime, highestBid, src, btnDisable, isEditable }) => {
  if (!isEditable) {
    return (
      <Link to={'/lot'}>
        <div className={styles.lotCard}>
          <img src={src} alt={`Картинка лоту під назвою ${name}`}></img>
          <div className={styles.lotCardDescription}>
            <h3>{name}</h3>
            <div className={styles.lotCardDescriptionPoints}>
              <p>
                <b>Закінчення:</b>
                <span>{endTime}</span>
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
            {!btnDisable && <Button>Зробити ставку</Button>}
          </div>
        </div>
      </Link>
    );
  } else {
    return (
      <div className={`${styles.lotCard} ${styles.editable}`}>
        <Link to={'/lot'}>
          <div className={styles.row}>
            <img src={src} alt={`Картинка лоту під назвою ${name}`}></img>
            <div className={styles.lotCardDescription}>
              <h3>{name}</h3>
              <div className={styles.lotCardDescriptionPoints}>
                <p>
                  <b>Закінчення:</b>
                  <span>{endTime}</span>
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
          <span className={styles.btn}>Видалити</span>
        </div>
      </div>
    );
  }
};

export default index;
