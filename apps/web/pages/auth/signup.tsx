import {Layout} from '@components/Layout';
import dynamic from 'next/dynamic';
const Signup = dynamic(
  () => import('@views/Auth/Signup').then(({Signup}) => Signup),
  {
    ssr: false,
  },
);

const SignupPage = () => {
  return <Signup />;
};

export default SignupPage;
