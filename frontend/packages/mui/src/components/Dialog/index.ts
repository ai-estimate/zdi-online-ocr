import {createContext} from 'react';

interface ISubmit {
  loading: boolean;
}
export enum IconTypeEnum {
  DANGER = 'danger',
  INFO = 'info',
  WARNING = 'warning',
}
export interface IMessage {
  actionBtn?: {
    cancel?: string;
    label: string;
    action: (
      onClose?: () => any,
      updateSubmit?: (p: ISubmit) => any,
      commend?: string,
    ) => void;
  };
  actionIcon?: IconTypeEnum.DANGER | IconTypeEnum.INFO | IconTypeEnum.WARNING;
  title?: string;
  type?: 'custom' | 'primary' | '';
  showComment?: boolean;
  text: React.ReactNode;
  autoHeight?: boolean;
}
export interface IDialog {
  message?: IMessage;
}

export interface IDialogContext {
  confirm: (message: IMessage) => void;
  alert: (message: IMessage) => void;
}
export const DialogContext = createContext<IDialogContext>(
  {} as IDialogContext,
);

export {default as DialogProvider} from './DialogProvider';
