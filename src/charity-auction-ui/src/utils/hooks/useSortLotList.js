import { useMemo } from 'react';

export const useSortLotList = (
  lotCardsData,
  sortByPriceValue,
  sortByNoveltyValue
) => {
  return useMemo(() => {
    return sortLotList(lotCardsData, sortByPriceValue, sortByNoveltyValue);
  }, [lotCardsData, sortByPriceValue, sortByNoveltyValue]);
};

const sortLotList = (lotCardsData, sortByPriceValue, sortByNoveltyValue) => {
  return sortByPriceValue
    ? sortByPrice(lotCardsData, sortByPriceValue)
    : sortByNoveltyValue
    ? sortByNovelty(lotCardsData, sortByNoveltyValue)
    : lotCardsData;
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
