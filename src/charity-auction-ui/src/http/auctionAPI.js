import { $host, $authHost } from '.';

export const getAuctionList = async () => {
  const { data } = await $host.get('/Auction');
  return data;
};

export const getAuctionById = async (auctionId) => {
  const { data } = await $host.get(`/Auction/${auctionId}`);
  return data;
};
