import { test, type Page, expect } from '@playwright/test';
import { createTestDriver } from './carousel.driver';

async function setup(page: Page, exampleName: string) {
  await page.goto(`headless/carousel/${exampleName}`);

  const driver = createTestDriver(page);

  return {
    driver,
  };
}

test.describe('Mouse Behavior', () => {
  test(`GIVEN a carousel
        WHEN clicking on the next button
        THEN it should move to the next slide
        `, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.getNextButton().click();

    await expect(d.getSlideAt(1)).toBeVisible();
  });
});
