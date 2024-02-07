import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useSearch = (searchQuery, data) => {
  const language = useSelector((state) => state.lang);
  return useMemo(
    () => search(searchQuery, data, language),
    [searchQuery, sectionData]
  );
};

const search = (searchQuery, data, language) => {
  const sortedData = data;
  return sortedData;
};
