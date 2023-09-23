import { isServer } from '@builder.io/qwik/build';

export function getPopoverParent(popoverElement: HTMLElement): HTMLElement {
  // Check for popover support
  const isSupported =
    !isServer &&
    !document.__QUI_POPOVER_PF__ &&
    typeof HTMLElement !== 'undefined' &&
    typeof HTMLElement.prototype === 'object' &&
    'popover' in HTMLElement.prototype;

  if (isSupported) {
    // For supported browsers, return the div with the popover attribute
    console.log(isSupported);
    return popoverElement;
  } else {
    // For unsupported browsers, return the div with data-qwik-ui-popover-polyfill attribute
    console.log(popoverElement.closest('div[data-qwik-ui-popover-polyfill]'));
    return popoverElement.closest('div[data-qwik-ui-popover-polyfill]') || popoverElement;
  }
}
