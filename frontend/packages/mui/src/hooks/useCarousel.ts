import {useContext} from 'react';
import {ICarouselContext, CarouselContext} from '../components';

export type UseCorouselResult = ICarouselContext;

export const useCarousel = () => useContext(CarouselContext);
