import { Slot, component$ } from '@builder.io/qwik';
import { CarouselButtonProps } from './types';

export const CarouselPrev = component$((props: CarouselButtonProps) => {
  return (
    <button {...props}>
      <Slot />
    </button>
  );
});

/*

nextButton.tsx and prevButton.tsx: These components represent the buttons for navigating to the next and previous slides. They should receive a callback prop from the Carousel component to update the current slide state.

*/
