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
  createAuction: async (formData) => {
    try {
      const accessToken = Cookies.get('accessToken');

      console.log(accessToken);

      const response = await fetch(`${API_BASE_URL}/Auction`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
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
  editAuction: async (id, formData) => {
    try {
      const accessToken = Cookies.get('accessToken');

      console.log(accessToken);

      const response = await fetch(`${API_BASE_URL}/Auction`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        const error = await response.json();
        // console.error('Error during auction creation:', error);
        throw new Error(error.message || 'Edit Auction failed');
      }
    } catch (error) {
      // console.error('Error during auction creation:', error);
      throw new Error(error.message || 'Edit Auction failed');
    }
  },
  getUserAuctions: async () => {
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
  deleteAuctionById: async (auctionId) => {
    try {
      const refresh = await authService.refreshTokens();
      if (!refresh) {
        throw new Error('Refresh tokens failed');
      }

      const accessToken = refresh.data.token;

      const response = await fetch(`${API_BASE_URL}/Auction/${auctionId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        // Успешное удаление
        return { success: true };
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete auction');
      }
    } catch (error) {
      throw new Error(error.message || 'Failed to delete auction');
    }
  },
};

export default auctionService;
