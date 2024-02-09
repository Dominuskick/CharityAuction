import React from 'react';
import styles from './lotlist.module.css';
import { Header, Footer } from '@/layout';
import { Button, CheckBox, LotCard } from '@/components';
import { Link } from 'react-router-dom';
import catImg from '../../assets/img/catHome.png';
import bookImg from '../../assets/img/bookHome.png';
import candleImg from '../../assets/img/candleHome.png';
import Select from 'react-select';

const index = () => {
  const categoryOptions = [
    { value: 'Антикваріат', label: 'Антикваріат' },
    { value: 'Букіністика', label: 'Букіністика' },
    { value: 'Живопис', label: 'Живопис' },
    { value: 'Електроніка', label: 'Електроніка' },
    { value: 'Пам’ятні предмети', label: 'Пам’ятні предмети' },
    { value: 'Ручна робота', label: 'Ручна робота' },
    { value: 'Інше', label: 'Інше' },
  ];

  const priceOptions = [
    { value: 'В порядку зростання', label: 'В порядку зростання' },
    { value: 'В порядку спадання', label: 'В порядку спадання' },
  ];

  const noveltyOptions = [
    { value: 'Від більш нових', label: 'Від більш нових' },
    { value: 'Від більш старих', label: 'Від більш старих' },
  ];

  const relevanceOptions = [
    { value: 'Активні', label: 'Активні' },
    { value: 'Продані', label: 'Продані' },
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
  };

  const lotCardsData = [
    {
      name: 'Картина “50 котів”',
      endTime: '19.02.2024, 20:00',
      highestBid: 1100,
      src: catImg,
    },
    {
      name: 'Книга “Мовчазна пацієнтка”',
      endTime: '20.02.2024, 22:00',
      highestBid: 300,
      src: bookImg,
    },
    {
      name: 'Підставка для свічки',
      endTime: '22.02.2024, 17:00',
      highestBid: 1500,
      src: candleImg,
    },
  ];

  return (
    <>
      <Header />
      <main className={styles.darkMain}>
        <div className={styles.mainContent}>
          <div className="responsiveWrapper">
            <h2 className={styles.header}>Актуальні лоти</h2>
            <div className={styles.filters}>
              <div className={styles.selectWrapper}>
                <Select
                  placeholder="Категорія"
                  options={categoryOptions}
                  styles={customStyles}
                  isMulti
                />
              </div>
              <div className={styles.sortWrapper}>
                <label>Сортувати за</label>
                <div className={styles.selectWrapper}>
                  <Select
                    placeholder="Ціною"
                    options={priceOptions}
                    styles={customStyles}
                  />
                </div>
                <div className={styles.selectWrapper}>
                  <Select
                    placeholder="Новизною"
                    options={noveltyOptions}
                    styles={customStyles}
                  />
                </div>
                <div className={styles.selectWrapper}>
                  <Select
                    placeholder="Актуальністю"
                    options={relevanceOptions}
                    styles={customStyles}
                  />
                </div>
              </div>
            </div>
            <div className={styles.lotList}>
              {lotCardsData.map((lotData) => (
                <LotCard {...lotData} />
              ))}
            </div>
            <div className={styles.pageControls}>
              <span className={styles.pagePrev}></span>
              <span className={`${styles.page} ${styles.curPage}`}>1</span>
              <span className={styles.page}>2</span>
              <span className={styles.page}>3</span>
              <span className={styles.pageNext}></span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default index;
