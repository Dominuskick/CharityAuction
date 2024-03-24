import { useMemo } from 'react';

export const useSortLotList = (
  lotCardsData,
  categoryNames,
  sortByPriceValue,
  sortByNoveltyValue,
  sortByActiveValue
) => {
  return useMemo(() => {
    return sortAndFilterLotList(
      lotCardsData,
      categoryNames,
      sortByPriceValue,
      sortByNoveltyValue,
      sortByActiveValue
    );
  }, [
    lotCardsData,
    categoryNames,
    sortByPriceValue,
    sortByNoveltyValue,
    sortByActiveValue,
  ]);
};

const sortAndFilterLotList = (
  lotCardsData,
  categoryNames,
  sortByPriceValue,
  sortByNoveltyValue,
  sortByActiveValue
) => {
  const filterByActiveLotCardsData = sortByActiveValue
    ? filterByActive(lotCardsData, sortByActiveValue)
    : lotCardsData;

  const filteredLotCardsData =
    categoryNames.length == 0
      ? filterByActiveLotCardsData
      : filterByCategory(filterByActiveLotCardsData, categoryNames);

  return sortByPriceValue
    ? sortByPrice(filteredLotCardsData, sortByPriceValue)
    : sortByNoveltyValue
    ? sortByNovelty(filteredLotCardsData, sortByNoveltyValue)
    : filteredLotCardsData;
};

const filterByCategory = (lotCardsData, categoryNames) => {
  const categoryNamesValues = categoryNames.map((el) => el.value);

  return lotCardsData.filter((cardData) => {
    return cardData.categoryNames.some((category) =>
      categoryNamesValues.includes(category)
    );
  });
};

export const filterByActive = (lotCardsData, sortByActiveValue = 'Активні') => {
  const currentDate = new Date(); // Текущая дата

  return lotCardsData.filter((cardData) => {
    const endDate = new Date(cardData.endDate); // Преобразовываем строку endDate в объект Date

    if (sortByActiveValue === 'Активні') {
      return endDate > currentDate;
    } else if (sortByActiveValue === 'Продані') {
      return endDate <= currentDate;
    } else {
      return false;
    }
  });
};

const sortByPrice = (lotCardsData, sortByPriceValue) => {
  return lotCardsData.slice().sort((a, b) => {
    return sortByPriceValue === 'В порядку зростання'
      ? a.currentPrice - b.currentPrice
      : sortByPriceValue === 'В порядку спадання'
      ? b.currentPrice - a.currentPrice
      : 0;
  });
};

const sortByNovelty = (lotCardsData, sortByNoveltyValue) => {
  return lotCardsData.slice().sort((a, b) => {
    return sortByNoveltyValue === 'Від більш нових'
      ? new Date(b.startDate) - new Date(a.startDate)
      : sortByNoveltyValue === 'Від більш старих'
      ? new Date(a.startDate) - new Date(b.startDate)
      : 0;
  });
};
