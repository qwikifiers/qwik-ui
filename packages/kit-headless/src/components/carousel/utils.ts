export function getContainerTranslateX(
  containerElement: HTMLDivElement,
  e: PointerEvent,
): number {
  const style = window.getComputedStyle(containerElement);
  const matrix = new DOMMatrix(style.transform);
  return matrix.m41 + e.movementX;
}
