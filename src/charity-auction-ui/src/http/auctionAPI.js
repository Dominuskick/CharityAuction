import { $host, $authHost } from '.';

export const getAuctionList = async () => {
  const { data } = await $host.get('/Auction');
  return data;
};

export const getAuctionById = async (auctionId) => {
  const { data } = await $host.get(`/Auction/${auctionId}`);
  return data;
};

export const getUserAuctionList = async () => {
  const { data } = await $authHost.get('/Auction/auction-user');
  return data;
};

export const createAuction = async (formData) => {
  const { data } = await $authHost.post('/Auction', formData);
  return data;
};

export const deleteAuction = async (auctionId) => {
  const { data } = await $authHost.delete(`/Auction/${auctionId}`);
  return data;
};

export const editAuction = async (formData) => {
  const { data } = await $authHost.put('/Auction', formData);
  return data;
};