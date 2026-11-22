import { expect, type Locator } from '@playwright/test';

export function assertBoundingBoxExists(
  box: { x: number; y: number; width: number; height: number } | null | undefined,
): asserts box is { x: number; y: number; width: number; height: number } {
  expect(box).not.toBeNull();
  expect(box).not.toBeUndefined();
}

const pressEvents = ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'];

export async function recordPressEvents(target: Locator) {
  await target.evaluate((element, types) => {
    const seen: string[] = [];
    element.setAttribute('data-seen-events', '');
    for (const type of types) {
      element.addEventListener(type, () => {
        seen.push(type);
        element.setAttribute('data-seen-events', seen.join(' '));
      });
    }
  }, pressEvents);

  return async () => {
    const seen = await target.getAttribute('data-seen-events');
    return seen ? seen.split(' ') : [];
  };
}

const formEvents = ['input', 'change'];

export async function recordFormEvents(select: Locator) {
  await select.evaluate((element: HTMLSelectElement, types) => {
    const seen: string[] = [];
    for (const type of types) {
      element.addEventListener(type, () => {
        const values = [...element.selectedOptions].map((option) => option.value);
        seen.push(`${type}: ${values.join(', ')}`);
        element.setAttribute('data-seen-events', JSON.stringify(seen));
      });
    }
  }, formEvents);

  return async (): Promise<string[]> =>
    JSON.parse((await select.getAttribute('data-seen-events')) ?? '[]');
}

export async function centerOf(target: Locator) {
  const box = await target.boundingBox();
  assertBoundingBoxExists(box);

  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}
