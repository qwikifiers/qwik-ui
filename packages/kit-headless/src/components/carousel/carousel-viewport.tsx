import {
  component$,
  QwikIntrinsicElements,
  Slot,
  useContext,
  useSignal,
  useVisibleTask$,
  $,
} from '@builder.io/qwik';
import CarouselContextId from './carousel-context-id';

type CarouselViewportProps = QwikIntrinsicElements['div'];

export const CarouselView = component$((props: CarouselViewportProps) => {
  const context = useContext(CarouselContextId);
  const initialX = useSignal<number>(0);
  const viewContainerSig = useSignal<number | undefined>(0);
  const deltaXSig = useSignal<number>(0);
  const totalXSig = useSignal<number>(0);

  const handlePointerMove$ = $((event: MouseEvent) => {
    if (viewContainerSig.value) {
      totalXSig.value = event.clientX - viewContainerSig.value;

      // GE
      if (context.containerRef.value) {
        const style = window.getComputedStyle(context.containerRef.value);
        const matrix = new DOMMatrix(style.transform);
        context.containerRef.value.style.transform = `translate3d(${
          matrix.m41 + event.movementX
        }px, 0px, 0px)`;
      }
      // End GE

      // if (context.containerRef.value) {
      //   context.containerRef.value.style.transform = `translate3d(${totalXSig.value}px, 0px, 0px)`;
      // }
    }
  });

  const handlePointerUp$ = $((e: MouseEvent) => {
    console.log(`I'm inside pointer up!`);

    deltaXSig.value = e.clientX;
    console.log('delta X: ', e.clientX);

    window.removeEventListener('pointermove', handlePointerMove$);
  });

  useVisibleTask$(() => {
    viewContainerSig.value = context.viewportRef.value?.getBoundingClientRect().x;
  });

  return (
    <div
      onPointerDown$={(e) => {
        initialX.value = e.clientX;

        window.addEventListener('pointermove', handlePointerMove$);

        window.addEventListener('pointerup', handlePointerUp$);
      }}
      onPointerUp$={(e) => {
        console.log('pointer up: ', e);

        window.removeEventListener('pointermove', handlePointerMove$);
      }}
      ref={context.viewportRef}
      style={{ overflow: 'hidden' }}
      {...props}
    >
      <Slot />
    </div>
  );
});
