import LayoutAuth from '@/src/components/LayoutAuth';
import {Layout} from '@components/Layout';

import dynamic from 'next/dynamic';
const Plan = dynamic(() => import('@views/Plan').then(({Plan}) => Plan), {
  ssr: false,
});

const PlanPage = () => {
  return (
    <LayoutAuth>
      <Layout>
        <Plan />
      </Layout>
    </LayoutAuth>
  );
};

export default PlanPage;
