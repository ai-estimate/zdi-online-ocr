import {createContext} from 'react';

export interface ICarouselMessage {
  actionBtn?: {
    label: string;
    action: (onClose?: () => any) => void;
  };
  title?: string;
  index?: number;
  data?: any;
}
export interface ICarousel {
  message?: ICarouselMessage;
}

export interface ICarouselContext {
  show: (message: ICarouselMessage) => void;
}
export const CarouselContext = createContext<ICarouselContext>(
  {} as ICarouselContext,
);
