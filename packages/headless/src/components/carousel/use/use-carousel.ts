import {
  type Signal,
  useSignal,
  useVisibleTask$,
  useId,
} from '@builder.io/qwik';
import { Active, useActive } from './use-active';
import { Scroll, useScroll } from './use-scroll';
import { Visible, useVisible } from './use-visible';
import { Pages, usePages } from './use-pages';
import { getCount } from './utils';

export type CarouselContext = {
  ref: Signal<HTMLElement | undefined>;
  id: string;
  loop: boolean;
  startAt: number;
  count: Signal<number>;
  active: Active;
  scroll: Scroll;
  pages: Pages;
  visible: Visible;
};

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
