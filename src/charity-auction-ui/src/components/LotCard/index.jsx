import React from 'react';
import styles from './lotCard.module.css';
import { Button } from '..';
import { Link } from 'react-router-dom';

function formatDateString(originalDateString) {
  const originalDate = new Date(originalDateString);

  // Получаем компоненты даты и времени
  const day = originalDate.getDate();
  const month = originalDate.getMonth() + 1; // Месяцы в JavaScript начинаются с 0
  const year = originalDate.getFullYear();
  const hours = originalDate.getHours();
  const minutes = originalDate.getMinutes();

  // Дополняем нулями, если компонент состоит из одной цифры
  const formattedDay = day < 10 ? `0${day}` : `${day}`;
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  // Форматируем строку в нужном формате
  const formattedString = `${formattedDay}.${formattedMonth}.${year}, ${formattedHours}:${formattedMinutes}`;

  return formattedString;
}

function calculateTimeRemaining(endDate) {
  const currentTime = new Date();
  const endTime = new Date(endDate);

  // Разница в миллисекундах между текущим временем и датой окончания
  const timeDifference = endTime - currentTime;

  // Преобразуем разницу в дни, часы и минуты
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  // Формируем строку с оставшимся временем
  const remainingTime = `${days} днів ${hours} годин`;

  return remainingTime;
}

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
          <span className={styles.btn}>Видалити</span>
        </div>
      </div>
    );
  }
};

export default index;
