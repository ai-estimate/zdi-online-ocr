import LayoutAuth from '@/src/components/LayoutAuth';
import ResetPassword from '@/src/views/Auth/ResetPassword';
import Head from 'next/head';

const Index = () => {
  return (
    <>
      <Head>
        <title>Change Password</title>
      </Head>
      <LayoutAuth noHeader>
        <div className="pt-4 flex flex-1">
          <ResetPassword />
        </div>
      </LayoutAuth>
    </>
  );
};

export default Index;
