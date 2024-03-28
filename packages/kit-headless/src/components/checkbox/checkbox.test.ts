import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './checkbox.driver';

async function setup(page: Page, exampleName: string) {
  await page.goto(`/headless/checkbox/${exampleName}`);

  const driver = createTestDriver(page.getByRole('checkbox'));

  const { getRoot, getIcon } = driver;

  return {
    driver,
    getRoot,
    getIcon,
  };
}

test.describe('single checkbox behavior', () => {
  test(`GIVEN a checkbox with a user sig value of true
        WHEN the checkbox renders
        IT should have aria-checked as true`, async ({ page }) => {
    const exampleName = 'hero';
    const { getRoot } = await setup(page, exampleName);
    await expect(getRoot()).toBeVisible();
    await expect(getRoot()).toHaveAttribute('aria-checked', 'true');
  }),
    test(`GIVEN a checkbox with a user sig value of true
        WHEN the checkbox is focused and the spacebar is pressed
        IT should have aria-checked as false`, async ({ page }) => {
      const exampleName = 'hero';
      const { getRoot } = await setup(page, exampleName);
      await expect(getRoot()).toBeVisible();
      await getRoot().focus();
      await getRoot().press(' ');
      await expect(getRoot()).toHaveAttribute('aria-checked', 'false');
    });

  test(`GIVEN a checkbox with a user sig value of true
        WHEN the checkbox is focused and the spacebar is pressed
        IT should have its icon hidden`, async ({ page }) => {
    const exampleName = 'hero';
    const { getRoot, getIcon } = await setup(page, exampleName);
    await expect(getIcon()).toBeVisible();
    await getRoot().focus();
    await getRoot().press(' ');
    await expect(getRoot()).toHaveAttribute('aria-checked', 'false');
    await expect(getIcon()).toBeHidden();
  });
  test(`GIVEN a default checkbox with a default sig value of false
        WHEN the checkbox is focused and the spacebar is pressed
        IT should have its icon visible`, async ({ page }) => {
    const exampleName = 'default';
    const { getRoot, getIcon } = await setup(page, exampleName);
    await expect(getIcon()).toBeHidden();
    await getRoot().focus();
    await getRoot().press(' ');
    await expect(getRoot()).toHaveAttribute('aria-checked', 'false');
    await expect(getIcon()).toBeVisible();
  });
});
