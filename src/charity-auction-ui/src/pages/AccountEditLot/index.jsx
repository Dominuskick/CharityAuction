import { useState, useEffect } from 'react';
import styles from './accountEditLot.module.css';
import Select from 'react-select';
import { Button, PageStructure } from '@/components';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ACCOUNT_ROUTE } from '@/utils/constants/routes';
import {
  categoryOptions,
  selectStylesDarkColor,
} from '@/utils/constants/select';
import { editAuction, getAuctionById } from '@/http/auctionAPI';
import { refreshTokens } from '@/http/userAPI';
import { ERROR_ROUTE } from '@/utils/constants/routes';

const AccountEditLot = () => {
  const { lotId } = useParams();
  const navigate = useNavigate();

  const [isPublished, setIsPublished] = useState(false);
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState('');
  const [startPrice, setStartPrice] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    step;
  });

  const [imagesBlob, setImagesBlob] = useState(Array(4).fill(null));

  const onImageBlobChange = (index, event) => {
    if (event.target.files && event.target.files[0]) {
      const newImages = [...imagesBlob];
      newImages[index] = event.target.files[0];
      setImagesBlob(newImages);
    }
  };

  const [loading, setLoading] = useState(false);

  const editAuctionHandle = async () => {
    const formData = new FormData();
    formData.append('Id', lotId);
    formData.append('Title', name);
    formData.append('Description', description);
    formData.append('StartPrice', startPrice);
    formData.append('MinIncrease', step);
    categories.forEach((category) => {
      formData.append('CategoryNames', category.value);
    });
    imagesBlob.forEach((image) => {
      if (image) {
        formData.append(`PicturesToAdd`, image);
      }
    });

    try {
      setLoading(true);
      await editAuction(formData);
      setIsPublished(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      if (e.response.status === 401) {
        try {
          await refreshTokens();
          await editAuction(formData);
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

  useEffect(() => {
    const getAuction = async () => {
      try {
        const response = await getAuctionById(lotId);

        if (response) {
          const auctionData = response.data;
          setName(auctionData.title);
          setCategories(
            auctionData.categoryNames.map((val) => {
              return { value: val, label: val };
            })
          );
          setDescription(auctionData.description);
          setStartPrice(auctionData.startPrice);
          setStep(auctionData.minIncrease);

          const imgArr = [];
          for (let i = 0; i < 4; i++) {
            if (i < auctionData.pictures.length) {
              const imageUrl = auctionData.pictures[i];
              try {
                const imageResponse = await fetch(imageUrl);
                const imageBlob = await imageResponse.blob();
                imgArr.push(imageBlob);
              } catch (error) {
                console.error('Error fetching image:', error);
                imgArr.push(null);
              }
            } else {
              imgArr.push(null);
            }
          }
          setImagesBlob(imgArr);
        }
      } catch (error) {
        console.error('Receive auction failed:', error);
      }
    };

    getAuction();
  }, []);

  if (!isPublished) {
    return (
      <PageStructure>
        <div className={styles.editLot}>
          <h2 className={styles.header}>Редагування аукціону</h2>
          <div className={`${styles.inputWrapper} ${styles.inputName}`}>
            <label>Назва</label>
            <input
              type="text"
              placeholder="Наприклад, картина з котами"
              onChange={(e) => setName(e.target.value)}
              value={name || ''}
              maxLength={50}
            />
          </div>
          <div className={`${styles.inputWrapper} ${styles.inputCategory}`}>
            <label>Категорії</label>
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
            <label>Зображення</label>
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
            <label>Опис</label>
            <textarea
              placeholder="Опис"
              onChange={(e) => setDescription(e.target.value)}
              value={description || ''}
              maxLength={500}
            />
          </div>
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <label>Ціна</label>
              <div className={styles.bidInput}>
                <input
                  type="number"
                  placeholder="Ваша ставка"
                  onChange={(e) => setStartPrice(e.target.value)}
                  value={startPrice}
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
                  value={step}
                  max={1000000000}
                />
                <span>грн</span>
              </div>
            </div>
          </div>
          <div className={styles.btnWrapper}>
            <Button
              onClick={editAuctionHandle}
              disabled={
                !(
                  name &&
                  description &&
                  startPrice &&
                  step &&
                  imagesBlob.find((blob) => blob)
                )
              }
              loading={loading}
            >
              Зберегти зміни
            </Button>
          </div>
        </div>
      </PageStructure>
    );
  } else {
    return (
      <PageStructure>
        <div className={`${styles.editLot} ${styles.lotPublished}`}>
          <h2>Дякуємо за участь в аукціоні!</h2>
          <h3>Ваш лот буде відредаговано, після модерації</h3>
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

export default AccountEditLot;
