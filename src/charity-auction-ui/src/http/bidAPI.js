import { $host, $authHost } from '.';

export const getAuctionBidsById = async (auctionId) => {
  const { data } = await $host.get(`/Bid/bids-auction?auctionId=${auctionId}`);
  return data;
};

export const createBid = async (amount, auctionId) => {
  const { data } = await $authHost.post('/Bid', { amount, auctionId });
  return data;
};
