import React from 'react';
import useSWR, {mutate} from 'swr';
import {removeUserCookie, setUserToken} from './userCookies';
import {z1DataApi as z1DataAPI} from './../Apis';
import {AuthContext} from './AuthContext';
import {analytics} from './initFirebase';
import {setUserProperties, setUserId} from 'firebase/analytics';

const fetcher = async () => {
  const {data}: any = await z1DataAPI.currentUser();
  return data;
};

interface Props {
  children: React.ReactNode;
  user?: any;
}
const AuthProvider: React.FC<Props> = React.memo(({children, user}: Props) => {
  const {data, error} = useSWR('/users/me', fetcher);
  // console.log('AuthProvider:::: ', user, data);
  const loading = !data && !error;
  const isAuthenticated = !!data?.id;

  const setAuthToken = (authToken: Record<string, any>) => {
    setUserToken(authToken);
    mutate('/users/me');
  };

  const logout = async () => {
    try {
      await z1DataAPI.logout();
      console.log('logout click');
    } catch (err) {
      console.log('logout::: ', err);
    }
    removeUserCookie();
    mutate('/users/me');
  };

  const refreshUser = async () => {
    await mutate('/users/me');
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      setUserProperties(analytics, {
        id: data.id,
        username: data.name,
        company: data.company,
      });
      setUserId(analytics, data?.id);
    }
  }, [isAuthenticated, data]);

  return (
    <AuthContext.Provider
      value={{
        loading,
        setAuthToken,
        refreshUser,
        isAuthenticated,
        user: data,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
});

export default AuthProvider;
