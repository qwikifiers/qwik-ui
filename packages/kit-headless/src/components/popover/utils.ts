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
    return popoverElement;
  } else {
    // For unsupported browsers, return the closest div with data-qwik-ui-popover-polyfill attribute
    console.log(popoverElement.closest('div[data-qwik-ui-popover-polyfill]'));
    return popoverElement.closest('div[data-qwik-ui-popover-polyfill]') || popoverElement;
  }
}

export const polyStyles = `[popover]{position:fixed;z-index:2147483647;inset:0;padding:.25em;width:fit-content;height:fit-content;border-width:initial;border-color:initial;border-image:initial;border-style:solid;background-color:canvas;color:canvastext;overflow:auto;margin:auto}[popover]:is(dialog[open]){display:revert}@supports not (background-color:canvas){[popover]{background-color:#fff;color:#000}}@supports (width:-moz-fit-content){[popover]{width:-moz-fit-content;height:-moz-fit-content}}@supports not (inset:0){[popover]{top:0;left:0;right:0;bottom:0}}[popover]:not(.\\:popover-open){display:none}`;
