export function getContainerTranslateX(
  containerElement: HTMLDivElement,
  e: MouseEvent,
): number {
  const style = window.getComputedStyle(containerElement);
  const matrix = new DOMMatrix(style.transform);
  return matrix.m41 + e.movementX;
}
