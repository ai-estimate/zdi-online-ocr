import {Layout} from '@components/Layout';
import dynamic from 'next/dynamic';
const Plan = dynamic(() => import('@views/Plan').then(({Plan}) => Plan), {
  ssr: false,
});

const PlanPage = () => {
  return (
    <Layout>
      <Plan />
    </Layout>
  );
};

export default PlanPage;
