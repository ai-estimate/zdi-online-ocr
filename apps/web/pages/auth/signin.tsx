import dynamic from 'next/dynamic';
const Signin = dynamic(
  () => import('@views/Auth/Signin').then(({Signin}) => Signin),
  {
    ssr: false,
  },
);

const SigninPage = () => {
  return <Signin />;
};

export default SigninPage;
