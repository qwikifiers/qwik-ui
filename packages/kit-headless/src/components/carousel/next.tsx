import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import { carouselContextId } from './context';
import { VisuallyHidden } from '../../utils/visually-hidden';

export const CarouselNext = component$((props: PropsOf<'button'>) => {
  const context = useContext(carouselContextId);

  return (
    <button
      {...props}
      aria-disabled={context.currentIndexSig.value + 1 === context.numSlidesSig.value}
      disabled={context.currentIndexSig.value + 1 === context.numSlidesSig.value}
      onClick$={() => {
        context.currentIndexSig.value++;
        console.log(context.currentIndexSig.value);
      }}
      data-qui-carousel-next
    >
      <VisuallyHidden>next slide</VisuallyHidden>
      <Slot />
    </button>
  );
});
