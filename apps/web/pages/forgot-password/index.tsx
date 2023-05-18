import LayoutAuth from '@/src/components/LayoutAuth';
import dynamic from 'next/dynamic';
import Head from 'next/head';
const ForgotPassword = dynamic(
  () =>
    import('@views/Auth/ForgotPassword').then(
      ({ForgotPassword}) => ForgotPassword,
    ),
  {
    ssr: false,
  },
);

const ForgotPasswordPage = () => {
  return (
    <>
      <Head>
        <title>Change Password</title>
      </Head>
      <LayoutAuth noHeader>
        <ForgotPassword />
      </LayoutAuth>
    </>
  );
};

export default ForgotPasswordPage;
