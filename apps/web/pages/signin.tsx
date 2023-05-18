import LayoutAuth from '@/src/components/LayoutAuth';
import dynamic from 'next/dynamic';
import Head from 'next/head';
const Signin = dynamic(
  () => import('@views/Auth/Signin').then((Signin) => Signin),
  {
    ssr: false,
  },
);

const SigninPage = () => {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <LayoutAuth noHeader>
        <Signin />
      </LayoutAuth>
    </>
  );
};

export default SigninPage;
