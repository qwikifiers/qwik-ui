import {
  component$,
  QwikIntrinsicElements,
  Slot,
  useContext,
  $,
  useSignal,
} from '@builder.io/qwik';
import CarouselContextId from './carousel-context-id';
// import { handlePointerMove } from './utils';

type CarouselContainerProps = QwikIntrinsicElements['div'];

export const CarouselContainer = component$((props: CarouselContainerProps) => {
  const context = useContext(CarouselContextId);
  const viewportRefX = useSignal<number | undefined>(0);

  const handlePointerMove$ = $((event: MouseEvent) => {
    // console.log('pointer move: ', event);

    if (viewportRefX.value) {
      const clientX = event.clientX - viewportRefX.value;
      console.log(clientX);
    }
  });

  return (
    <div
      onPointerDown$={(e) => {
        console.log('pointer down: ', e);

        // console.log(context.viewportRef.value?.getBoundingClientRect());

        viewportRefX.value = context.viewportRef.value?.getBoundingClientRect().x;

        console.log(viewportRefX.value);

        window.addEventListener('pointermove', handlePointerMove$);
      }}
      onPointerUp$={(e) => {
        console.log('pointer up: ', e);

        window.removeEventListener('pointermove', handlePointerMove$);
      }}
      style={{
        transform: `translate3d(${context.slideOffset.value + 'px'}, 0px, 0px)`,
        transition: 'transform 300ms ease',
      }}
      {...props}
    >
      <Slot />
    </div>
  );
});
