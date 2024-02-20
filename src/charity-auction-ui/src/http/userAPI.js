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
