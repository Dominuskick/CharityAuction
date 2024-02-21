import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { setLogin } from '@/slices/authSlice';
import AppRouter from './Routers/AppRouter';
import { refreshTokens } from './http/userAPI';
import { RotatingLines } from 'react-loader-spinner';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [animationEnd, setAnimationEnd] = useState(false);

  useEffect(() => {
    refreshTokens()
      .then((data) => {
        dispatch(setLogin(data.UserName));
      })
      .catch()
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app">
      {!animationEnd && (
        <div
          className={`loader-wrapper ${!loading && 'disappear'}`}
          onAnimationEnd={() => setAnimationEnd(true)}
        >
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            strokeColor="#fff"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      )}
      {!loading && <AppRouter />}
    </div>
  );
}

export default App;
