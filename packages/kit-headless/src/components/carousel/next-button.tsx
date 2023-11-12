import { Slot, component$, useContext } from '@builder.io/qwik';
import { CarouselButtonProps } from './types';
import CarouselContextId from './carousel-context-id';

export const CarouselNext = component$((props: CarouselButtonProps) => {
  const context = useContext(CarouselContextId);

  return (
    <button {...props} onClick$={() => context.currentSlideSig.value++}>
      <Slot />
    </button>
  );
});

/*

nextButton.tsx and prevButton.tsx: These components represent the buttons for navigating to the next and previous slides. They should receive a callback prop from the Carousel component to update the current slide state.

*/
