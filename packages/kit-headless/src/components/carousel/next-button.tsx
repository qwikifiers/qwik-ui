import { Slot, component$, useContext } from '@builder.io/qwik';
import { type CarouselButtonProps } from './types';
import CarouselContextId from './carousel-context-id';
import { VisuallyHidden } from '../../utils/visually-hidden';

export const HCarouselNext = component$((props: CarouselButtonProps) => {
  const context = useContext(CarouselContextId);

  return (
    <button
      {...props}
      aria-disabled={context.currentIndexSig.value + 1 === context.numSlidesSig.value}
      disabled={context.currentIndexSig.value + 1 === context.numSlidesSig.value}
      onClick$={() => {
        context.currentIndexSig.value++;

        context.transitionDurationSig.value = 625;
      }}
      data-qui-carousel-next
    >
      <VisuallyHidden>next slide</VisuallyHidden>
      <Slot />
    </button>
  );
});
