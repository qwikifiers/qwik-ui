import {
  component$,
  type PropsOf,
  Slot,
  useContext,
  useSignal,
  $,
} from '@builder.io/qwik';
import { carouselContextId } from './context';
import { useStyles$ } from '@builder.io/qwik';
import styles from './carousel.css?inline';

type CarouselContainerProps = PropsOf<'div'>;

export const CarouselContainer = component$((props: CarouselContainerProps) => {
  const context = useContext(carouselContextId);
  useStyles$(styles);
  const isMouseDownSig = useSignal(false);
  const startXSig = useSignal();
  const scrollLeftSig = useSignal(0);

  const handleMouseMove$ = $((e: MouseEvent) => {
    if (!isMouseDownSig.value) return;
    const x = e.pageX - context.containerRef.value.offsetLeft;
    console.log('x', x);
    const SCROLL_SPEED = 3;
    const walk = (x - startXSig.value) * SCROLL_SPEED;
    console.log('walk', walk);
    context.containerRef.value.scrollLeft = scrollLeftSig.value - walk;

    console.log('carousel container', context.containerRef.value);

    console.log('scroll left', context.containerRef.value.scrollLeft);
    console.log('move');
  });

  const handleMouseDown$ = $((e: MouseEvent) => {
    if (!context.isDraggableSig.value) return;
    isMouseDownSig.value = true;
    startXSig.value = e.pageX - context.containerRef.value.offsetLeft;
    scrollLeftSig.value = context.containerRef.value.scrollLeft;
    window.addEventListener('mousemove', handleMouseMove$);
  });

  const handleWindowMouseUp$ = $(() => {
    isMouseDownSig.value = false;
    window.removeEventListener('mousemove', handleMouseMove$);
  });

  return (
    <div
      ref={context.containerRef}
      onMouseDown$={[handleMouseDown$, props.onMouseDown$]}
      window:onMouseUp$={[handleWindowMouseUp$, props['window:onPointerUp$']]}
      data-draggable={context.isDraggableSig.value ? '' : undefined}
      data-qui-carousel-container
      preventdefault:mousemove
      {...props}
    >
      <Slot />
    </div>
  );
});
