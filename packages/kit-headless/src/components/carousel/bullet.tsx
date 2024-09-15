import {
  PropsOf,
  Slot,
  component$,
  $,
  useContext,
  useTask$,
  useSignal,
  sync$,
  useComputed$,
} from '@builder.io/qwik';
import { carouselContextId } from './context';
import { useCarousel } from './use-carousel';

type BulletProps = PropsOf<'button'> & {
  _index?: number;
};

export const CarouselBullet = component$(({ _index, ...props }: BulletProps) => {
  const context = useContext(carouselContextId);
  const bulletRef = useSignal<HTMLButtonElement>();
  const slideId = `${context.localId}-${_index ?? -1}`;
  const isRenderedSig = useSignal(true);

  const { validIndexesSig } = useCarousel(context);

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

  const handleKeyDown$ = $(async (e: KeyboardEvent) => {
    const usedKeys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
    if (typeof _index !== 'number' || !usedKeys.includes(e.key)) return;

    const validIndexes = validIndexesSig.value;
    const lastScrollableIndex = validIndexes[validIndexes.length - 1];

    if (e.key === 'Home') {
      context.currentIndexSig.value = validIndexes[0];
      context.bulletRefsArray.value[validIndexes[0]].value.focus();
      return;
    }

    if (e.key === 'End') {
      context.currentIndexSig.value = lastScrollableIndex;
      context.bulletRefsArray.value[lastScrollableIndex].value.focus();
      return;
    }

    const direction = e.key === 'ArrowRight' ? 1 : -1;
    const currentPosition = validIndexes.indexOf(_index);
    let newPosition = currentPosition + direction;

    if (context.isLoopSig.value) {
      newPosition = (newPosition + validIndexes.length) % validIndexes.length;
    } else {
      newPosition = Math.max(0, Math.min(newPosition, validIndexes.length - 1));
    }

    const newIndex = validIndexes[newPosition];
    context.currentIndexSig.value = newIndex;
    context.bulletRefsArray.value[newIndex].value.focus();
  });

  useTask$(async function renderAvailableBullets() {
    if (typeof _index !== 'number') return;
    const validIndexes = validIndexesSig.value;
    isRenderedSig.value = validIndexes.includes(_index);
  });

  const isActiveBulletSig = useComputed$(() => {
    if (typeof _index !== 'number' || !validIndexesSig.value.includes(_index))
      return false;
    const currentIndex = context.currentIndexSig.value;
    const nextBulletIndex =
      validIndexesSig.value[validIndexesSig.value.indexOf(_index) + 1];
    return (
      currentIndex >= _index &&
      (nextBulletIndex === undefined || currentIndex < nextBulletIndex)
    );
  });

  return (
    <button
      ref={bulletRef}
      role="tab"
      hidden={!isRenderedSig.value}
      tabIndex={_index === context.currentIndexSig.value ? 0 : -1}
      aria-label={`${_index !== undefined && `Slide ${_index + 1}`}`}
      aria-controls={slideId}
      data-active={isActiveBulletSig.value ? '' : undefined}
      aria-selected={isActiveBulletSig.value}
      onClick$={[handleClick$, props.onClick$]}
      onFocus$={[handleFocus$, props.onFocus$]}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$, props.onKeyDown$]}
      {...props}
    >
      <Slot />
    </button>
  );
});
