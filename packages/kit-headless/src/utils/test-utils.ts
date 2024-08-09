import { expect } from '@playwright/test';

export function assertBoundingBoxExists(
  box: { x: number; y: number; width: number; height: number } | null | undefined,
): asserts box is { x: number; y: number; width: number; height: number } {
  expect(box).not.toBeNull();
  expect(box).not.toBeUndefined();
}
