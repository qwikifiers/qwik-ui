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

    const outsideDiv = page.locator('#content-outside-of-popover');
    await outsideDiv.click();

    await expect(d.getPopover()).toBeHidden();
  });

  test(`GIVEN an open auto popover
  WHEN clicking the first trigger on the page and then clicking the second trigger
  THEN the first popover should close and the second one appear`, async ({ page }) => {
    const { driver: d } = await setup(page, 'auto');
    //ask shai: is it good to use nth here???
    const firstPopOver = d.getPopover().nth(0);
    const firstPopoverTrigger = d.getTrigger().nth(0);

    const secondPopOver = d.getPopover().nth(1);
    const secondPopoverTrigger = d.getTrigger().nth(1);

    await expect(firstPopOver).toBeHidden();
    await expect(secondPopOver).toBeHidden();

    await firstPopoverTrigger.click();
    await expect(firstPopOver).toBeVisible();

    await secondPopoverTrigger.click();
    await expect(secondPopOver).toBeVisible();

    await expect(firstPopOver).toBeHidden();
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

  test(`GIVEN an open auto popover
  WHEN the first trigger open and the focus changes to the second popover
  THEN the first popover should close and the second one appear`, async ({ page }) => {
    const { driver: d } = await setup(page, 'auto');
    //ask shai: is it good to use nth here???
    const firstPopOver = d.getPopover().nth(0);
    const firstPopoverTrigger = d.getTrigger().nth(0);

    const secondPopOver = d.getPopover().nth(1);
    const secondPopoverTrigger = d.getTrigger().nth(1);

    await expect(firstPopOver).toBeHidden();
    await expect(secondPopOver).toBeHidden();

    await firstPopoverTrigger.focus();
    await firstPopoverTrigger.press('Enter');
    await expect(firstPopOver).toBeVisible();
    await firstPopoverTrigger.press('Tab');
    await expect(secondPopoverTrigger).toBeFocused();

    await secondPopoverTrigger.press('Enter');
    await expect(secondPopOver).toBeVisible();

    await expect(firstPopOver).toBeHidden();
  });
});
