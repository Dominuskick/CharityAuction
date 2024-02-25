// auth routes:
export const ACCOUNT_ROUTE = '/account';
export const ACCOUNT_CREATE_LOT_ROUTE = '/account/createLot';
export const ACCOUNT_LOTS_ROUTE = '/account/lots';
export const ACCOUNT_EDIT_LOT_ROUTE = '/account/lots/:lotId/edit';

//auth not implemented routes
export const ACCOUNT_BETS_ROUTE = '/account/bets';
export const ACCOUNT_NOTIFICATIONS_ROUTE = '/account/notifications';

// public routes:
export const HOME_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const REGISTRATION_ROUTE = '/registration';
export const LOTS_ROUTE = '/lots';
export const LOT_ROUTE = '/lots/:lotId';
export const LOT_BETS_ROUTE = '/lots/:lotId/bets';
export const ERROR_ROUTE = '/error';

// anchors routes:
export const SCOPE_ID = 'scope';
export const SCOPE_ANCHOR = `/#${SCOPE_ID}`;
export const FAQ_ID = 'faq';
export const FAQ_ANCHOR = `/#${FAQ_ID}`;
