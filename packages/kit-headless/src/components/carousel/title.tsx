import { component$, PropsOf, Slot, useContext } from '@builder.io/qwik';
import { carouselContextId } from './context';

/** Used to distinguish accessible label from other carousels */
export const CarouselTitle = component$<PropsOf<'div'>>(() => {
  const context = useContext(carouselContextId);
  const titleId = `${context.localId}-title`;

  return (
    <div id={titleId}>
      <Slot />
    </div>
  );
});
