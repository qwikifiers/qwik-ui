import { QwikPointerEvent } from '@builder.io/qwik';

export function getContainerTranslateX(
  containerElement: HTMLDivElement,
  e: QwikPointerEvent,
): number {
  const style = window.getComputedStyle(containerElement);
  const matrix = new DOMMatrix(style.transform);
  // console.log('MATRIX: ', matrix.m41, 'MOVEMENT: ', e.movementX);
  // console.log('E: ', e);
  console.log('MOVEMENT: ', e.movementX);
  return matrix.m41 + e.movementX;
}
