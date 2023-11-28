import {
  component$,
  QwikIntrinsicElements,
  Slot,
  useContext,
  useSignal,
} from '@builder.io/qwik';
import CarouselContextId from './carousel-context-id';
import { getContainerTranslateX } from './utils';

type CarouselViewportProps = QwikIntrinsicElements['div'];

export const CarouselView = component$((props: CarouselViewportProps) => {
  const context = useContext(CarouselContextId);
  const initialX = useSignal<number>(0);

  return (
    <div
      onPointerDown$={(e) => {
        initialX.value = e.clientX;

        console.log('Pointer down');
        context.isDraggingSig.value = true;
      }}
      window:onPointerMove$={(e) => {
        if (context.isDraggingSig.value) {
          if (!context.containerRef.value) {
            return;
          }

          context.slideOffsetSig.value = getContainerTranslateX(
            context.containerRef.value,
            e,
          );
        }
      }}
      ref={context.viewportRef}
      style={{ overflow: 'hidden', position: 'relative' }}
      onTransitionEnd$={() => (context.transitionDurationSig.value = 0)}
      {...props}
    >
      <Slot />
    </div>
  );
});
