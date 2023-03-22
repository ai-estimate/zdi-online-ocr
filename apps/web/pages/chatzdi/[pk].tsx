import React from 'react';
import dynamic from 'next/dynamic';

const ZDIChatApp = dynamic(() => import('@zdi/chatpad'), {ssr: false});

const ChatApp: React.FC = () => {
  return (
    <ZDIChatApp>
      <div>Chat App</div>
    </ZDIChatApp>
  );
};

export default ChatApp;
