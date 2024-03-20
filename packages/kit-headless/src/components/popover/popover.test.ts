import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './popover.driver';

async function setup(page: Page, exampleName: string) {
  await page.goto(`/headless/popover/${exampleName}`);

  const driver = createTestDriver(page);

  return {
    driver,
  };
}

test('@Visual diff', async ({ page }) => {
  const { driver: d } = await setup(page, 'hero');
  await expect(page).toHaveScreenshot('closed popover.png');

  await d.getTrigger().click();

  await expect(page).toHaveScreenshot('opened popover.png');
});

test.describe('Mouse Behavior', () => {
  test(`GIVEN a popover
        WHEN clicking on the trigger
        THEN the popover should be opened `, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await expect(d.getPopover()).toBeHidden();
    await d.getTrigger().click();

    await expect(d.getPopover()).toBeVisible();
  });
});
