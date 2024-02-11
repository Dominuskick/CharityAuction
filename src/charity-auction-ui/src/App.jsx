import { useEffect } from 'react';
import Routers from './Routers/Routers';
import './App.css';
import authService from './utils/api/authService';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '@/slices/authSlice';

function App() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.auth.login);

  useEffect(() => {
    const refreshCookies = async () => {
      try {
        const response = await authService.refreshTokens();
        console.log('Refresh successful:', response.data);

        if (response) {
          dispatch(setLogin(localStorage.getItem('login') || null));
        }
      } catch (error) {
        console.error('Refresh failed:', error);
      }
    };

    refreshCookies();
  }, []);

  return (
    <div className="app">
      <Routers />
    </div>
  );
}

export default App;
