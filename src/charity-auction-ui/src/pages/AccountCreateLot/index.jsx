import React, { useState, useEffect } from 'react';
import styles from './accountCreateLot.module.css';
import { Header, Footer } from '@/layout';
import Select from 'react-select';
import { Button } from '@/components';
import { Link, useNavigate } from 'react-router-dom';
import auctionService from '@/utils/api/auctionService';
import { useSelector } from 'react-redux';
import defaultImg from '../../assets/img/defaultLot.jpg';

const index = () => {
  const userName = useSelector((state) => state.auth.login);

  const [isPublished, setIsPublished] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startPrice, setStartPrice] = useState(0);
  const [step, setStep] = useState(0);

  const categoryOptions = [
    { value: 'Антикваріат', label: 'Антикваріат' },
    { value: 'Букіністика', label: 'Букіністика' },
    { value: 'Живопис', label: 'Живопис' },
    { value: 'Електроніка', label: 'Електроніка' },
    { value: 'Пам’ятні предмети', label: 'Пам’ятні предмети' },
    { value: 'Ручна робота', label: 'Ручна робота' },
    { value: 'Інше', label: 'Інше' },
  ];

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      marginTop: 0, // Убираем верхний отступ между селектом и вариантами
    }),
    menuList: (provided, state) => ({
      ...provided,
      padding: 0, // Убираем внутренний отступ вокруг вариантов
    }),
    option: (provided, state) => ({
      ...provided,
      color: '#131313', // Устанавливаем цвет текста в черный
    }),
    control: (provided, state) => ({
      ...provided,
      borderColor: '#131313', // Устанавливаем цвет обводки в черный
    }),
  };

  const [images, setImages] = useState(Array(4).fill(null));
  const [imagesSend, setImagesSend] = useState(Array(4).fill(null));

  const onImageChange = (index, event) => {
    onImageSendChange(index, event);
    if (event.target.files && event.target.files[0]) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(event.target.files[0]);
      setImages(newImages);
    }
  };

  const onImageSendChange = (index, event) => {
    if (event.target.files && event.target.files[0]) {
      const newImages = [...imagesSend];
      newImages[index] = event.target.files[0];
      setImagesSend(newImages);
    }
    console.log(event.target.files[0]);
  };

  const createAuction = async () => {
    const formData = new FormData();

    // Append auction data to the FormData
    formData.append('Title', name);
    formData.append('Description', description);
    formData.append('StartPrice', startPrice);
    formData.append('MinIncrease', step);
    formData.append('CategoryName', 'string');
    formData.append(`Pictures`, imagesSend[0]);

    imagesSend.forEach((image) => {
      if (image) {
        formData.append(`Pictures`, image);
      }
    });

    console.log(formData);

    try {
      const response = await auctionService.createAuction(formData);
      console.log('Create auction successful:', response);

      if (response) {
        console.log('ДА ЕСТЬ ЖЕ!!!!!!!!!!    ЧИНАЗЕС!!!!!!!!!!');
        setIsPublished(true);
      }
    } catch (error) {
      console.error('Create auction failed:', error);
    }
  };

  if (!isPublished) {
    return (
      <>
        <Header />
        <main className={styles.darkMain}>
          <div className={styles.mainContent}>
            <div className="responsiveWrapper">
              <div className={styles.newLot}>
                <h2 className={styles.header}>Створення аукціону</h2>
                <div className={`${styles.inputWrapper} ${styles.inputName}`}>
                  <label>Вкажіть назву</label>
                  <input
                    type="text"
                    placeholder="Наприклад, картина з котами"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div
                  className={`${styles.inputWrapper} ${styles.inputCategory}`}
                >
                  <label>Вкажіть категорію</label>
                  <Select
                    placeholder="Категорія"
                    options={categoryOptions}
                    styles={customStyles}
                    isMulti
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <label>Додайте щонайменше 1 фото</label>
                  <div className={styles.photosWrapper}>
                    {images.map((image, index) => (
                      <div key={index} className={styles.photoInputWrapper}>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ opacity: '0' }}
                          onChange={(event) => onImageChange(index, event)}
                        />
                        {image ? (
                          <img alt={`Картинка лота ${index + 1}`} src={image} />
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
                      />
                      <span>грн</span>
                    </div>
                  </div>
                </div>
                <div className={styles.btnWrapper}>
                  <Button onClick={() => createAuction(true)}>
                    Виставити лот на аукціон
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Header />
        <main className={styles.darkMain}>
          <div className={styles.mainContent}>
            <div className="responsiveWrapper">
              <div className={`${styles.newLot} ${styles.lotPublished}`}>
                <h2>Дякуємо за участь в аукціоні!</h2>
                <h3>Ваш лот стане доступним, після модерації</h3>
                <div className={styles.btnWrapper}>
                  <Link to={'/account'}>
                    <Button>Повернутись до особистого кабінету</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
};

export default index;
