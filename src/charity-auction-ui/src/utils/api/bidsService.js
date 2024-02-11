import { API_BASE_URL } from '../constants/backend';
import Cookies from 'js-cookie';

const bidsService = {
  getBids: async (lotId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/Bid/bids-auction?auctionId=${lotId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Get Bids failed');
      }
    } catch (error) {
      throw new Error(error.message || 'Get Bids failed');
    }
  },
  createBid: async (data) => {
    try {
      const accessToken = Cookies.get('accessToken');

      console.log(accessToken);

      const response = await fetch(`${API_BASE_URL}/Bid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        const error = await response.json();
        // console.error('Error during auction creation:', error);
        throw new Error(error.message || 'Create Bid failed');
      }
    } catch (error) {
      // console.error('Error during auction creation:', error);
      throw new Error(error.message || 'Create Bid failed');
    }
  },
  getUserBids: async () => {
    try {
      const accessToken = Cookies.get('accessToken');

      const response = await fetch(`${API_BASE_URL}/Auction/auction-user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch user auctions');
      }
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user auctions');
    }
  },
};

export default bidsService;
