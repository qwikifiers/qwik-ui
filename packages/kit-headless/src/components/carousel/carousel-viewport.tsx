import { component$, QwikIntrinsicElements, Slot, useContext } from '@builder.io/qwik';
import CarouselContextId from './carousel-context-id';

type CarouselViewportProps = QwikIntrinsicElements['div'];

export const CarouselViewport = component$((props: CarouselViewportProps) => {
  const context = useContext(CarouselContextId);

  return (
    <div ref={context.viewportRef} style={{ overflow: 'hidden' }} {...props}>
      <Slot />
    </div>
  );
});
