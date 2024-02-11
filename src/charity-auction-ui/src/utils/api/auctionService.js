import { API_BASE_URL } from '../constants/backend';

const auctionService = {
  getAuctionList: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/Auction`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Get Auctions failed');
      }
    } catch (error) {
      throw new Error(error.message || 'Get Auctions failed');
    }
  },
};

export default auctionService;
