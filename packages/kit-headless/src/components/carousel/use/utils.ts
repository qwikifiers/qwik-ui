import { type Signal } from '@builder.io/qwik';

export const getCount = (ref: Signal<HTMLElement | undefined>) => {
  return getContainer(ref)?.childElementCount || 0;
};

export const getContainer = (ref: Signal<HTMLElement | undefined>) => {
  return ref.value?.querySelector('[attr-data-qui="carousel"]');
};

export const getElements = (ref: Signal<HTMLElement | undefined>) => {
  return Array.from(getContainer(ref)?.children || []);
};

export const getElement = (ref: Signal<HTMLElement | undefined>, index: number) => {
  return getElements(ref).at(index);
};
