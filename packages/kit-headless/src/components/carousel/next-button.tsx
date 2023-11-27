import { Slot, component$, useContext } from '@builder.io/qwik';
import { CarouselButtonProps } from './types';
import CarouselContextId from './carousel-context-id';
import { VisuallyHidden } from '../../utils/visually-hidden';

export const CarouselNext = component$((props: CarouselButtonProps) => {
  const context = useContext(CarouselContextId);

  return (
    <button
      {...props}
      aria-disabled={
        context.currentIndexSig.value + 1 === context.allSlideRefs.value.length
      }
      disabled={context.currentIndexSig.value + 1 === context.allSlideRefs.value.length}
      onClick$={() => {
        context.currentIndexSig.value++;

        context.transitionDurationSig.value = 625;
      }}
    >
      <VisuallyHidden>next slide</VisuallyHidden>
      <Slot />
    </button>
  );
});
