import { HOME_ROUTE } from '@/utils/constants/routes';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { publicRoutes, authRoutes } from './routes';
import ScrollToTop from '@/utils/helpers/scrollToTop';
import { useSelector } from 'react-redux';

export default function AppRouter() {
  const isAuth = useSelector((state) => state.auth.login);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {isAuth &&
          authRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        {publicRoutes.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<Navigate to={HOME_ROUTE} />} />
      </Routes>
    </Router>
  );
}
