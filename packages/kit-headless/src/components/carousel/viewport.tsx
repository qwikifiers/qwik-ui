import { component$, type PropsOf, Slot, useContext } from '@builder.io/qwik';
import { carouselContextId } from './context';

type CarouselViewportProps = PropsOf<'div'>;

export const CarouselView = component$((props: CarouselViewportProps) => {
  const context = useContext(carouselContextId);

  return (
    <div ref={context.viewportRef} {...props}>
      <Slot />
    </div>
  );
});
