import React from 'react';
import {NextSpellEditor} from '@views/NextSpell';
import LayoutAuth from '@components/LayoutAuth';
import {Layout} from '@components/Layout';

const NextSpell: React.FC = () => {
  return (
    <LayoutAuth>
      <Layout sx={{borderBottom: '1px solid rgb(242, 244, 247)'}}>
        <NextSpellEditor />
      </Layout>
    </LayoutAuth>
  );
};

export default NextSpell;
