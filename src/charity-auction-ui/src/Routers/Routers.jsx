import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Home, About, Error } from '@/pages';

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default Routers;
