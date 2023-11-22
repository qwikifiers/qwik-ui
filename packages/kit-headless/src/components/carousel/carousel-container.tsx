import { component$, QwikIntrinsicElements, Slot, useContext } from '@builder.io/qwik';
import CarouselContextId from './carousel-context-id';
// import { handlePointerMove } from './utils';

type CarouselContainerProps = QwikIntrinsicElements['div'];

export const CarouselContainer = component$((props: CarouselContainerProps) => {
  const context = useContext(CarouselContextId);

  return (
    <div
      ref={context.containerRef}
      style={{ transform: `translate3d(${context.slideOffset.value}px, 0px, 0px)` }}
      {...props}
    >
      <Slot />
    </div>
  );
});
