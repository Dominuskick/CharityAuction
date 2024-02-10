import { API_BASE_URL } from '../constants/backend';

const authService = {
  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }
    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    }
  },

  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include', // Включаем передачу куки
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  },
};

export default authService;
