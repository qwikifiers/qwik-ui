import {
  PropsOf,
  Slot,
  component$,
  $,
  useContext,
  useTask$,
  useSignal,
  sync$,
} from '@builder.io/qwik';
import { carouselContextId } from './context';

type BulletProps = PropsOf<'button'> & {
  _index?: number;
};

export const CarouselBullet = component$(({ _index, ...props }: BulletProps) => {
  const context = useContext(carouselContextId);
  const bulletRef = useSignal<HTMLButtonElement>();
  const slideId = `${context.localId}-${_index ?? -1}`;
  const isRenderedSig = useSignal(true);

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

  const handleKeyDownSync$ = sync$((e: KeyboardEvent) => {
    if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
    }
  });

  const handleKeyDown$ = $((e: KeyboardEvent) => {
    const usedKeys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];

    if (typeof _index !== 'number' || !usedKeys.includes(e.key)) return;

    if (e.key === 'Home') {
      context.currentIndexSig.value = 0;
      context.bulletRefsArray.value[0].value.focus();
      return;
    }

    if (e.key === 'End') {
      const lastIndex = context.numSlidesSig.value - 1;
      context.currentIndexSig.value = lastIndex;
      context.bulletRefsArray.value[lastIndex].value.focus();
      return;
    }

    const totalBullets = context.bulletRefsArray.value.length;
    const direction = e.key === 'ArrowRight' ? 1 : -1;
    let newIndex = _index + direction;

    if (context.isLoopSig.value) {
      newIndex = (newIndex + totalBullets) % totalBullets;
    } else {
      newIndex = Math.max(0, Math.min(newIndex, totalBullets - 1));
    }

    context.bulletRefsArray.value[newIndex].value.focus();
  });

  useTask$(function renderAvailableBullets() {
    const lastScrollableIndex =
      context.numSlidesSig.value - context.slidesPerViewSig.value;

    if (typeof _index !== 'number') return;

    if (_index > lastScrollableIndex) {
      isRenderedSig.value = false;
    }
  });

  return (
    <button
      ref={bulletRef}
      role="tab"
      hidden={!isRenderedSig.value}
      tabIndex={_index === context.currentIndexSig.value ? 0 : -1}
      aria-label={`${_index !== undefined && `Slide ${_index + 1}`}`}
      aria-controls={slideId}
      data-active={context.currentIndexSig.value === _index ? '' : undefined}
      aria-selected={context.currentIndexSig.value === _index ? true : false}
      onClick$={[handleClick$, props.onClick$]}
      onFocus$={[handleFocus$, props.onFocus$]}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$, props.onKeyDown$]}
      {...props}
    >
      <Slot />
    </button>
  );
});
