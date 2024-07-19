import { component$, type PropsOf, Slot, useContext } from '@builder.io/qwik';
import { carouselContextId } from './context';
import { useStyles$ } from '@builder.io/qwik';
import styles from './carousel.css?inline';

type CarouselContainerProps = PropsOf<'div'>;

export const CarouselContainer = component$((props: CarouselContainerProps) => {
  const context = useContext(carouselContextId);
  useStyles$(styles);

  return (
    <div
      ref={context.containerRef}
      style={{
        transform: `translate3d(${context.slideOffsetSig.value}px, 0px, 0px)`,
        transitionDuration: `${context.transitionDurationSig.value}ms`,
        transitionDelay: '0ms',
      }}
      data-draggable={context.isDraggableSig.value ? '' : undefined}
      data-qui-carousel-container
      {...props}
    >
      <Slot />
    </div>
  );
});
