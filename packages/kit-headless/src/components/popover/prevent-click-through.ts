import { sync$ } from '@builder.io/qwik';

const stopOutsidePress$ = sync$((event: MouseEvent, scope: HTMLElement) => {
  if (event.type === 'pointercancel') {
    scope.removeAttribute('data-outside-press');
    return;
  }

  if (event.type === 'pointerdown') {
    const panel = document.getElementById(
      scope.getAttribute('data-click-through-panel') ?? '',
    );
    const target = event.target as Node | null;
    const closesOnOutsidePress =
      scope.hasAttribute('data-click-through-manual') ||
      (panel?.getAttribute('popover') !== 'manual' && 'popover' in HTMLElement.prototype);
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

export const preventClickThroughProps = (
  isEnabled: boolean | undefined,
  panelId: string,
  isManual = false,
) => {
  const handler = isEnabled ? stopOutsidePress$ : undefined;

  return {
    'data-click-through-panel': isEnabled ? panelId : undefined,
    'data-click-through-manual': isEnabled && isManual ? '' : undefined,
    'window:onPointerDown$': handler,
    'window:onMouseDown$': handler,
    'window:onPointerUp$': handler,
    'window:onMouseUp$': handler,
    'window:onClick$': handler,
    'window:onPointerCancel$': handler,
  };
};
