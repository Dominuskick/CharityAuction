import { $host, $authHost } from '.';

export const registration = async (
  email,
  password,
  fullName,
  phoneNumber,
  userName
) => {
  const response = await $host.post('/Auth/register', {
    email,
    password,
    fullName,
    phoneNumber,
    userName,
  });

  return response;
};

export const login = async (email, password) => {
  const response = await $host.post(
    '/Auth/login',
    {
      email,
      password,
    },
    { withCredentials: true }
  );

  return response;
};
