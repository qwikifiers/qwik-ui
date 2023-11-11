import { createContextId } from '@builder.io/qwik';
import { CarouselContext } from './carousel-context.type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CarouselContextId = createContextId<CarouselContext>('carousel-context');

export default CarouselContextId;
