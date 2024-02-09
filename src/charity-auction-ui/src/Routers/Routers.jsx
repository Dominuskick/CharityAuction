import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Home, Registration, Error, LogIn, Lot } from '@/pages';

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/lot" element={<Lot />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default Routers;
