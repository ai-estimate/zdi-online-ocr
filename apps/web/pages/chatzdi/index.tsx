import React from 'react';
import {Layout} from '@components/Layout';
import dynamic from 'next/dynamic';
const ZDIChatApp = dynamic(() => import('@zdi/chatpad'), {ssr: false});

const ChatApp: React.FC = () => {
  return (
    <Layout branch="ZDI Chat">
      <ZDIChatApp>
        <div>Chat App</div>
      </ZDIChatApp>
    </Layout>
  );
};

export default ChatApp;
