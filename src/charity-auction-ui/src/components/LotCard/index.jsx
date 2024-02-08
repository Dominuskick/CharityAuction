import React from 'react';
import styles from './lotCard.module.css';
import { Button } from '..';

const index = ({ name, endTime, highestBid, src }) => {
  return (
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
        <Button>Зробити ставку</Button>
      </div>
    </div>
  );
};

export default index;
