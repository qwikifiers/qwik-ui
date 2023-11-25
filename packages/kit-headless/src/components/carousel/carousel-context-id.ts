import { createContextId } from '@builder.io/qwik';
import { CarouselContext } from './carousel-context.type';

const CarouselContextId = createContextId<CarouselContext>('carousel-context');

export default CarouselContextId;
