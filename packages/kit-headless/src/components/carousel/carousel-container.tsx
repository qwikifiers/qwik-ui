import { component$, type PropsOf, Slot, useContext } from '@builder.io/qwik';
import CarouselContextId from './carousel-context-id';
import { useStyles$ } from '@builder.io/qwik';
import styles from './carousel.css?inline';

type CarouselContainerProps = PropsOf<'div'>;

export const HCarouselContainer = component$((props: CarouselContainerProps) => {
  const context = useContext(CarouselContextId);
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
