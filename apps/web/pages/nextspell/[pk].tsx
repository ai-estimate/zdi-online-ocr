import React from 'react';
import {NextSpellEditor} from '@views/NextSpell';
import {Layout} from '@components/Layout';

const NextSpell: React.FC = () => {
  return (
    <Layout>
      <NextSpellEditor />
    </Layout>
  );
};

export default NextSpell;
