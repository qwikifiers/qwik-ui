import { test, expect } from '@playwright/test';
import { selectTestDriver } from './select.driver';

test.beforeEach(async ({ page }) => {
  await page.goto('/docs/headless/select');
});

test.describe('critical functionality', () => {
  test(`GIVEN a basic select
        WHEN clicking on the trigger
        THEN open up the listbox
        AND aria-expanded should be true`, async ({ page }) => {
    const testDriver = selectTestDriver(page.getByTestId('select-hero-test'));

    const { getListbox, getTrigger } = testDriver;

    await getTrigger().click();

    await expect(getListbox()).toBeVisible();
    await expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
  });

  test(`GIVEN a basic select
        WHEN focusing the trigger and hitting enter
        THEN open up the listbox
        AND aria-expanded should be true`, async ({ page }) => {
    const testDriver = selectTestDriver(page.getByTestId('select-hero-test'));

    const { getListbox, getTrigger } = testDriver;

    await getTrigger().focus();
    await page.keyboard.press('Enter');

    await expect(getListbox()).toBeVisible();
    await expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
  });
});
