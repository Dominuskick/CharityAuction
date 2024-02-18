import {
  Account,
  AccountCreateLot,
  AccountLots,
  AccountEditLot,
  Home,
  LogIn,
  Registration,
  LotList,
  Lot,
  LotBets,
} from '@/pages';
import {
  ACCOUNT_ROUTE,
  ACCOUNT_CREATE_LOT_ROUTE,
  ACCOUNT_LOTS_ROUTE,
  ACCOUNT_EDIT_LOT_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  LOTS_ROUTE,
  LOT_ROUTE,
  LOT_BETS_ROUTE,
} from '@/utils/constants/routes';

export const authRoutes = [
  {
    path: ACCOUNT_ROUTE,
    component: Account,
  },
  {
    path: ACCOUNT_CREATE_LOT_ROUTE,
    component: AccountCreateLot,
  },
  {
    path: ACCOUNT_LOTS_ROUTE,
    component: AccountLots,
  },
  {
    path: ACCOUNT_EDIT_LOT_ROUTE,
    component: AccountEditLot,
  },
];

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    component: Home,
  },
  {
    path: LOGIN_ROUTE,
    component: LogIn,
  },
  {
    path: REGISTRATION_ROUTE,
    component: Registration,
  },
  {
    path: LOTS_ROUTE,
    component: LotList,
  },
  {
    path: LOT_ROUTE,
    component: Lot,
  },
  {
    path: LOT_BETS_ROUTE,
    component: LotBets,
  },
];
