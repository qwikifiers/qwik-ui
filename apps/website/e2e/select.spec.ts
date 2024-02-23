import { test, expect, Locator, Page } from '@playwright/test';

export function selectTestDriver<T extends DriverLocator>(locator: T) {
  const getRoot = () => {
    return locator.getByRole('combobox');
  };

  return {
    ...locator,
    locator,
    getRoot,
    getListbox() {
      return getRoot().getByRole('listbox');
    },
    getTrigger() {
      return getRoot().getByRole('button');
    },
    // get all options
    getOptions() {
      return getRoot().locator('[role="option"]');
    },
  };
}

export type DriverLocator = Locator | Page;

// Just to make sure we're on the right docs page.
test(`GIVEN a new page
      WHEN navigating to the select page in the docs
      THEN the h1 text should be "Select"`, async ({ page }) => {
  await page.goto('/docs/headless/select');

  expect(await page.locator('h1').innerText()).toContain('Select');
});

test(`GIVEN a basic select
  WHEN clicking on the trigger
  THEN open up the listbox`, async ({ page }) => {
  await page.goto('/docs/headless/select');

  const testDriver = selectTestDriver(page.getByTestId('select-hero-test'));

  const { getListbox, getTrigger } = testDriver;

  await getTrigger().click();

  await expect(getListbox()).toBeVisible();
});

test(`GIVEN a basic select
  WHEN focusing the trigger and hitting enter
  THEN open up the listbox`, async ({ page }) => {
  await page.goto('/docs/headless/select');

  const testDriver = selectTestDriver(page.getByTestId('select-hero-test'));

  const { getListbox, getTrigger } = testDriver;

  await getTrigger().focus();
  await page.keyboard.press('Enter');

  await expect(getListbox()).toBeVisible();
});
