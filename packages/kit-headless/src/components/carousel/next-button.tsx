import { Slot, component$, useContext, useTask$ } from '@builder.io/qwik';
import { CarouselButtonProps } from './types';
import CarouselContextId from './carousel-context-id';
import { VisuallyHidden } from '../../utils/visually-hidden';

export const CarouselNext = component$((props: CarouselButtonProps) => {
  const context = useContext(CarouselContextId);

  useTask$(({ track }) => {
    track(() => context.numSlidesSig.value);
    track(() => context.currentSlideSig.value);
    track(() => context.slideOffsetSig.value);

    console.log('total slide', context.numSlidesSig.value);
    console.log('slide offset: ', context.slideOffsetSig.value);
  });

  return (
    <button
      {...props}
      aria-disabled={context.currentSlideSig.value === context.allSlideRefs.value.length}
      disabled={context.currentSlideSig.value === context.allSlideRefs.value.length}
      onClick$={() => {
        context.currentSlideSig.value++;
        const currIndex = context.currentSlideSig.value - 1;

        const nextSlideElement = context.allSlideRefs.value[currIndex];

        context.slideOffsetSig.value = nextSlideElement.offsetLeft * -1;

        context.transitionDurationSig.value = 625;
      }}
    >
      <VisuallyHidden>next slide</VisuallyHidden>
      <Slot />
    </button>
  );
});
