import {useRouter} from 'next/router';
import {useContext, useEffect} from 'react';
import {AuthContext} from './AuthContext';
import {getNextUrl} from '../utils';

interface Props {
  unAuthenticated?: boolean;
}
const useUser = (props?: Props) => {
  const {unAuthenticated} = props || {};

  const router = useRouter();
  const {loading, user, logout, refreshUser, setAuthToken, isAuthenticated} =
    useContext(AuthContext);

  useEffect(() => {
    let _next: any = router?.query?._next;
    if (!loading) {
      if (isAuthenticated) {
        _next = getNextUrl(_next);
        unAuthenticated && router.replace(_next || '/home');
      }
      if (!isAuthenticated) {
        if (_next) {
          router.replace({pathname: `/signin`, query: {_next}});
        } else {
          router.replace('/signin');
        }
      }
    }
  }, [isAuthenticated, loading]);

  return {user, loading, setAuthToken, refreshUser, isAuthenticated, logout};
};

export {useUser};
