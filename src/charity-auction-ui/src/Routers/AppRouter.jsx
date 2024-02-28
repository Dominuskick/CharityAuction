import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, authRoutes } from './routes';
import ScrollToTop from '@/utils/helpers/scrollToTop';
import { useSelector } from 'react-redux';
import { Error, Home } from '@/pages';

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
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}
