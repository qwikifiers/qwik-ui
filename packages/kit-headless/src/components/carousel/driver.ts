import { Locator, Page } from '@playwright/test';
export type DriverLocator = Locator | Page;

export function createTestDriver<T extends DriverLocator>(rootLocator: T) {
  const getRoot = () => {
    return rootLocator.locator('[data-qui-carousel]');
  };

  const getNextButton = () => {
    return getRoot().locator('[data-qui-carousel-next]');
  };

  const getPaginationBullet = (index: number) => {
    return getRoot().locator(`[tabindex]`).nth(index);
  };

  const getTotalSlides = () => {
    return getRoot().locator(`[data-qui-carousel-scroller]`).count();
  };

  const getSlideTitleId = () => {
    return getRoot().locator('[id]');
  };

  const getPrevButton = () => {
    return getRoot().locator('[data-qui-carousel-prev]');
  };

  const getSlideTabsParent = () => {
    // return getRoot().locator(`:nth-child(${0 + 1})`).nth(1);;
    return getRoot().getByRole('tablist');
  };

  const getContainer = () => {
    return getRoot().locator('[data-qui-carousel-scroller]');
  };

  const getItems = () => {
    return getRoot().locator(`[role]`);
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
    getPaginationBullet,
    getTotalSlides,
    getSlideTitleId,
    getSlideTabsParent,
    getItems,
  };
}
