import { API_BASE_URL } from '../constants/backend';
import Cookies from 'js-cookie';
import authService from './authService';

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
  getAuction: async (lotId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Auction/${lotId}`, {
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
        throw new Error(error.message || 'Get Lot failed');
      }
    } catch (error) {
      throw new Error(error.message || 'Get Lot failed');
    }
  },
  createAuction: async (auctionData) => {
    try {
      const refresh = await authService.refreshTokens();
      if (!refresh) {
        throw new Error(error.message || 'Refresh tokens failed');
      }

      const accessToken = refresh.data.token;

      console.log(accessToken);

      const response = await fetch(`${API_BASE_URL}/Auction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(auctionData),
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        const error = await response.json();
        // console.error('Error during auction creation:', error);
        throw new Error(error.message || 'Create Auction failed');
      }
    } catch (error) {
      // console.error('Error during auction creation:', error);
      throw new Error(error.message || 'Create Auction failed');
    }
  },
};

export default auctionService;
