import { useEffect } from 'react';
import Routers from './Routers/Routers';
import './App.css';
import authService from './utils/api/authService';
import { useDispatch } from 'react-redux';
import { setLogin } from '@/slices/authSlice';
import AppRouter from './Routers/AppRouter';
import { authRoutes } from './Routers/routes';

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
      {/* <Routers /> */}
      <AppRouter />
    </div>
  );
}

export default App;
