import { useEffect } from 'react';
import './App.css';
import authService from './utils/api/authService';
import { useDispatch } from 'react-redux';
import { setLogin } from '@/slices/authSlice';
import AppRouter from './Routers/AppRouter';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshCookies = async () => {
      try {
        const response = await authService.refreshTokens();
        console.log('Refresh successful:', response.data);

        if (response) {
          dispatch(
            setLogin(response.data.userName || localStorage.getItem('login'))
          );
        }
      } catch (error) {
        console.error('Refresh failed:', error);
        dispatch(setLogin(undefined));
      }
    };

    refreshCookies();
  }, []);

  return (
    <div className="app">
      <AppRouter />
    </div>
  );
}

export default App;
