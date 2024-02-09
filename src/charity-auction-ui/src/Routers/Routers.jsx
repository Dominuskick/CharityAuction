import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Home, Registration, Error } from '@/pages';

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default Routers;
