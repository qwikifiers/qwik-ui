import { PropsOf, Slot, component$ } from '@builder.io/qwik';

export const PaginationBullet = component$((props: PropsOf<'div'>) => {
  //   const context = useContext(carouselContextId);

  return (
    <div
      {...props}
      //   aria-current={context.currentIndexSig.value === num}
      //   data-current-slide={context.currentIndexSig.value === num}
    >
      <Slot />
    </div>
  );
});
