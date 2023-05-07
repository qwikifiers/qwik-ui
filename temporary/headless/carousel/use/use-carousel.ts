import { type Signal, useSignal, useId } from '@builder.io/qwik';
import { Items, useItems } from './use-items';
import { Pages, usePages } from './use-pages';

export type CarouselContext = Params & {
  items: Items;
  pages: Pages;
};

export type Params = {
  /**
   * The ID of the carousel HTML element.
   */
  id?: string;
  /**
   * A signal of the HTMLElement that the carousel's context is attached to.
   */
  ref?: Signal<HTMLElement | undefined>;
  /**
   * The index of the active item the carousel intially renders at.
   * @default 0
   */
  startAt?: number;
  /**
   * Allow the carousel to loop to the begining and end of the items list.
   * @default true
   */
  loop?: boolean;
  /**
   * The delay in milliseconds before the active item is scrolled into view.
   * Caution, to preserve your CSS transition, make sure that this duration exceeds
   * the timing of your transition. It may happen that browsers don't paint transition
   * when scrolling into view occures – using scrollIntoView.
   * @default 350
   */
  transition?: number;
};

export const useCarousel = (params: Params | void): CarouselContext => {
  const defaultParams = {
    id: params?.id || useId(),
    ref: params?.ref || useSignal(),
    startAt: params?.startAt ?? 0,
    loop: params?.loop ?? true,
    transition: params?.transition ?? 350,
  };

  const items = useItems(defaultParams.ref, {
    startAt: defaultParams.startAt,
    transition: defaultParams.transition,
  });

  const pages = usePages(defaultParams.ref, {
    items,
    loop: defaultParams.loop,
    transition: defaultParams.transition,
  });

  return {
    ...defaultParams,
    items,
    pages,
  };
};
