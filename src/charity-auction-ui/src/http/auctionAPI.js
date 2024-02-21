import { $host, $authHost } from '.';

export const getAuctionList = async () => {
  const { data } = await $host.get('/Auction');

  return data;
};

// export const login = async (email, password) => {
//   const { data } = await $host.post(
//     '/Auth/login',
//     {
//       email,
//       password,
//     },
//     { withCredentials: true }
//   );

//   localStorage.setItem('BetOnGoodness-token', data.data.token);

//   return data;
// };

// export const refreshTokens = async () => {
//   const { data } = await $authHost.post(
//     '/Auth/refresh',
//     {},
//     { withCredentials: true }
//   );

//   localStorage.setItem('BetOnGoodness-token', data.data.token);

//   return jwtDecode(data.data.token);
// };

// export const logout = async () => {
//   await $authHost.post('/Auth/logout', {}, { withCredentials: true });

//   localStorage.removeItem('BetOnGoodness-token');
// };
