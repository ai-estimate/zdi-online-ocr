import {Layout} from '@components/Layout';
import dynamic from 'next/dynamic';
const Home = dynamic(() => import('@views/Home').then(({Home}) => Home), {
  ssr: false,
});

const IndexPage = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default IndexPage;
