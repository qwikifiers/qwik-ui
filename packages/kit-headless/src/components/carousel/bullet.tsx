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

    const totalSlides = context.numSlidesSig.value;
    const slidesPerView = context.slidesPerViewSig.value;
    const move = context.moveSig.value;
    const lastScrollableIndex = totalSlides - slidesPerView;

    if (e.key === 'Home') {
      context.currentIndexSig.value = 0;
      context.bulletRefsArray.value[0].value.focus();
      return;
    }

    if (e.key === 'End') {
      context.currentIndexSig.value = lastScrollableIndex;
      context.bulletRefsArray.value[lastScrollableIndex].value.focus();
      return;
    }

    const direction = e.key === 'ArrowRight' ? 1 : -1;

    // Calculate valid bullet indexes
    const validIndexes = [];
    for (let i = 0; i <= lastScrollableIndex; i += move) {
      validIndexes.push(i);
    }
    if (lastScrollableIndex % move !== 0) {
      validIndexes.push(lastScrollableIndex);
    }

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

  useTask$(function renderAvailableBullets() {
    if (typeof _index !== 'number') return;

    const totalSlides = context.numSlidesSig.value;
    const slidesPerView = context.slidesPerViewSig.value;
    const lastScrollableIndex = totalSlides - slidesPerView;

    // calculate the number of bullets needed
    const numBullets = Math.ceil(totalSlides / slidesPerView);

    // determine which indexes should be rendered
    const renderIndexes = Array.from({ length: numBullets }, (_, i) =>
      i === numBullets - 1 ? lastScrollableIndex : i * slidesPerView,
    );

    isRenderedSig.value = renderIndexes.includes(_index);
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
