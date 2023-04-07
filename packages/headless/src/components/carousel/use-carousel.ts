import {
  $,
  type Signal,
  useSignal,
  useVisibleTask$,
  useId,
} from '@builder.io/qwik';
import type { CarouselContext } from './carousel';
import { useActive } from './use/use-active';
import { ScrollToEvent, useScroll } from './use/use-scroll';
import { useVisible } from './use/use-visible';
import { getCount } from './use/utils';
import { usePages } from './use/use-pages';

type UseCarouselParams = {
  id?: string;
  ref?: Signal<HTMLElement | undefined>;
  thumbnailsRef?: Signal<HTMLElement | undefined>;
  startAt?: number;
  loop?: boolean;
};

export const useCarousel = (
  params: UseCarouselParams | void
): CarouselContext => {
  const id = params?.id || useId();
  const ref = params?.ref || useSignal();
  const startAt = params?.startAt ?? 0;
  const loop = params?.loop ?? true;

  const active = useSignal(startAt);

  const activate = useActive(ref, { active });
  const scroll = useScroll(ref, { active, loop });
  const visible = useVisible(ref);
  const pages = usePages(ref);

  const { isFirst, isLast } = activate;
  const { scrollTo, onScroll, previous, next } = scroll;

  const isFirstActive = useSignal(isFirst);
  const isLastActive = useSignal(isLast);
  const count = useSignal(0);
  const page = useSignal(startAt);

  // desired api

  onScroll(
    $((event: Event) => {
      active.value = (event as ScrollToEvent).detail.index;
    })
  );

  useVisibleTask$(async function trackActiveItems() {
    count.value = getCount(ref);
  });

  return {
    ref,
    id,
    loop,
    startAt,
    count,
    next,
    previous,
    scrollTo,
    active,
    isFirstActive,
    isLastActive,
    page,
    pages,
    visibleItemStart: visible.first,
    visibleItemEnd: visible.last,
  };
};
