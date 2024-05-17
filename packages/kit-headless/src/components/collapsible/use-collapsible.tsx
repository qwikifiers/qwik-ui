import { $ } from '@builder.io/qwik';

export function useCollapsible() {
  const getHiddenHeight = $((el: HTMLElement) => {
    const clone = el.cloneNode(true) as HTMLElement;

    Object.assign(clone.style, {
      overflow: 'visible',
      height: 'auto',
      maxHeight: 'none',
      opacity: '0',
      visibility: 'hidden',
      display: 'block',
    });

    el.after(clone);
    const height = clone.offsetHeight;

    clone.remove();

    return height;
  });

  return {
    getHiddenHeight,
  };
}
