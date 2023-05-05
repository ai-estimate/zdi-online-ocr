import dynamic from 'next/dynamic';
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
  return <ForgotPassword />;
};

export default ForgotPasswordPage;
