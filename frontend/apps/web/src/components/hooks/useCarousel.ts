import {useContext} from 'react';
import {ICarouselContext, CarouselContext} from 'components/Carousel';

export type UseCorouselResult = ICarouselContext;

const usesCarousel = () => useContext(CarouselContext);

export default usesCarousel;
