import { Locator, expect, Page } from '@playwright/test';
type OpenKeys = 'Space' | 'Enter';
export type DriverLocator = Locator | Page;

export function createTestDriver<T extends DriverLocator>(rootLocator: T) {
  const getRoot = () => {
    return rootLocator.locator('[data-accordion]');
  };

  const getItemAt = (index: number) => {
    return rootLocator.locator('[data-collapsible]').nth(index);
  };

  const getTriggerAt = (index: number) => {
    const itemLocator = getItemAt(index);
    return itemLocator.getByRole('button');
  };

  const getContentAt = (index: number) => {
    const itemLocator = getItemAt(index);
    return itemLocator.locator('[data-collapsible-content]');
  };

  const openCollapsible = async (key: OpenKeys | 'click', index: number) => {
    const triggerLocator = await getTriggerAt(index);
    const contentLocator = await getContentAt(index);

    await triggerLocator.focus();

    if (key !== 'click') {
      await triggerLocator.press(key);
    } else {
      await triggerLocator.click();
    }

    // should be open initially
    await expect(contentLocator).toBeVisible();
  };

  /**
   * Wait for all animations within the given element and subtrees to finish
   * See: https://github.com/microsoft/playwright/issues/15660#issuecomment-1184911658
   */
  function waitForAnimationEnd(selector: string) {
    return getRoot()
      .locator(selector)
      .evaluate((element) =>
        Promise.all(element.getAnimations().map((animation) => animation.finished)),
      );
  }

  return {
    ...rootLocator,
    locator: rootLocator,
    getRoot,
    getTriggerAt,
    getContentAt,
    getItemAt,
    openCollapsible,
    waitForAnimationEnd,
  };
}
