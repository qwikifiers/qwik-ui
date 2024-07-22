import {
  PropsOf,
  Slot,
  component$,
  $,
  useContext,
  useTask$,
  useSignal,
} from '@builder.io/qwik';
import { carouselContextId } from './context';

type BulletProps = PropsOf<'button'> & {
  _index?: number;
};

export const CarouselBullet = component$(({ _index, ...props }: BulletProps) => {
  const context = useContext(carouselContextId);
  const bulletRef = useSignal<HTMLButtonElement>();

  useTask$(function getIndexOrder() {
    if (_index !== undefined) {
      context.bulletRefsArray.value[_index] = bulletRef;
    } else {
      throw new Error('Qwik UI: Carousel Bullet cannot find its proper index.');
    }
  });

  const handleClick$ = $(() => {
    if (typeof _index !== 'number') return;
    context.currentIndexSig.value = _index;
  });

  const handleFocus$ = $(() => {
    if (typeof _index !== 'number') return;
    context.currentIndexSig.value = _index;
  });

  const handleKeyDown$ = $((e: KeyboardEvent) => {
    if (typeof _index !== 'number') return;

    if (e.key === 'ArrowRight') {
      const nextIndex = _index + 1;
      context.bulletRefsArray.value[nextIndex]?.value.focus();
    }

    if (e.key === 'ArrowLeft') {
      const prevIndex = _index - 1;
      context.bulletRefsArray.value[prevIndex]?.value.focus();
    }
  });

  return (
    <button
      ref={bulletRef}
      data-active={context.currentIndexSig.value === _index ? '' : undefined}
      onClick$={[handleClick$, props.onClick$]}
      onFocus$={[handleFocus$, props.onFocus$]}
      onKeyDown$={[handleKeyDown$, props.onKeyDown$]}
      role="tab"
      {...props}
    >
      <Slot />
    </button>
  );
});
