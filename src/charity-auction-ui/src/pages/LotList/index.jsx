import React, { useState, useEffect } from 'react';
import styles from './lotlist.module.css';
import { Header, Footer } from '@/layout';
import { Loader, LotCard } from '@/components';
import Select from 'react-select';
import {
  categoryOptions,
  priceOptions,
  noveltyOptions,
  relevanceOptions,
  selectStyles,
} from '@/utils/constants/select';
import { getAuctionList } from '@/http/auctionAPI';
import { useSortLotList } from '@/utils/hooks/useSortLotList';

const index = () => {
  const [lotCardsData, setLotCardsData] = useState([]);
  const itemsPerPage = 9; // Количество элементов на странице
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [visibleLotCardsData, setVisibleLotCardsData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [sortByPriceValue, setSortByPriceValue] = useState(null);
  const [sortByNoveltyValue, setSortByNoveltyValue] = useState(null);

  const sortedLotList = useSortLotList(
    lotCardsData,
    sortByPriceValue ? sortByPriceValue.value : null,
    sortByNoveltyValue ? sortByNoveltyValue.value : null
  );

  useEffect(() => {
    getAuctionList()
      .then((response) => {
        setLotCardsData(response.data);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      })
      .catch()
      .finally(setLoading(false));
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newVisibleLotCardsData = sortedLotList.slice(startIndex, endIndex);

    setVisibleLotCardsData(newVisibleLotCardsData);
  }, [currentPage, sortedLotList]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    // Здесь можно добавить логику для загрузки данных по выбранной странице
  };

  const renderPages = () => {
    const pages = [];
    const visiblePages = 3; // Всегда рендерим 3 страницы
    const halfVisible = Math.floor(visiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage + 1 < visiblePages) {
      // Корректировка начальной страницы, если не хватает видимых страниц
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <span
          key={i}
          className={`${styles.page} ${currentPage === i && styles.curPage} ${
            styles.pageButton
          }`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </span>
      );
    }

    return pages;
  };

  const renderPagination = () => {
    return (
      <div className={styles.pageControls}>
        <span
          className={`${styles.pagePrev} ${
            currentPage === 1 && styles.disabled
          }`}
          onClick={() =>
            currentPage !== 1 && handlePageClick(Math.max(1, currentPage - 1))
          }
        ></span>
        {renderPages()}
        <span
          className={`${styles.pageNext} ${
            currentPage === totalPages && styles.disabled
          }`}
          onClick={() =>
            currentPage !== totalPages &&
            handlePageClick(Math.min(totalPages, currentPage + 1))
          }
        ></span>
      </div>
    );
  };

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
                  styles={selectStyles}
                  isMulti
                />
              </div>
              <div className={styles.sortWrapper}>
                <label>Сортувати за</label>
                <div className={styles.selectWrapper}>
                  <Select
                    placeholder="Ціною"
                    options={priceOptions}
                    styles={selectStyles}
                    value={sortByPriceValue}
                    onChange={(selected) => {
                      setSortByPriceValue(selected);
                      setSortByNoveltyValue(null);
                    }}
                  />
                </div>
                <div className={styles.selectWrapper}>
                  <Select
                    placeholder="Новизною"
                    options={noveltyOptions}
                    styles={selectStyles}
                    value={sortByNoveltyValue}
                    onChange={(selected) => {
                      setSortByNoveltyValue(selected);
                      setSortByPriceValue(null);
                    }}
                  />
                </div>
                <div className={styles.selectWrapper}>
                  <Select
                    placeholder="Актуальністю"
                    options={relevanceOptions}
                    styles={selectStyles}
                  />
                </div>
              </div>
            </div>
            <div className={styles.lotList}>
              {loading ? (
                <Loader />
              ) : (
                visibleLotCardsData.map((lotCardData, i) => (
                  <LotCard
                    name={lotCardData.title}
                    endTime={lotCardData.endDate}
                    highestBid={lotCardData.currentPrice}
                    id={lotCardData.id}
                    pictures={lotCardData.pictures}
                    btnDisable={true}
                    key={`Lot ${i}`}
                  />
                ))
              )}
            </div>
            {renderPagination()}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default index;
