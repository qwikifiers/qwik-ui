import { Slot, component$, useContext } from '@builder.io/qwik';
import { type CarouselButtonProps } from './types';
import CarouselContextId from './carousel-context-id';
import { VisuallyHidden } from '../../utils/visually-hidden';

export const CarouselPrev = component$((props: CarouselButtonProps) => {
  const context = useContext(CarouselContextId);
  return (
    <button
      {...props}
      aria-disabled={context.currentIndexSig.value === 0}
      disabled={context.currentIndexSig.value === 0}
      onClick$={() => {
        context.currentIndexSig.value--;
        context.transitionDurationSig.value = 625;
      }}
    >
      <VisuallyHidden>previous slide</VisuallyHidden>
      <Slot />
    </button>
  );
});
