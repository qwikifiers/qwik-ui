/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './dropdown.driver';

async function setup(page: Page, exampleName: string) {
  await page.goto(`/headless/dropdown/${exampleName}`);

  const driver = createTestDriver(page.getByTestId('dropdown'));

  return {
    driver,
  };
}

test.describe('Mouse Behavior', () => {
  test(`GIVEN a hero dropdown
        WHEN clicking on the trigger
        THEN open up the content AND aria-expanded should be true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.getTrigger().click();

    await expect(d.getContent()).toBeVisible();
    await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'true');
  });

  test(`GIVEN a hero dropdown with an open content
        WHEN the trigger is clicked
        THEN close the content AND aria-expanded should be false`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.openDropdown('click');

    await d.getTrigger().click();

    await expect(d.getContent()).toBeHidden();
    await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'false');
  });

  test(`GIVEN a hero dropdown with an open content
        WHEN an option with close on dropdown is clicked
        THEN close the content AND aria-expanded should be false`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.openDropdown('click');

    await d.getItemAt(0).click();

    await expect(d.getContent()).toBeHidden();
    await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'false');
  });

  test(`GIVEN a hero dropdown with an open content
        WHEN the first checkbox item is clicked
        THEN the first checkbox item should have aria-checked`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.openDropdown('click');

    await d.getItemAt(3).click();

    await expect(d.getItemAt(3)).toHaveAttribute('aria-checked', 'true');
  });

  test(`GIVEN a hero dropdown with an open content
        WHEN the first option of the radio group is clicked
        THEN the first option should have aria-checked`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.openDropdown('click');

    await d.getItemAt(5).click();

    await expect(d.getItemAt(5)).toHaveAttribute('aria-checked', 'true');
  });

  test(`GIVEN a hero dropdown with an open content
    WHEN the second option of the radio group is clicked
    THEN the first option should have aria-checked equal to false`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.openDropdown('click');

    await d.getItemAt(6).click();

    await expect(d.getItemAt(5)).toHaveAttribute('aria-checked', 'false');
    await expect(d.getItemAt(6)).toHaveAttribute('aria-checked', 'true');
  });

  test(`GIVEN a hero dropdown with an open content
        WHEN clicking on the group label
        THEN the content should remain open`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.openDropdown('click');

    const label = d.getRoot().getByRole('group').locator('span');

    await expect(label).toBeVisible();
    await label.click();
    await expect(d.getContent()).toBeVisible();
  });
});

test.describe('Keyboard Behavior', () => {
  test.describe('dropdown open / close', () => {
    test(`GIVEN a hero dropdown
    WHEN focusing the trigger and hitting enter
    THEN open up the dropdown AND aria-expanded should be true`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.getTrigger().focus();
      await d.getTrigger().press('Enter');

      await expect(d.getContent()).toBeVisible();
      await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'true');
    });

    test(`GIVEN a hero dropdown
        WHEN pressing the space key
        THEN open up the content AND aria-expanded should be true`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.getTrigger().focus();
      await d.getTrigger().press('Space');

      await expect(d.getContent()).toBeVisible();
      await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'true');
    });

    test(`GIVEN a hero dropdown
        WHEN pressing the down arrow key
        THEN open up the content AND aria-expanded should be true`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.getTrigger().focus();
      await d.getTrigger().press('ArrowDown');
      await expect(d.getContent()).toBeVisible();
    });

    test(`GIVEN a hero dropdown
      WHEN pressing the up arrow key
      THEN open up the content AND aria-expanded should be true`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.getTrigger().focus();
      await d.getTrigger().press('ArrowUp');
      await expect(d.getContent()).toBeVisible();
    });

    test(`GIVEN a hero dropdown with an opened content
        WHEN pressing the escape key
        THEN the content should close
        AND aria-expanded should be false`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openDropdown('click');

      await page.keyboard.press('Escape');

      await expect(d.getContent()).toBeHidden();
      await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    test(`GIVEN a hero dropdown with an opened content
          WHEN focusing something outside of the hero dropdown's trigger
          THEN the content should close
          AND aria-expanded should be false`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openDropdown('Enter');

      await page.keyboard.press('Tab');

      await expect(d.getContent()).toBeHidden();
      await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });
  });

  test.describe('data-highlighted navigation', () => {
    test(`GIVEN a hero dropdown
        WHEN pressing the down arrow key
        THEN the content should be opened
        AND the first option should have data-highlighted`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.getTrigger().focus();
      await d.getTrigger().press('ArrowDown');
      await expect(d.getContent()).toBeVisible();

      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN a hero dropdown
        WHEN pressing the enter key
        THEN open up the content
        AND the first option should have data-highlighted`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.getTrigger().focus();
      await d.getTrigger().press('Enter');
      await expect(d.getContent()).toBeVisible();

      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN a hero dropdown
        WHEN pressing the space key
        THEN open up the content
        AND the first option should have data-highlighted`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.getTrigger().focus();
      await d.getTrigger().press('Space');
      await expect(d.getContent()).toBeVisible();

      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN a hero dropdown
        WHEN pressing the up arrow
        THEN open up the content
        AND the first option should have data-highlighted`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.getTrigger().focus();
      await d.getTrigger().press('ArrowUp');
      await expect(d.getContent()).toBeVisible();

      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN an open hero dropdown
        WHEN pressing the end key
        THEN the last option should have data-highlighted`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openDropdown('Enter');

      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
      await d.getHighlightedItem().press('End');

      await expect(d.getItemAt('last')).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN an open hero dropdown
        WHEN pressing the home key after the end key
        THEN the first option should have data-highlighted`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openDropdown('Enter');

      // to last index
      await d.getHighlightedItem().press('End');
      await expect(d.getItemAt('last')).toHaveAttribute('data-highlighted');

      // to first index
      await d.getHighlightedItem().press('Home');
      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN an open hero dropdown
  WHEN the first option is highlighted and the down arrow key is pressed
  THEN the second option should have data-highlighted`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openDropdown('Enter');

      // first index highlighted

      await expect(d.getHighlightedItem()).toHaveAttribute('data-highlighted');

      await d.getHighlightedItem().focus();
      await d.getHighlightedItem().press('ArrowDown');
      await expect(d.getItemAt(1)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN an open hero dropdown
  WHEN the third option is highlighted and the up arrow key is pressed
  THEN the second option should have data-highlighted`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openDropdown('Enter');

      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
      await d.getHighlightedItem().press('ArrowDown');
      await d.getHighlightedItem().press('ArrowDown');

      await d.getHighlightedItem().press('ArrowUp');
      await expect(d.getItemAt(1)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN a hero dropdown with a chosen option
          AND the down arrow key is pressed
          THEN the data-highlighted option should not change on re-open`, async ({
      page,
    }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openDropdown('Enter');

      // second option highlighted
      await d.getHighlightedItem().press('ArrowDown');
      await expect(d.getItemAt(1)).toHaveAttribute('data-highlighted');
      await d.getHighlightedItem().press('Enter');
      await expect(d.getContent()).toBeHidden();

      await d.getHighlightedItem().press('ArrowDown');
      await expect(d.getItemAt(1)).toHaveAttribute('data-highlighted');
    });
  });

  test.describe('selecting options', () => {
    test(`GIVEN an opened hero dropdown with the first option highlighted
          WHEN the Enter key is pressed
          THEN the content should be closed and aria-expanded should be false IF the data-close-on-select attribute is present`, async ({
      page,
    }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openDropdown('Enter');

      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
      await d.getHighlightedItem().press('Enter');
      await expect(d.getContent()).toBeHidden();
      await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    test(`GIVEN an opened hero dropdown with the first option highlighted
          WHEN the Space key is pressed
          THEN the content should be closed and aria-expanded should be false IF the data-close-on-select attribute is present`, async ({
      page,
    }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openDropdown('Space');

      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
      await expect(d.getItemAt(0)).toHaveAttribute('data-close-on-select');
      await d.getHighlightedItem().press('Space');
      await expect(d.getContent()).toBeHidden();
      await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    test(`GIVEN an open dropdown
          WHEN an option is selected
          THEN focus should go back to the trigger IF the data-close-on-select attribute is present`, async ({
      page,
    }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openDropdown('Space');

      await d.getHighlightedItem().press('Enter');
      await expect(d.getTrigger()).toBeFocused();
    });

    test(`GIVEN an open dropdown with the first checkbox item is highlighted
      WHEN the Enter key is pressed
      THEN the first checkbox item should have aria-checked`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openDropdown('Space');

      await d.getHighlightedItem().press('ArrowDown');
      await d.getHighlightedItem().press('ArrowDown');
      await d.getHighlightedItem().press('Enter');

      await expect(d.getItemAt(3)).toHaveAttribute('aria-checked', 'true');
    });

    test(`GIVEN an open dropdown with the first checkbox item is highlighted
      WHEN the Space key is pressed
      THEN the first checkbox item should have aria-checked`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openDropdown('Space');

      await d.getHighlightedItem().press('ArrowDown');
      await d.getHighlightedItem().press('ArrowDown');
      await d.getHighlightedItem().press('Space');

      await expect(d.getItemAt(3)).toHaveAttribute('aria-checked', 'true');
    });

    test(`GIVEN an open dropdown with the first radio group item is highlighted
      WHEN the Enter key is pressed
      THEN the first radio group item should have aria-checked`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openDropdown('click');

      await d.getItemAt(5).click();
      await d.getHighlightedItem().press('End');
      await d.getHighlightedItem().press('ArrowUp');
      await d.getHighlightedItem().press('Enter');

      await expect(d.getItemAt(5)).toHaveAttribute('aria-checked', 'true');
    });

    test(`GIVEN an open dropdown with the first radio group item is highlighted
      WHEN the Space key is pressed
      THEN the first radio group item should have aria-checked`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openDropdown('click');

      await d.getItemAt(5).click();
      await d.getHighlightedItem().press('End');
      await d.getHighlightedItem().press('ArrowUp');
      await d.getHighlightedItem().press('Space');

      await expect(d.getItemAt(5)).toHaveAttribute('aria-checked', 'true');
    });

    test(`GIVEN an open dropdown with the second radio group item is highlighted
      WHEN the Enter key is pressed
      THEN the second radio group item should have aria-checked`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openDropdown('click');

      await d.getItemAt(5).click();
      await d.getHighlightedItem().press('End');
      await d.getHighlightedItem().press('Enter');

      await expect(d.getItemAt(5)).toHaveAttribute('aria-checked', 'false');
      await expect(d.getItemAt(6)).toHaveAttribute('aria-checked', 'true');
    });

    test(`GIVEN an open dropdown with the second radio group item is highlighted
      WHEN the Space key is pressed
      THEN the second radio group item should have aria-checked`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openDropdown('click');

      await d.getItemAt(5).click();
      await d.getHighlightedItem().press('End');
      await d.getHighlightedItem().press('Space');

      await expect(d.getItemAt(5)).toHaveAttribute('aria-checked', 'false');
      await expect(d.getItemAt(6)).toHaveAttribute('aria-checked', 'true');
    });
  });
});

test.describe('Disabled', () => {
  test(`GIVEN an open dropdown with the third option disabled    
        THEN It should have aria-disabled`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.openDropdown('Enter');
    await expect(d.getItemAt(2)).toBeDisabled();
  });

  test(`GIVEN an open dropdown 
    WHEN the third option disabled    
    THEN the fourth option should have data-highlighted after pressing Arrow Down two times`, async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.openDropdown('Enter');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');

    await expect(d.getItemAt(2)).toBeDisabled();
    await expect(d.getItemAt(3)).toHaveAttribute('data-highlighted');
  });

  test(`GIVEN an open disabled dropdown
        WHEN first option is disabled
        THEN the second option should have data-highlighted`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    await d.openDropdown('ArrowDown');

    await expect(d.getItemAt(1)).toHaveAttribute('data-highlighted');
  });
});
