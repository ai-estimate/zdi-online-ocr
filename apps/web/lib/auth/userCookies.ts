import cookies from 'js-cookie';

export const getUserFromCookie = () => {
  const cookie = cookies.get('auth');
  if (!cookie) {
    return;
  }
  return JSON.parse(cookie);
};

export const setUserCookie = (user: any) => {
  cookies.set('auth', JSON.stringify(user), {
    expires: 30000,
  });
};

export const setUserToken = (token: any = {}) => {
  cookies.set('authToken', JSON.stringify(token));
};

export const getToken = () => {
  const cookie = cookies.get('authToken');
  if (!cookie) {
    return;
  }
  try {
    return JSON.parse(cookie).access_token;
  } catch (err) {
    return null;
  }
};

export const removeUserCookie = () => {
  cookies.remove('auth');
  cookies.remove('authToken');
};
