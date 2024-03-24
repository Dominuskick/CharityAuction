import { useState, useEffect } from 'react';
import styles from './lotlist.module.css';
import { Loader, LotCard, PageStructure } from '@/components';
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

const LotList = () => {
  const [lotCardsData, setLotCardsData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(
    window.innerWidth > 1440 ? 9 : 4
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [visibleLotCardsData, setVisibleLotCardsData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [categoryNames, setCategoryNames] = useState([]);
  const [sortByPriceValue, setSortByPriceValue] = useState(null);
  const [sortByNoveltyValue, setSortByNoveltyValue] = useState(null);
  const [sortByActiveValue, setSortByActiveValue] = useState({
    value: 'Активні',
    label: 'Активні',
  });

  const sortedLotList = useSortLotList(
    lotCardsData,
    categoryNames,
    sortByPriceValue ? sortByPriceValue.value : null,
    sortByNoveltyValue ? sortByNoveltyValue.value : null,
    sortByActiveValue ? sortByActiveValue.value : null
  );

  useEffect(() => {
    getAuctionList()
      .then((response) => {
        setLotCardsData(response.data);
      })
      .catch()
      .finally(setLoading(false));
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newVisibleLotCardsData = sortedLotList.slice(startIndex, endIndex);

    setVisibleLotCardsData(newVisibleLotCardsData);
  }, [currentPage, sortedLotList, itemsPerPage]);

  useEffect(() => {
    setTotalPages(Math.ceil(sortedLotList.length / itemsPerPage));
    setCurrentPage(1);
  }, [sortedLotList, itemsPerPage]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
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
            currentPage >= totalPages && styles.disabled
          }`}
          onClick={() =>
            currentPage !== totalPages &&
            handlePageClick(Math.min(totalPages, currentPage + 1))
          }
        ></span>
      </div>
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth > 1440) {
      setItemsPerPage(9);
    } else {
      setItemsPerPage(4);
    }
  }, [windowWidth]);

  return (
    <PageStructure alignItemsCenter>
      <h2 className={styles.header}>Актуальні лоти</h2>
      <div className={styles.filters}>
        <div className={styles.selectWrapper}>
          <Select
            placeholder="Категорія"
            options={categoryOptions}
            styles={selectStyles}
            value={categoryNames}
            onChange={(selected) => {
              setCategoryNames(selected);
            }}
            isMulti
            inputProps={{ readOnly: true }}
            isSearchable={false}
          />
        </div>
        <div className={styles.sortWrapper}>
          <label>Сортувати за</label>
          <div className={styles.selectListWrapper}>
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
                inputProps={{ readOnly: true }}
                isSearchable={false}
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
                inputProps={{ readOnly: true }}
                isSearchable={false}
              />
            </div>
            <div className={styles.selectWrapper}>
              <Select
                placeholder="Актуальністю"
                options={relevanceOptions}
                styles={selectStyles}
                value={sortByActiveValue}
                onChange={(selected) => {
                  setSortByActiveValue(selected);
                  setSortByPriceValue(null);
                  setSortByNoveltyValue(null);
                }}
                inputProps={{ readOnly: true }}
                isSearchable={false}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.lotList}>
        {loading ? (
          <div style={{ margin: '0 auto' }}>
            <Loader />
          </div>
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
    </PageStructure>
  );
};

export default LotList;
