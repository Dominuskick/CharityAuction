import styles from './lotCard.module.css';
import { Button } from '..';
import { Link } from 'react-router-dom';
import {
  formatDateString,
  calculateTimeRemaining,
  formatDateStringStartAndEnd,
} from '@/utils/helpers/dateManipulation';
import defaultImg from '../../assets/img/defaultLot.jpg';
import { deleteAuction } from '@/http/auctionAPI';

const index = ({
  name,
  endTime,
  highestBid,
  id,
  categoryNames,
  btnDisable,
  pictures,
  isEditable,
  onDelete,
}) => {
  if (!isEditable) {
    return (
      <Link to={`/lots/${id}`}>
        <div className={styles.lotCard}>
          <div className={styles.imgContainer}>
            <img
              src={pictures?.length > 0 ? pictures[0] : defaultImg}
              alt={`Картинка лоту під назвою ${name}`}
            />
          </div>
          <div className={styles.lotCardDescription}>
            <h3 className={styles.lotCardName}>{name}</h3>
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
        deleteAuction(id);
        onDelete(id);
      } catch (error) {
        console.error('Delete auction failed:', error);
      }
    };

    return (
      <div className={`${styles.lotCard} ${styles.editable}`}>
        <Link to={`/lots/${id}`}>
          <div className={styles.row}>
            <div
              className={`${styles.imgContainer} ${styles.imgContainerEditable}`}
            >
              <img
                src={pictures?.length > 0 ? pictures[0] : defaultImg}
                alt={`Картинка лоту під назвою ${name}`}
              />
            </div>
            <div
              className={`${styles.lotCardDescription} ${styles.lotCardDescriptionEditable}`}
            >
              <h3>{name}</h3>
              <h4>{categoryNames[0] || 'Нема категорії'}</h4>
              <div className={styles.timeGap}>
                <span className={styles.calendarIcon}></span>
                {formatDateStringStartAndEnd(endTime)}
              </div>
              <h4>
                Поточна ціна: <b>{highestBid} грн</b>
              </h4>
              {/* <div className={styles.lotCardDescriptionPoints}>
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
              </div> */}
            </div>
          </div>
        </Link>
        <hr />
        <div className={styles.controls}>
          <Link to={`/account/lots/${id}/edit`}>
            <span className={styles.btn}>Редагувати</span>
          </Link>
          <span className={styles.btn} onClick={deleteAuctionById}>
            Видалити
          </span>
        </div>
      </div>
    );
  }
};

export default index;
