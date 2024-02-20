import { jwtDecode } from 'jwt-decode';
import { $host, $authHost } from '.';

export const registration = async (
  email,
  password,
  fullName,
  phoneNumber,
  userName
) => {
  const { data } = await $host.post('/Auth/register', {
    email,
    password,
    fullName,
    phoneNumber,
    userName,
  });

  return data;
};

export const login = async (email, password) => {
  const { data } = await $host.post(
    '/Auth/login',
    {
      email,
      password,
    },
    { withCredentials: true }
  );

  localStorage.setItem('BetOnGoodness-token', data.data.token);

  return data;
};

export const refreshTokens = async () => {
  const { data } = await $host.post(
    '/Auth/refresh',
    {},
    { withCredentials: true }
  );

  localStorage.setItem('BetOnGoodness-token', data.data.token);

  return jwtDecode(data.data.token);
};
