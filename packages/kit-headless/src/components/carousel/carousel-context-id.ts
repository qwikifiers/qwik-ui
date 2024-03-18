import { createContextId } from '@builder.io/qwik';
import { type CarouselContext } from './carousel-context.type';

const CarouselContextId = createContextId<CarouselContext>('carousel-context');

export default CarouselContextId;
