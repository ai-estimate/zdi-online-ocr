import {z1DataApi} from './Apis';
// import {getNextUrl} from './utils';

export const getServerSideUser = async (req: any, redirectTo: string) => {
  let authToken = req.cookies?.authToken ?? null;
  let user = null;
  if (authToken) {
    try {
      authToken = JSON.parse(authToken);
    } catch (err) {}
    const {data}: any = await z1DataApi.api.get('/api/users/me/', {
      headers: {
        Authorization: `Bearer ${authToken.access_token}`,
      },
    });
    user = data;
  }
  if (!user?.id && redirectTo) {
    return {
      redirect: {destination: redirectTo, permanent: false},
    };
  }
  return {props: {user}};
};
