import React from 'react';
import {NextSpellEditor} from '@views/NextSpell';
import {Layout} from '@components/Layout';

const NextSpell: React.FC = () => {
  return (
    <Layout sx={{borderBottom: '1px solid rgb(242, 244, 247)'}}>
      <NextSpellEditor />
    </Layout>
  );
};

export default NextSpell;
