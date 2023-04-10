import {
  type Signal,
  useSignal,
  useVisibleTask$,
  useId,
} from '@builder.io/qwik';
import type { CarouselContext } from '../carousel';
import { useActive } from './use-active';
import { useScroll } from './use-scroll';
import { useVisible } from './use-visible';
import { usePages } from './use-pages';
import { getCount } from './utils';

type UseCarouselParams = {
  id?: string;
  ref?: Signal<HTMLElement | undefined>;
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

  // const active = useSignal(startAt);
  const count = useSignal(0);

  const active = useActive(ref, { startAt });
  const scroll = useScroll(ref, { active, loop });
  const visible = useVisible(ref);
  const pages = usePages(ref);

  useVisibleTask$(() => {
    count.value = getCount(ref);
  });

  return {
    ref,
    id,
    loop,
    startAt,
    count,
    scroll,
    active,
    pages,
    visible,
  };
};
