// import {IMessage} from 'components/Messages';
import {useContext} from 'react';
import {IDialogContext, DialogContext} from './../components/Dialog';

export {IconTypeEnum} from './../components/Dialog';
export type UseNotifierResult = IDialogContext;

export const useDialog = () => useContext(DialogContext);
