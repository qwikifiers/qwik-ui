import { Locator, Page } from '@playwright/test';
export type DriverLocator = Locator | Page;

export function createTestDriver<T extends DriverLocator>(rootLocator: T) {
  const getRoot = () => {
    return rootLocator.locator('[data-qui-carousel]');
  };

  const getNextButton = () => {
    return getRoot().locator('[data-qui-carousel-next]');
  };

  const getPrevButton = () => {
    return getRoot().locator('[data-qui-carousel-prev]');
  };

  const getContainer = () => {
    return getRoot().locator('[data-qui-carousel-container]');
  };

  const getSlideAt = (index: number) => {
    return getContainer().locator(`[data-qui-carousel-slide]`).nth(index);
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
    getNextButton,
    getPrevButton,
    getContainer,
    getSlideAt,
    waitForAnimationEnd,
  };
}
