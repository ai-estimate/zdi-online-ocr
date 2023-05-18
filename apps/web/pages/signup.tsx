import LayoutAuth from '@/src/components/LayoutAuth';
import dynamic from 'next/dynamic';
import Head from 'next/head';
const Signup = dynamic(
  () => import('@views/Auth/Signup').then(({Signup}) => Signup),
  {
    ssr: false,
  },
);

const SignupPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <LayoutAuth noHeader>
        <Signup />
      </LayoutAuth>
    </>
  );
};

export default SignupPage;
