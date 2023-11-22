import { Slot, component$, useContext, useTask$ } from '@builder.io/qwik';
import { CarouselButtonProps } from './types';
import CarouselContextId from './carousel-context-id';

export const CarouselNext = component$((props: CarouselButtonProps) => {
  const context = useContext(CarouselContextId);

  useTask$(({ track }) => {
    track(() => context.totalSlidesSig.value);
    track(() => context.currentSlideSig.value);
    track(() => context.slideOffset.value);

    console.log('current slide: ', context.currentSlideSig.value);
    console.log('total slide', context.totalSlidesSig.value);
    console.log('slide offset: ', context.slideOffset.value);
  });

  return (
    <button
      {...props}
      style={
        context.currentSlideSig.value === context.totalSlidesSig.value
          ? { background: 'rgba(51, 65, 85, .35)' }
          : ''
      }
      onClick$={() => {
        context.currentSlideSig.value++;
        console.log('INSIDE ONCLICK$: ', context.currentSlideSig.value);

        const nextSlideElement =
          context.slidesArraySig.value[context.currentSlideSig.value - 1];

        console.log(nextSlideElement);
      }}
    >
      <Slot />
    </button>
  );
});

/*

nextButton.tsx and prevButton.tsx: These components represent the buttons for navigating to the next and previous slides. They should receive a callback prop from the Carousel component to update the current slide state.

*/
