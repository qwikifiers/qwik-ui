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
  test(`GIVEN a closed hero popover
        WHEN clicking on the trigger
        THEN the popover should be opened `, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    await expect(d.getPopover()).toBeHidden();

    await d.getTrigger().click();

    await expect(d.getPopover()).toBeVisible();
  });

  test(`GIVEN an open hero popover
        WHEN clicking elsewhere on the page
        THEN the popover should close`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await expect(d.getPopover()).toBeHidden();
    await d.getTrigger().click();

    await expect(d.getPopover()).toBeVisible();

    await page.click('body', { position: { x: 0, y: 0 } });
    await page.click('body', { position: { x: 0, y: 0 } });

    await expect(d.getPopover()).toBeHidden();
  });
});

test.describe('Keyboard Behavior', () => {
  test(`GIVEN a programmatic popover with a programmatic trigger
  WHEN focusing on the button and pressing the 'o' key
  THEN the popover should open`, async ({ page }) => {
    const { driver: d } = await setup(page, 'programmatic');

    await expect(d.getPopover()).toBeHidden();

    // Using `page` here because driver is scoped to the popover
    await page.getByRole('button', { name: "Focus me and press the 'o'" }).focus();
    await page.keyboard.type('o');

    await expect(d.getPopover()).toBeVisible();
  });
});
