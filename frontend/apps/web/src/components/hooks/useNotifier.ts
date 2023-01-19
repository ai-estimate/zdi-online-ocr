import { StatusEnum } from './../components/Messages/index';
import {IMessage} from 'components/Messages';
import {IMessageContext, MessageContext} from 'components/Messages';
import {useContext} from 'react';

export type UseNotifierResult = IMessageContext;
export {StatusEnum}

function useNotifier(): UseNotifierResult {
  const notificationContext = useContext(MessageContext);

  const notify = (options: IMessage) => {
    const timeout = options.status === 'error' ? 8000 : options.autohide;
    notificationContext.show(options, timeout);
  };
  return notify;
}
export default useNotifier;
