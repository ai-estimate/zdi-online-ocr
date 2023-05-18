import React from 'react';

export const AuthContext = React.createContext({
  isAuthenticated: false,
  user: null,
  loading: true,
  setAuthToken: (token: any) => {},
  logout: () => {},
  refreshUser: () => any,
});
