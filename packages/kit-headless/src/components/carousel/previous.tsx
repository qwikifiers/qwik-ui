import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import { carouselContextId } from './context';
import { VisuallyHidden } from '../../utils/visually-hidden';

export const CarouselPrevious = component$((props: PropsOf<'button'>) => {
  const context = useContext(carouselContextId);
  return (
    <button
      {...props}
      aria-disabled={context.currentIndexSig.value === 0}
      disabled={context.currentIndexSig.value === 0}
      onClick$={() => {
        context.currentIndexSig.value--;
      }}
      data-qui-carousel-prev
    >
      <VisuallyHidden>previous slide</VisuallyHidden>
      <Slot />
    </button>
  );
});
