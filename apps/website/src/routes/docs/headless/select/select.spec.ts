import { test, expect, type Page } from '@playwright/test';
import { createTestDriver } from './select.driver';
async function setup(page: Page, selector: string) {
  await page.goto('/docs/headless/select');

  const driver = createTestDriver(page.getByTestId(selector));

  const { getListbox, getTrigger, getOptions } = driver;

  return {
    driver,
    getListbox,
    getTrigger,
    getOptions,
  };
}

test.describe('critical functionality', () => {
  test(`GIVEN the hero select
        WHEN clicking on the trigger
        THEN open up the listbox AND aria-expanded should be true`, async ({ page }) => {
    const { getTrigger, getListbox } = await setup(page, 'select-hero-test');

    await getTrigger().click();

    await expect(getListbox()).toBeVisible();
    await expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
  });

  test(`GIVEN the hero select
        WHEN focusing the trigger and hitting enter
        THEN open up the listbox AND aria-expanded should be true`, async ({ page }) => {
    const { getTrigger, getListbox } = await setup(page, 'select-hero-test');

    await getTrigger().focus();
    await getTrigger().press('Enter');

    await expect(getListbox()).toBeVisible();
    await expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
  });

  test(`GIVEN a hero select with an open listbox 
        WHEN the trigger is clicked
        THEN close the listbox AND aria-expanded should be false`, async ({ page }) => {
    const { getTrigger, getListbox } = await setup(page, 'select-hero-test');

    await getTrigger().click();
    // should be open initially
    await expect(getListbox()).toBeVisible();

    await getTrigger().click();
    await expect(getListbox()).toBeHidden();
    await expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
  });

  test(`GIVEN a hero select with an open listbox
        WHEN focusing the trigger and hitting enter
        THEN close the listbox AND aria-expanded should be false`, async ({ page }) => {
    const { getTrigger, getListbox } = await setup(page, 'select-hero-test');

    await getTrigger().click();
    // should be open initially
    await expect(getListbox()).toBeVisible();

    await getTrigger().focus();
    await getTrigger().press('Enter');
    await expect(getListbox()).toBeHidden();
    await expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
  });
});

test.describe('Keyboard Behavior', () => {
  test(`GIVEN a hero select
        WHEN pressing the space key
        THEN open up the listbox AND aria-expanded should be true`, async ({ page }) => {
    const { getTrigger, getListbox } = await setup(page, 'select-hero-test');

    await getTrigger().focus();
    await getTrigger().press('Space');

    await expect(getListbox()).toBeVisible();
    await expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
  });

  test(`GIVEN a hero select with an open listbox
        WHEN pressing the space key
        THEN close listbox AND aria-expanded should be false`, async ({ page }) => {
    const { getTrigger, getListbox } = await setup(page, 'select-hero-test');

    await getTrigger().focus();
    await getTrigger().press('Space');
    // should be open initially
    await expect(getListbox()).toBeVisible();

    await getTrigger().focus();
    await getTrigger().press('Space');
    await expect(getListbox()).toBeHidden();
    await expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
  });

  test(`GIVEN a hero select
        WHEN pressing the down arrow key
        THEN open up the listbox AND aria-expanded should be true`, async ({ page }) => {
    const { getTrigger, getListbox } = await setup(page, 'select-hero-test');

    await getTrigger().focus();
    await getTrigger().press('ArrowDown');
    await expect(getListbox()).toBeVisible();
  });

  test(`GIVEN a hero select with an opened listbox
        WHEN pressing the escape key
        THEN the listbox should close 
        AND aria-expanded should be false`, async ({ page }) => {
    const { getTrigger, getListbox } = await setup(page, 'select-hero-test');

    await getTrigger().click();
    // should be open initially
    await expect(getListbox()).toBeVisible();

    await getTrigger().focus();
    await getTrigger().press('Escape');
    await expect(getListbox()).toBeHidden();
    await expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
  });

  test(`GIVEN a hero select
        WHEN pressing the down arrow key
        THEN open up the listbox 
        AND the first option should have data-highlighted`, async ({ page }) => {
    const { getTrigger, getListbox, getOptions } = await setup(page, 'select-hero-test');

    await getTrigger().focus();
    await getTrigger().press('ArrowDown');
    await expect(getListbox()).toBeVisible();

    const options = await getOptions();
    await expect(options[0]).toHaveAttribute('data-highlighted');
  });

  test(`GIVEN a hero select
        WHEN pressing the enter key
        THEN open up the listbox 
        AND the first option should have data-highlighted`, async ({ page }) => {
    const { getTrigger, getListbox, getOptions } = await setup(page, 'select-hero-test');

    await getTrigger().focus();
    await getTrigger().press('Enter');
    await expect(getListbox()).toBeVisible();

    const options = await getOptions();
    await expect(options[0]).toHaveAttribute('data-highlighted');
  });

  test(`GIVEN a hero select
        WHEN pressing the space key
        THEN open up the listbox 
        AND the first option should have data-highlighted`, async ({ page }) => {
    const { getTrigger, getListbox, getOptions } = await setup(page, 'select-hero-test');

    await getTrigger().focus();
    await getTrigger().press('Space');
    await expect(getListbox()).toBeVisible();

    const options = await getOptions();
    await expect(options[0]).toHaveAttribute('data-highlighted');
  });

  test(`GIVEN a hero select
        WHEN pressing the up arrow
        THEN open up the listbox 
        AND the first option should have data-highlighted`, async ({ page }) => {
    const { getTrigger, getListbox, getOptions } = await setup(page, 'select-hero-test');

    await getTrigger().focus();
    await getTrigger().press('ArrowUp');
    await expect(getListbox()).toBeVisible();

    const options = await getOptions();
    await expect(options[0]).toHaveAttribute('data-highlighted');
  });

  test(`GIVEN an open hero select
        WHEN pressing the end key
        THEN the last option should have data-highlighted`, async ({ page }) => {
    const { getTrigger, getListbox, getOptions } = await setup(page, 'select-hero-test');

    await getTrigger().click();
    // should be open initially
    await expect(getListbox()).toBeVisible();

    await getTrigger().focus();
    await getTrigger().press('End');

    const options = await getOptions();
    const lastIndex = options.length - 1;
    await expect(options[lastIndex]).toHaveAttribute('data-highlighted');
  });

  test(`GIVEN an open hero select
        WHEN pressing the home key after the end key
        THEN the first option should have data-highlighted`, async ({ page }) => {
    const { getTrigger, getListbox, getOptions } = await setup(page, 'select-hero-test');

    await getTrigger().click();
    // should be open initially
    await expect(getListbox()).toBeVisible();

    // to last index
    await getTrigger().focus();
    await getTrigger().press('End');
    const options = await getOptions();
    const lastIndex = options.length - 1;
    await expect(options[lastIndex]).toHaveAttribute('data-highlighted');

    // to first index
    await getTrigger().press('Home');
    await expect(options[0]).toHaveAttribute('data-highlighted');
  });

  test(`GIVEN an open hero select
  WHEN the first option is highlighted and the down arrow key is pressed
  THEN the second option should have data-highlighted`, async ({ page }) => {
    const { getTrigger, getListbox, getOptions } = await setup(page, 'select-hero-test');

    await getTrigger().focus();
    await getTrigger().press('Enter');
    // should be open initially
    await expect(getListbox()).toBeVisible();

    // first index highlighted
    const options = await getOptions();
    await expect(options[0]).toHaveAttribute('data-highlighted');

    await getTrigger().focus();
    await getTrigger().press('ArrowDown');
    await expect(options[1]).toHaveAttribute('data-highlighted');
  });

  test(`GIVEN an open hero select
  WHEN the third option is highlighted and the up arrow key is pressed
  THEN the second option should have data-highlighted`, async ({ page }) => {
    const { getTrigger, getListbox, getOptions } = await setup(page, 'select-hero-test');

    await getTrigger().focus();
    await getTrigger().press('Enter');
    // should be open initially
    await expect(getListbox()).toBeVisible();

    // third option highlighted
    const options = await getOptions();
    await expect(options[0]).toHaveAttribute('data-highlighted');
    await getTrigger().press('ArrowDown');
    await getTrigger().press('ArrowDown');

    await getTrigger().press('ArrowUp');
    await expect(options[1]).toHaveAttribute('data-highlighted');
  });

  test(`GIVEN an open hero select
        WHEN the listbox is closed with a chosen option 
        AND the down arrow key is pressed
        THEN the data-highlighted option should not change on re-open`, async ({
    page,
  }) => {
    const { getTrigger, getListbox, getOptions } = await setup(page, 'select-hero-test');

    await getTrigger().focus();
    await getTrigger().press('Enter');
    // should be open initially
    await expect(getListbox()).toBeVisible();

    // second option highlighted
    const options = await getOptions();
    await getTrigger().press('ArrowDown');
    await expect(options[1]).toHaveAttribute('data-highlighted');
    await getTrigger().press('Enter');
    await expect(getListbox()).toBeHidden();

    await getTrigger().press('ArrowDown');
    await expect(options[1]).toHaveAttribute('data-highlighted');
  });
});

test.describe('disabled', () => {
  test(`GIVEN an open hero select with the first option disabled
        WHEN clicking the disabled option
        It should have aria-disabled`, async ({ page }) => {
    const { getTrigger, getListbox, getOptions } = await setup(
      page,
      'select-disabled-test',
    );

    await getTrigger().focus();
    await getTrigger().press('Enter');
    // should be open initially
    await expect(getListbox()).toBeVisible();

    await getTrigger().focus();
    await getTrigger().press('ArrowDown');
    const options = await getOptions();
    await expect(options[0]).toBeDisabled();
  });

  test(`GIVEN an open disable select with the first option disabled
        WHEN clicking the disabled option
        THEN the listbox should stay open`, async ({ page }) => {
    const { getTrigger, getListbox, getOptions } = await setup(
      page,
      'select-disabled-test',
    );

    await getTrigger().focus();
    await getTrigger().press('Enter');
    // should be open initially
    await expect(getListbox()).toBeVisible();

    const options = await getOptions();
    // eslint-disable-next-line playwright/no-force-option
    await options[0].click({ force: true });
    await expect(getListbox()).toBeVisible();
  });

  test(`GIVEN an open disabled select
        WHEN first option is disabled
        THEN the second option should have data-highlighted`, async ({ page }) => {
    const { getTrigger, getListbox, getOptions } = await setup(
      page,
      'select-disabled-test',
    );

    await getTrigger().focus();
    await getTrigger().press('ArrowDown');
    // should be open initially
    await expect(getListbox()).toBeVisible();
    const options = await getOptions();
    await expect(options[1]).toHaveAttribute('data-highlighted');
  });

  test(`GIVEN an open disabled select
        WHEN the last option is disabled and the end key is pressed
        THEN the second last index should have data-highlighted`, async ({ page }) => {
    const { getTrigger, getListbox, getOptions } = await setup(
      page,
      'select-disabled-test',
    );

    await getTrigger().focus();
    await getTrigger().press('ArrowDown');
    // should be open initially
    await expect(getListbox()).toBeVisible();
    await getTrigger().press('End');
    const options = await getOptions();
    await expect(options[options.length - 2]).toHaveAttribute('data-highlighted');
  });
});
