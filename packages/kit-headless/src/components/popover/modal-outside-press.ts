import { sync$ } from '@builder.io/qwik';

const stopOutsidePress$ = sync$((event: MouseEvent, scope: HTMLElement) => {
  if (event.type === 'pointerdown') {
    const panel = scope.querySelector('[popover]');
    const target = event.target as Node | null;
    const closesOnOutsidePress =
      scope.getAttribute('data-modal-scope') === 'manual' ||
      (scope.getAttribute('data-modal-scope') === 'auto' &&
        panel?.getAttribute('popover') !== 'manual' &&
        'popover' in HTMLElement.prototype);
    const isOutsidePress =
      !!panel &&
      !!target &&
      panel.hasAttribute('data-open') &&
      closesOnOutsidePress &&
      !scope.contains(target) &&
      !panel.contains(target);

    scope.toggleAttribute('data-outside-press', isOutsidePress);
  }

  if (!scope.hasAttribute('data-outside-press')) return;

  if (event.type === 'click') {
    scope.removeAttribute('data-outside-press');
    if (event.detail === 0) return;
    event.preventDefault();
  }

  event.stopPropagation();
});

export const outsidePressHandlers = (isModal: boolean | undefined) => {
  const handler = isModal ? stopOutsidePress$ : undefined;

  return {
    'window:onPointerDown$': handler,
    'window:onMouseDown$': handler,
    'window:onPointerUp$': handler,
    'window:onMouseUp$': handler,
    'window:onClick$': handler,
  };
};
