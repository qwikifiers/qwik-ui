import { PropsOf, Slot, component$, $, useContext } from '@builder.io/qwik';
import { carouselContextId } from './context';

type BulletProps = PropsOf<'button'> & {
  _index?: number;
};

export const CarouselBullet = component$(({ _index, ...props }: BulletProps) => {
  const context = useContext(carouselContextId);

  const handleClick$ = $(() => {
    if (typeof _index === 'number') {
      context.currentIndexSig.value = _index;
    }
  });

  return (
    <button onClick$={[handleClick$, props.onClick$]} role="tab" {...props}>
      <Slot />
    </button>
  );
});
