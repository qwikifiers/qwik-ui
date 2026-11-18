import { useTask$, type Signal } from '@builder.io/qwik';
import { isServer } from '@builder.io/qwik/build';

export const hideOutsideFromScreenReaders = (scope: HTMLElement) => {
  const hiddenElements: Element[] = [];
  let branch: Element = scope;

  while (branch !== document.body && branch.parentElement) {
    for (const sibling of branch.parentElement.children) {
      const isSkipped =
        sibling === branch ||
        sibling.hasAttribute('aria-hidden') ||
        sibling.tagName === 'SCRIPT' ||
        sibling.tagName === 'STYLE';

      if (isSkipped) continue;

      sibling.setAttribute('aria-hidden', 'true');
      hiddenElements.push(sibling);
    }
    branch = branch.parentElement;
  }

  return () =>
    hiddenElements.forEach((element) => element.removeAttribute('aria-hidden'));
};

export const useModalAriaHideOutside = (
  isOpenSig: Signal<boolean>,
  props: { modal?: boolean; manual?: boolean },
  scopeRef: { readonly value: HTMLElement | undefined },
) => {
  useTask$(({ track, cleanup }) => {
    const isModalOpen = track(() => isOpenSig.value && props.modal && !props.manual);

    if (isServer || !isModalOpen || !scopeRef.value) return;

    cleanup(hideOutsideFromScreenReaders(scopeRef.value));
  });
};
