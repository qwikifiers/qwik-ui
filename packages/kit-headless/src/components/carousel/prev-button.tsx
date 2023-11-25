import { Slot, component$, useContext } from '@builder.io/qwik';
import { CarouselButtonProps } from './types';
import CarouselContextId from './carousel-context-id';
import { VisuallyHidden } from '../../utils/visually-hidden';

export const CarouselPrev = component$((props: CarouselButtonProps) => {
  const context = useContext(CarouselContextId);
  return (
    <button
      {...props}
      aria-disabled={context.currentSlideSig.value === 1}
      disabled={context.currentSlideSig.value === 1}
      onClick$={() => {
        context.currentSlideSig.value--;
        const currIndex = context.currentSlideSig.value - 1;

        const prevSlideElement = context.allSlideRefs.value[currIndex];

        context.slideOffsetSig.value = prevSlideElement.offsetLeft * -1;

        context.transitionDurationSig.value = 625;
      }}
    >
      <VisuallyHidden>previous slide</VisuallyHidden>
      <Slot />
    </button>
  );
});
