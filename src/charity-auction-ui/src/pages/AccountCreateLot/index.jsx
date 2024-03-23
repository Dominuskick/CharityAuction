import { useState } from 'react';
import styles from './accountCreateLot.module.css';
import Select from 'react-select';
import { Button, PageStructure } from '@/components';
import { Link, useNavigate } from 'react-router-dom';
import { ACCOUNT_ROUTE, ERROR_ROUTE } from '@/utils/constants/routes';
import {
  categoryOptions,
  selectStylesDarkColor,
} from '@/utils/constants/select';
import { createAuction } from '@/http/auctionAPI';
import { refreshTokens } from '@/http/userAPI';

const AccountCreateLot = () => {
  const navigate = useNavigate();
  const [isPublished, setIsPublished] = useState(false);
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState('');
  const [startPrice, setStartPrice] = useState(0);
  const [step, setStep] = useState(0);

  const [imagesBlob, setImagesBlob] = useState(Array(4).fill(null));

  const onImageBlobChange = (index, event) => {
    if (event.target.files && event.target.files[0]) {
      const newImages = [...imagesBlob];
      newImages[index] = event.target.files[0];
      setImagesBlob(newImages);
    }
  };

  const [loading, setLoading] = useState(false);

  const createAuctionHandle = async () => {
    const formData = new FormData();
    formData.append('Title', name);
    formData.append('Description', description);
    formData.append('StartPrice', startPrice);
    formData.append('MinIncrease', step);
    categories.forEach((category) => {
      formData.append('CategoryNames', category.value);
    });
    imagesBlob.forEach((image) => {
      if (image) {
        formData.append(`Pictures`, image);
      }
    });

    try {
      setLoading(true);
      await createAuction(formData);
      setIsPublished(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      if (e.response.status === 401) {
        try {
          await refreshTokens();
          await createAuction(formData);
          setIsPublished(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
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

  if (!isPublished) {
    return (
      <PageStructure alignItemsCenter>
        <div className={styles.newLot}>
          <h2 className={styles.header}>Створення аукціону</h2>
          <div className={`${styles.inputWrapper} ${styles.inputName}`}>
            <label>Вкажіть назву</label>
            <input
              type="text"
              placeholder="Наприклад, картина з котами"
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
            />
          </div>
          <div className={`${styles.inputWrapper} ${styles.inputCategory}`}>
            <label>Вкажіть категорію</label>
            <Select
              placeholder="Категорія"
              options={categoryOptions}
              styles={selectStylesDarkColor}
              isMulti
              value={categories}
              onChange={(value) => setCategories(value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label>Додайте щонайменше 1 фото</label>
            <div className={styles.photosWrapper}>
              {imagesBlob.map((image, index) => (
                <div
                  key={index}
                  className={styles.photoInputWrapper}
                  style={image ? { border: 'none' } : {}}
                >
                  <input
                    type="file"
                    accept="image/*"
                    style={{ opacity: '0' }}
                    onChange={(event) => onImageBlobChange(index, event)}
                  />
                  {image ? (
                    <img
                      alt={`Картинка лота ${index + 1}`}
                      src={URL.createObjectURL(image)}
                    />
                  ) : index === 0 ? (
                    <span>Додати фото</span>
                  ) : (
                    <span className={styles.photoIcon}></span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <label>Придумайте опис</label>
            <textarea
              placeholder="Опис"
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
            />
          </div>
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <label>Початкова ціна</label>
              <div className={styles.bidInput}>
                <input
                  type="number"
                  placeholder="Ваша ставка"
                  onChange={(e) => setStartPrice(e.target.value)}
                  max={1000000000}
                />
                <span>грн</span>
              </div>
            </div>
            <div className={styles.inputWrapper}>
              <label>Мінімальний крок ставки</label>
              <div className={styles.bidInput}>
                <input
                  type="number"
                  placeholder="Ваша ставка"
                  onChange={(e) => setStep(e.target.value)}
                  max={1000000000}
                />
                <span>грн</span>
              </div>
            </div>
          </div>
          <div className={styles.btnWrapper}>
            <Button
              onClick={createAuctionHandle}
              disabled={
                !(
                  name &&
                  categories &&
                  description &&
                  startPrice &&
                  step &&
                  imagesBlob.find((blob) => blob)
                )
              }
              loading={loading}
            >
              Виставити лот на аукціон
            </Button>
          </div>
        </div>
      </PageStructure>
    );
  } else {
    return (
      <PageStructure>
        <div className={`${styles.newLot} ${styles.lotPublished}`}>
          <h2>Дякуємо за участь в аукціоні!</h2>
          <h3>Ваш лот стане доступним, після модерації</h3>
          <div className={styles.btnWrapper}>
            <Link to={ACCOUNT_ROUTE}>
              <Button>
                Повернутись до{' '}
                <span className={styles.returnToCabinetWord}>особистого</span>{' '}
                кабінету
              </Button>
            </Link>
          </div>
        </div>
      </PageStructure>
    );
  }
};

export default AccountCreateLot;
