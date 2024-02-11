import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import {
  Home,
  Registration,
  Error,
  LogIn,
  Lot,
  LotBets,
  LotList,
  Account,
  AccountCreateLot,
  AccountLots,
} from '@/pages';
import ScrollToTop from '@/utils/helpers/scrollToTop';

const Routers = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/lots" element={<LotList />} />
        <Route path="/lot/:lotId" element={<Lot />} />
        <Route path="/lot/bets" element={<LotBets />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/createLot" element={<AccountCreateLot />} />
        <Route path="/account/lots" element={<AccountLots />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default Routers;
