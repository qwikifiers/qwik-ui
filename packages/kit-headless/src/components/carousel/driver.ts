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
    return getRoot().locator(`[data-qui-carousel-slide]`).count();
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

  const getSlideBoundingBoxAt = async (index: number) => {
    const boundingBox = await getSlideAt(index).boundingBox();

    if (!boundingBox) {
      throw new Error('Could not determine the bounding box of the slide');
    }

    return boundingBox;
  };

  return {
    ...rootLocator,
    locator: rootLocator,
    getRoot,
    getNextButton,
    getPrevButton,
    getContainer,
    getSlideAt,
    getSlideBoundingBoxAt,
    getPaginationBullet,
    getTotalSlides,
    getSlideTitleId,
    getSlideTabsParent,
    getItems,
  };
}
