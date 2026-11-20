import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './select.driver';
import { centerOf, recordPressEvents } from '../../utils/test-utils';

async function setup(page: Page, exampleName: string) {
  await page.goto(`/headless/select/${exampleName}`);

  const driver = createTestDriver(page.locator('[data-qui-select-root]'));

  return {
    driver,
  };
}

test.describe('Mouse Behavior', () => {
  test(`GIVEN a hero select
        WHEN clicking on the trigger
        THEN open up the listbox AND aria-expanded should be true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.getTrigger().click();

    await expect(d.getListbox()).toBeVisible();
    await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'true');
  });

  test(`GIVEN a hero select with an open listbox
        WHEN the trigger is clicked
        THEN close the listbox AND aria-expanded should be false`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.openListbox('click');

    await d.getTrigger().click();
    await expect(d.getListbox()).toBeHidden();
    await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'false');
  });

  test(`GIVEN a hero select with an open listbox
        WHEN an option is clicked
        THEN close the listbox AND aria-expanded should be false`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.openListbox('click');

    await d.getItemAt(0).click();

    await expect(d.getListbox()).toBeHidden();
    await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'false');
  });

  test(`GIVEN a hero select with an open listbox
        WHEN the 2nd option is clicked
        THEN the 2nd option should have aria-selected`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.openListbox('click');

    await d.getItemAt(1).click();

    await expect(d.getItemAt(1)).toHaveAttribute('aria-selected', 'true');
  });

  test(`GIVEN a hero select with an open listbox
        WHEN the 3rd option is clicked
        THEN the 3rd option should be the selected value`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.openListbox('click');

    const thirdOptStr = await d.getItemAt(2).textContent();
    await d.getItemAt(2).click();

    await expect(d.getItemAt(2)).toHaveAttribute('aria-selected', 'true');
    await expect(d.getValueElement()).toHaveText(thirdOptStr!);
  });

  test(`GIVEN a select
        WHEN adding new users and selecting a new user
        THEN the new user should be the selected value`, async ({ page }) => {
    const { driver: d } = await setup(page, 'add-users');

    await page.getByRole('button', { name: 'Add Users' }).click();

    await expect(d.getItems()).toHaveCount(8);

    await d.openListbox('click');
    const expectedValue = 'Bob';

    await expect(d.getItemAt(7)).toHaveText(expectedValue);
    await d.getItemAt(7).click();
    await expect(d.getValueElement()).toHaveText(expectedValue);
  });

  test(`GIVEN an open hero select
        WHEN clicking on the group label
        THEN the listbox should remain open`, async ({ page }) => {
    const { driver: d } = await setup(page, 'group');

    await d.openListbox('click');

    const label = d.getRoot().locator('[data-group-label]').first();

    await expect(label).toBeVisible();
    await label.click();
    await expect(d.getListbox()).toBeVisible();
  });
});

test.describe('Keyboard Behavior', () => {
  test.describe('listbox open / close', () => {
    test(`GIVEN a hero select
    WHEN focusing the trigger and hitting enter
    THEN open up the listbox AND aria-expanded should be true`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.getTrigger().focus();
      await d.getTrigger().press('Enter');

      await expect(d.getListbox()).toBeVisible();
      await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'true');
    });

    test(`GIVEN a hero select with an open listbox
    WHEN focusing the trigger and hitting enter
    THEN close the listbox AND aria-expanded should be false`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('click');

      await d.getTrigger().focus();
      await d.getTrigger().press('Enter');
      await expect(d.getListbox()).toBeHidden();
      await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    test(`GIVEN a hero select
        WHEN pressing the space key
        THEN open up the listbox AND aria-expanded should be true`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.getTrigger().focus();
      await d.getTrigger().press('Space');

      await expect(d.getListbox()).toBeVisible();
      await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'true');
    });

    test(`GIVEN a hero select with an open listbox
        WHEN pressing the space key
        THEN close listbox AND aria-expanded should be false`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('Space');

      await d.getTrigger().focus();
      await d.getTrigger().press('Space');
      await expect(d.getListbox()).toBeHidden();
      await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    test(`GIVEN a hero select
        WHEN pressing the down arrow key
        THEN open up the listbox AND aria-expanded should be true`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.getTrigger().focus();
      await d.getTrigger().press('ArrowDown');
      await expect(d.getListbox()).toBeVisible();
    });

    test(`GIVEN a hero select with an opened listbox
        WHEN pressing the escape key
        THEN the listbox should close
        AND aria-expanded should be false`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('click');

      await d.getTrigger().focus();
      await d.getTrigger().press('Escape');
      await expect(d.getListbox()).toBeHidden();
      await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    test(`GIVEN a hero select with an opened listbox
          WHEN focusing something outside of the hero select's trigger
          THEN the listbox should close
          AND aria-expanded should be false`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('Enter');
      await d.getTrigger().press('Tab');
      await expect(d.getListbox()).toBeHidden();
      await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });
  });

  test.describe('data-highlighted navigation', () => {
    test(`GIVEN a hero select
        WHEN pressing the down arrow key
        THEN the listbox should be opened
        AND the first option should have data-highlighted`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.getTrigger().focus();
      await d.getTrigger().press('ArrowDown');
      await expect(d.getListbox()).toBeVisible();

      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN a hero select
        WHEN pressing the enter key
        THEN open up the listbox
        AND the first option should have data-highlighted`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.getTrigger().focus();
      await d.getTrigger().press('Enter');
      await expect(d.getListbox()).toBeVisible();

      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN a hero select
        WHEN pressing the space key
        THEN open up the listbox
        AND the first option should have data-highlighted`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.getTrigger().focus();
      await d.getTrigger().press('Space');
      await expect(d.getListbox()).toBeVisible();

      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN a hero select
        WHEN pressing the up arrow
        THEN open up the listbox
        AND the last option should have data-highlighted`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.getTrigger().focus();
      await d.getTrigger().press('ArrowUp');
      await expect(d.getListbox()).toBeVisible();

      await expect(d.getItemAt('last')).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN an open hero select
        WHEN pressing the end key
        THEN the last option should have data-highlighted`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('Enter');

      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
      await d.getHighlightedItem().press('End');

      await expect(d.getItemAt('last')).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN an open hero select
        WHEN pressing the home key after the end key
        THEN the first option should have data-highlighted`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('Enter');

      // to last index
      await d.getHighlightedItem().press('End');
      await expect(d.getItemAt('last')).toHaveAttribute('data-highlighted');

      // to first index
      await d.getHighlightedItem().press('Home');
      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN an open hero select
  WHEN the first option is highlighted and the down arrow key is pressed
  THEN the second option should have data-highlighted`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('Enter');

      // first index highlighted

      await expect(d.getHighlightedItem()).toHaveAttribute('data-highlighted');

      await d.getHighlightedItem().focus();
      await d.getHighlightedItem().press('ArrowDown');
      await expect(d.getItemAt(1)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN an open hero select
  WHEN the third option is highlighted and the up arrow key is pressed
  THEN the second option should have data-highlighted`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('Enter');

      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
      await d.getHighlightedItem().press('ArrowDown');
      await expect(d.getItemAt(1)).toHaveAttribute('data-highlighted');
      await d.getHighlightedItem().press('ArrowDown');
      await expect(d.getItemAt(2)).toHaveAttribute('data-highlighted');

      await d.getHighlightedItem().press('ArrowUp');
      await expect(d.getItemAt(1)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN a hero select with a chosen option
          AND the down arrow key is pressed
          THEN the data-highlighted option should not change on re-open`, async ({
      page,
    }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('Enter');

      // second option highlighted
      await d.getHighlightedItem().press('ArrowDown');
      await expect(d.getItemAt(1)).toHaveAttribute('data-highlighted');
      await d.getHighlightedItem().press('Enter');
      await expect(d.getListbox()).toBeHidden();

      await d.getHighlightedItem().press('ArrowDown');
      await expect(d.getItemAt(1)).toHaveAttribute('data-highlighted');
    });
  });

  test.describe('selecting options', () => {
    test(`GIVEN an opened select with the first option highlighted
          WHEN the Enter key is pressed
          THEN the listbox should be closed and aria-expanded should be false`, async ({
      page,
    }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('Enter');

      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
      await d.getHighlightedItem().press('Enter');
      await expect(d.getListbox()).toBeHidden();
      await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    test(`GIVEN an open select
          WHEN an option has data-highlighted
          AND the Enter key is pressed
          THEN option value should be the selected value
          AND should have an aria-selected of true`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('Enter');

      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
      const expectedValue = await d.getItemAt(0).textContent();
      await d.getHighlightedItem().press('Enter');
      await expect(d.getValueElement()).toHaveText(expectedValue!);
    });

    test(`GIVEN an open select
          WHEN an option has data-highlighted
          AND the Space key is pressed
          THEN the listbox should be closed and aria-expanded false`, async ({
      page,
    }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('Space');

      // second option highlighted
      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
      await d.getHighlightedItem().press('Space');
      await expect(d.getListbox()).toBeHidden();
      await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    test(`GIVEN an open hero select
          WHEN an option has data-highlighted
          AND the Space key is pressed
          THEN option value should be the selected value
          AND should have an aria-selected of true`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('Space');

      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
      const expectedValue = await d.getItemAt(0).textContent();
      await d.getItemAt(0).press('Space');
      await expect(d.getValueElement()).toHaveText(expectedValue!);
    });

    test(`GIVEN an open select
          WHEN an option is selected
          THEN focus should go back to the trigger`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('Space');

      await d.getHighlightedItem().press('Enter');
      await expect(d.getTrigger()).toBeFocused();
    });

    test(`GIVEN no selected item and a placeholder
          WHEN pressing the right arrow key once
          THEN the first enabled option should be selected and have aria-selected`, async ({
      page,
    }) => {
      const { driver: d } = await setup(page, 'hero');

      const firstItemValue = await d.getItemAt(0).textContent();
      await d.getTrigger().focus();
      await d.getTrigger().press('ArrowRight');

      expect(d.getValueElement()).toHaveText(firstItemValue!);
      await expect(d.getItemAt(0)).toHaveAttribute('aria-selected', 'true');
      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN no selected item and a placeholder
          WHEN pressing the right arrow key twice
          THEN the first enabled option should be selected and have aria-selected`, async ({
      page,
    }) => {
      const { driver: d } = await setup(page, 'hero');

      const firstItemValue = await d.getItemAt(0).textContent();
      const secondItemValue = await d.getItemAt(1).textContent();

      await d.getTrigger().press('ArrowRight');
      await expect(d.getValueElement()).toHaveText(firstItemValue!);
      await d.getTrigger().press('ArrowRight');

      await expect(d.getValueElement()).toHaveText(secondItemValue!);
      await expect(d.getItemAt(1)).toHaveAttribute('aria-selected', 'true');
      await expect(d.getItemAt(1)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN the second item is selected
          WHEN pressing the left arrow key
          THEN the first item should be selected and have aria-selected & data-highlighted`, async ({
      page,
    }) => {
      const { driver: d } = await setup(page, 'hero');

      // get initial selected value
      // const firstItemValue = await getOptionAt(0).textContent();
      await d.getTrigger().focus();
      await d.getTrigger().press('ArrowRight');
      await expect(d.getValueElement()).toHaveText('Tim');
      await d.getTrigger().press('ArrowRight');

      await d.getTrigger().press('ArrowLeft');
      await expect(d.getValueElement()).toHaveText('Tim');
      await expect(d.getItemAt(0)).toHaveAttribute('aria-selected', 'true');
      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
    });
  });

  test.describe('typeahead', () => {
    test(`GIVEN an open select with a typeahead support
          WHEN the user types in the letter "j"
          THEN the first option starting with the letter "j" should have data-highlighted`, async ({
      page,
    }) => {
      const { driver: d } = await setup(page, 'typeahead');
      await d.openListbox('ArrowDown');
      await d.getItemAt(0).press('j');
      const highlightedOpt = d.getRoot().locator('[data-highlighted]');
      await expect(highlightedOpt).toContainText('j', { ignoreCase: true });
    });

    test(`GIVEN an open select with a typeahead support
          WHEN the user types in the letter "j" twice
          THEN the second option starting with the letter "j" should have data-highlighted`, async ({
      page,
    }) => {
      const { driver: d } = await setup(page, 'typeahead');
      await d.openListbox('ArrowDown');

      await d.getHighlightedItem().pressSequentially('jj', { delay: 1250 });
      await expect(d.getHighlightedItem()).toContainText('jessie', { ignoreCase: true });
    });

    test(`GIVEN an open select with a typeahead support
          WHEN the user types in the letters "jjt"
          THEN the first option starting with the letter "t" should have data-highlighted`, async ({
      page,
    }) => {
      const { driver: d } = await setup(page, 'typeahead');
      await d.openListbox('ArrowDown');
      await d.getHighlightedItem().pressSequentially('jjt', { delay: 1250 });
      await expect(d.getHighlightedItem()).toContainText('tim', { ignoreCase: true });
    });

    test(`GIVEN an open select with typeahead support and multiple characters
          WHEN the user types in the letter "a"
          AND waits a bit, then types in the letter "je"
          THEN the first option starting with "je" should have data-highlighted`, async ({
      page,
    }) => {
      const { driver: d } = await setup(page, 'typeahead');
      await d.openListbox('ArrowDown');
      await d.getHighlightedItem().pressSequentially('a', { delay: 1500 });
      await d.getHighlightedItem().pressSequentially('je', { delay: 100 });
      await expect(d.getHighlightedItem()).toContainText('jessie', { ignoreCase: true });
    });

    test(`GIVEN an open select with typeahead support and multiple characters
          WHEN the user types in a letter that does not match any option
          THEN the data-highlighted value should not change.`, async ({ page }) => {
      const { driver: d } = await setup(page, 'typeahead');
      await d.openListbox('ArrowDown');
      await d.getHighlightedItem().pressSequentially('am', { delay: 1250 });
      await expect(d.getHighlightedItem()).toContainText('abby', { ignoreCase: true });
    });

    test(`GIVEN an open select with typeahead support and repeated characters
          WHEN the user types in a letter three times
          THEN the data-highlighted value should cycle through the options`, async ({
      page,
    }) => {
      const { driver: d } = await setup(page, 'typeahead');
      await d.openListbox('ArrowDown');
      await d.getHighlightedItem().pressSequentially('jjj', { delay: 1250 });
      await expect(d.getHighlightedItem()).toContainText('jim', { ignoreCase: true });
    });

    test(`GIVEN an open select with typeahead support and grouped options
          WHEN the user types a letter matching an option in one group
          AND the user types a letter matching an option in another group
          THEN the data-highlighted value should switch groups`, async ({ page }) => {
      const { driver: d } = await setup(page, 'group');
      await d.openListbox('ArrowDown');
      await d.getHighlightedItem().press('j');
      await expect(d.getHighlightedItem()).toContainText('Jim', { ignoreCase: true });
      await d.getHighlightedItem().press('d');
      await expect(d.getHighlightedItem()).toContainText('dog', { ignoreCase: true });
    });

    test(`GIVEN a closed select with typeahead support
          WHEN the user types a letter matching an option
          THEN the display value should first matching option`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');
      await d.getTrigger().press('j');
      await expect(d.getTrigger()).toHaveText('Jim');
    });

    test(`GIVEN a closed select with typeahead support
          WHEN the user types a letter matching an option
          THEN the first matching option should be selected`, async ({ page }) => {
      // ideally want to refactor this so that even if the test example is changed, the test will still pass, getting it more programmatically.
      const { driver: d } = await setup(page, 'hero');
      await d.getTrigger().focus();
      const char = 'j';
      await d.getTrigger().press(char);
      const firstJOption = d.getRoot().locator('[data-item]', { hasText: char }).nth(0);
      await expect(firstJOption).toHaveAttribute('aria-selected', 'true');
      await expect(firstJOption).toHaveAttribute('data-highlighted');
    });
  });

  test.describe('looping', () => {
    test.describe('loop disabled', () => {
      test(`GIVEN an open basic select
          AND the last option is data-highlighted
          WHEN the down key is pressed
          THEN data-highlighted should stay on the last option`, async ({ page }) => {
        const { driver: d } = await setup(page, 'hero');

        // initially last option is highlighted
        await d.openListbox('Enter');
        await d.getItemAt(0).press('End');
        await expect(d.getItemAt('last')).toHaveAttribute('data-highlighted');

        await d.getItemAt('last').press('ArrowDown');
        await expect(d.getItemAt('last')).toHaveAttribute('data-highlighted');
      });

      test(`GIVEN an open basic select
          AND the first option is data-highlighted
          WHEN the up arrow key is pressed
          THEN data-highlighted should stay on the first option`, async ({ page }) => {
        const { driver: d } = await setup(page, 'hero');

        await d.openListbox('Enter');
        const firstItem = d.getItemAt(0);
        await expect(firstItem).toHaveAttribute('data-highlighted');
        await firstItem.press('ArrowUp');
        await expect(firstItem).toHaveAttribute('data-highlighted');
      });

      test(`GIVEN a closed basic select
          AND the last option is selected
          WHEN the right arrow key is pressed
          THEN it should stay on the last option`, async ({ page }) => {
        const { driver: d } = await setup(page, 'hero');

        // initially last option is highlighted & listbox closed
        await d.openListbox('Enter');
        await d.getItemAt(0).press('End');

        const lastItem = d.getItemAt('last');
        await expect(lastItem).toHaveAttribute('data-highlighted');
        await lastItem.press('Enter');
        await expect(lastItem).toHaveAttribute('aria-selected', 'true');
        await expect(d.getListbox()).toBeHidden();

        await d.getTrigger().press('ArrowRight');
        await expect(lastItem).toHaveAttribute('data-highlighted');
        await expect(lastItem).toHaveAttribute('aria-selected', 'true');
      });

      test(`GIVEN a closed basic select
          AND the first option is selected
          WHEN the left arrow key is pressed
          THEN it should stay on the first option`, async ({ page }) => {
        const { driver: d } = await setup(page, 'hero');

        // initially first option is highlighted & listbox closed
        await d.openListbox('Enter');
        await expect(d.getListbox()).toBeVisible();
        await d.getItemAt(0).press('Enter');

        await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
        await expect(d.getItemAt(0)).toHaveAttribute('aria-selected', 'true');
        await expect(d.getListbox()).toBeHidden();

        await d.getTrigger().focus();
        await d.getTrigger().press('ArrowLeft');
        await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
        await expect(d.getItemAt(0)).toHaveAttribute('aria-selected', 'true');
      });
    });

    test.describe('loop enabled', () => {
      test(`GIVEN an open select with loop enabled
            AND the last option is data-highlighted
            WHEN the down arrow key is pressed
            THEN the first option should have data-highlighted`, async ({ page }) => {
        const { driver: d } = await setup(page, 'loop');

        // initially last option is highlighted
        await d.openListbox('Enter');
        await d.getHighlightedItem().press('End');

        await expect(d.getItemAt('last')).toHaveAttribute('data-highlighted');

        await d.getHighlightedItem().press('ArrowDown');
        await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
      });

      test(`GIVEN an open select with loop enabled
            AND the first option is data-highlighted
            WHEN the up arrow key is pressed
            THEN the last option should have data-highlighted`, async ({ page }) => {
        const { driver: d } = await setup(page, 'loop');

        // initially last option is highlighted
        await d.openListbox('Enter');
        await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');

        await d.getHighlightedItem().press('ArrowUp');
        await expect(d.getItemAt('last')).toHaveAttribute('data-highlighted');
      });

      test(`GIVEN a closed select with loop enabled
            AND the last option is selected
            WHEN the right arrow key is pressed
            THEN it should loop to the first option`, async ({ page }) => {
        const { driver: d } = await setup(page, 'loop');

        // initially last option is highlighted
        await d.openListbox('Enter');
        await d.getHighlightedItem().press('End');
        await expect(d.getItemAt('last')).toHaveAttribute('data-highlighted');
        await d.getHighlightedItem().press('Enter');

        await expect(d.getListbox()).toBeHidden();

        await expect(d.getItemAt('last')).toHaveAttribute('aria-selected', 'true');

        await d.getTrigger().focus();
        await d.getTrigger().press('ArrowRight');
        await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
        await expect(d.getItemAt(0)).toHaveAttribute('aria-selected', 'true');
      });

      test(`GIVEN a closed select with loop enabled
            AND the first option is selected
            WHEN the right arrow key is pressed
            THEN it should loop to the first option`, async ({ page }) => {
        const { driver: d } = await setup(page, 'loop');

        // initially select first option
        await d.openListbox('Enter');
        await d.getHighlightedItem().press('Enter');

        await expect(d.getListbox()).toBeHidden();

        await expect(d.getItemAt(0)).toHaveAttribute('aria-selected', 'true');

        await d.getTrigger().focus();
        await d.getTrigger().press('ArrowLeft');
        await expect(d.getItemAt('last')).toHaveAttribute('data-highlighted');
        await expect(d.getItemAt('last')).toHaveAttribute('aria-selected', 'true');
      });
    });
  });

  test(`GIVEN an open select with multiple groups and a scrollable listbox
        AND the last option is not visible
        WHEN the end key is pressed
        THEN the last option should be visible`, async ({ page }) => {
    const { driver: d } = await setup(page, 'scrollable');

    await d.openListbox('Enter');

    await d.getHighlightedItem().press('End');

    await expect(d.getItemAt('last')).toBeInViewport();
  });
});

test.describe('Disabled', () => {
  test(`GIVEN an open disabled select with the first option disabled
        WHEN clicking the disabled option
        It should have aria-disabled`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    await d.openListbox('Enter');
    await d.getHighlightedItem().press('ArrowDown');
    await expect(d.getItemAt(0)).toBeDisabled();
  });

  test(`GIVEN an open disabled select
        WHEN first option is disabled
        THEN the second option should have data-highlighted`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    await d.openListbox('ArrowDown');

    await expect(d.getItemAt(1)).toHaveAttribute('data-highlighted');
  });

  test(`GIVEN an open disabled select
        WHEN the last option is disabled and the end key is pressed
        THEN the second last index should have data-highlighted`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    await d.openListbox('ArrowDown');
    await d.getHighlightedItem().press('End');
    const length = await d.getItemsLength();
    const lastEnabledOption = d.getItemAt(length - 2);
    await expect(lastEnabledOption).toHaveAttribute('data-highlighted');
  });

  test(`GIVEN an open disabled select
        WHEN the second option is highlighted and the down arrow key is pressed
        AND the first and third options are disabled
        THEN the fourth option should be highlighted`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    await d.openListbox('ArrowDown');
    await expect(d.getItemAt(1)).toHaveAttribute('data-highlighted');
    await d.getHighlightedItem().press('ArrowDown');
    await expect(d.getItemAt(3)).toHaveAttribute('data-highlighted');
  });

  test(`GIVEN an open disabled select
        WHEN the fourth is highlighted and the up key is pressed
        AND the first and third options are disabled
        THEN the second option should be highlighted`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    // initially the fourh option is highlighted
    await d.openListbox('ArrowDown');
    const secondOption = await d.getItemAt(1);
    await expect(secondOption).toHaveAttribute('data-highlighted');
    await d.getHighlightedItem().press('ArrowDown');
    await expect(d.getItemAt(3)).toHaveAttribute('data-highlighted');

    await d.getHighlightedItem().press('ArrowUp');
    await expect(secondOption).toHaveAttribute('data-highlighted');
  });

  test('typing a letter on a closed select skips a disabled option that starts with it', async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'disabled');

    await d.getTrigger().press('j');

    await expect(d.getTrigger()).toHaveText('Joan');
  });

  test('typing a letter that only a disabled option starts with keeps the selected option', async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'disabled');
    await d.getTrigger().press('r');
    await expect(d.getTrigger()).toHaveText('Ryan');

    await d.getTrigger().press('t');
    await d.openListbox('ArrowDown');

    await expect(d.getTrigger()).toHaveText('Ryan');
  });

  test('typing several letters skips a disabled option that starts with them', async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'test-typeahead-disabled');
    await d.getTrigger().press('j');
    await expect(d.getTrigger()).toHaveText('Joan');

    await d.getTrigger().press('i');

    await expect(d.getTrigger()).toHaveText('Jimmy');
  });

  test('typing a letter on an open select skips a disabled option that starts with it', async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'disabled');
    await d.openListbox('ArrowDown');

    await d.getHighlightedItem().press('j');

    await expect(d.getItemAt(4)).toHaveAttribute('data-highlighted');
  });
});

test.describe('Props', () => {
  test('a listbox with shift stays inside the viewport', async ({ page }) => {
    await page.setViewportSize({ width: 900, height: 500 });
    const { driver: d } = await setup(page, 'test-shift');

    await d.getTrigger().click();
    await expect(d.getListbox()).toBeVisible();

    const rightEdge = await d
      .getListbox()
      .evaluate((listbox) => listbox.getBoundingClientRect().right);
    expect(rightEdge).toBeLessThanOrEqual(900);
    await expect(d.getListbox()).not.toHaveAttribute('shift');
  });

  test(`GIVEN a basic select
        WHEN there is a placeholder
        THEN the placeholder should be presented instead of a selected value`, async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'hero');

    await expect(d.getValueElement()).toHaveText('Select an option');
  });

  test(`GIVEN a select with an onChange$ prop
        WHEN the select value changes
        THEN the placeholder should be presented instead of a selected value`, async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'change-value');

    await d.openListbox('click');

    await d.getItemAt(3).click();

    const sibling = d.getRoot().locator('+ p');
    await expect(sibling).toHaveText('You have changed 1 times');
  });

  test(`GIVEN a select with an onOpenChange$ prop
        WHEN the select value changes
        THEN the placeholder should be presented instead of a selected value`, async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'open-change');

    await d.openListbox('click');

    const sibling = d.getRoot().locator('+ p');
    await expect(sibling).toHaveText('The listbox opened and closed 1 time(s)');
  });

  test.describe('uncontrolled', () => {
    test(`GIVEN an uncontrolled select with a value prop on the root component
          WHEN the value data matches the fourth option
          THEN the selected value should be the data passed to the value prop
          AND the fourth option should have data-highlighted
          AND aria-selected set to true`, async ({ page }) => {
      const { driver: d } = await setup(page, 'uncontrolled');

      const expectedValue = await d.getItemAt(3).textContent();

      await expect(d.getValueElement()).toHaveText(expectedValue!);
      await expect(d.getItemAt(3)).toHaveAttribute('data-highlighted');
      await expect(d.getItemAt(3)).toHaveAttribute('aria-selected', 'true');
    });

    test(`
      GIVEN a select
      WHEN the first option is selected on render
      THEN the first option should be displayed`, async ({ page }) => {
      const { driver: d } = await setup(page, 'first-value-selected');

      const expectedValue = await d.getItemAt(0).textContent();

      await expect(d.getValueElement()).toHaveText(expectedValue!);
      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
      await expect(d.getItemAt(0)).toHaveAttribute('aria-selected', 'true');
    });
  });

  test.describe('controlled', () => {
    test(`GIVEN a controlled select with a bind:value prop on the root component
          WHEN the signal data matches the second option
          THEN the selected value should be the data passed to the bind:value prop
          AND should should have data-highlighted
          AND aria-selected set to true`, async ({ page }) => {
      const { driver: d } = await setup(page, 'controlled');

      const expectedValue = await d.getItemAt(1).textContent();

      await expect(d.getValueElement()).toContainText(expectedValue!);
      await expect(d.getItemAt(1)).toHaveAttribute('data-highlighted');
      await expect(d.getItemAt(1)).toHaveAttribute('aria-selected', 'true');
    });

    test(`GIVEN a controlled closed select with a bind:open prop on the root component
    WHEN the bind:open signal changes to true
    THEN the listbox should open to reflect the new signal value`, async ({ page }) => {
      const { driver: d } = await setup(page, 'bind-open');

      await expect(d.getListbox()).toBeHidden();

      page.getByRole('button', { name: 'Toggle open state' }).click();

      await expect(d.getListbox()).toBeVisible();
    });
  });

  test.describe('option value', () => {
    test(`GIVEN a select with distinct display and option values
          WHEN the 2nd option is selected
          THEN the selected value matches the 2nd option's value`, async ({ page }) => {
      const { driver: d } = await setup(page, 'item-value');

      await d.openListbox('Enter');

      await expect(page.locator('p')).toContainText('The selected value is: null');
      await d.getHighlightedItem().press('ArrowDown');
      await expect(d.getItemAt(1)).toHaveAttribute('data-highlighted');
      await d.getHighlightedItem().press('Enter');

      await expect(page.locator('p')).toContainText('The selected value is: 1');
    });

    test(`GIVEN a select with distinct display and option values
          WHEN a controlled value is set to the 5th option
          THEN the selected value matches the 5th option's value`, async ({ page }) => {
      const { driver: d } = await setup(page, 'controlled-value');

      await expect(d.getTrigger()).toHaveText('Ryan');
      await page.getByRole('button', { name: 'Change to Abby' }).click();

      await expect(d.getTrigger()).toHaveText(`Abby`);
    });

    test(`GIVEN a select with distinct display and option values
          WHEN the 5th option is selected
          AND it clicks another option
          AND it goes back to the 5th option programmatically
          THEN the bind:value signal should update to reflect the 5th option's value`, async ({
      page,
    }) => {
      const { driver: d } = await setup(page, 'controlled-value');

      await expect(d.getTrigger()).toHaveText('Ryan');
      // setup
      await page.getByRole('button', { name: 'Change to Abby' }).click();
      await expect(d.getTrigger()).toHaveText(`Abby`);

      await d.openListbox('click');
      await d.getItemAt(1).click();
      await expect(d.getTrigger()).toHaveText(`Ryan`);
      await page.getByRole('button', { name: 'Change to Abby' }).click();
      await expect(d.getTrigger()).toHaveText(`Abby`);
    });
  });
});

test.describe('A11y', () => {
  test('Axe Validation Test', async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    const initialResults = await new AxeBuilder({ page })
      .include('[data-qui-select-root]')
      .analyze();

    expect(initialResults.violations).toEqual([]);

    await d.openListbox('click');

    const afterClickResults = await new AxeBuilder({ page })
      .include('[data-qui-select-root]')
      .analyze();

    expect(afterClickResults.violations).toEqual([]);
  });

  test('the trigger is a combobox named by the label', async ({ page }) => {
    await setup(page, 'hero');

    await expect(page.getByRole('combobox', { name: 'Logged in users' })).toBeVisible();
  });

  test('the trigger of a required select is required for screen readers', async ({
    page,
  }) => {
    await setup(page, 'test-required');

    await expect(page.getByRole('combobox')).toHaveAttribute('aria-required', 'true');
  });

  test('the trigger of a select with an error message is invalid for screen readers', async ({
    page,
  }) => {
    await setup(page, 'test-required?error=on');

    await expect(page.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
  });

  test('the trigger of a select without an error message is not invalid', async ({
    page,
  }) => {
    await setup(page, 'test-required');

    await expect(page.getByRole('combobox')).not.toHaveAttribute('aria-invalid', 'true');
  });

  test(`GIVEN a select with a group
        WHEN the user adds a new group
        THEN the group should have an aria-labelledby attribute
        AND its associated label`, async ({ page }) => {
    const { driver: d } = await setup(page, 'group');
    await d.openListbox('ArrowDown');
    const labelId = await d
      .getRoot()
      .locator('[data-group-label]')
      .first()
      .getAttribute('id');

    await expect(d.getRoot().getByRole('group').first()).toHaveAttribute(
      'aria-labelledby',
      labelId!,
    );
  });

  test(`GIVEN a select with aria-controls
        WHEN the select renders
        THEN the trigger's aria-controls should be equal to the ID of the listbox`, async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'hero');
    await d.openListbox('Enter');
    const listboxId = await d.getListbox().getAttribute('id');

    await expect(d.getTrigger()).toHaveAttribute('aria-controls', `${listboxId}`);
  });

  test(`GIVEN a multi-select
        WHEN the select renders
        THEN the listbox should have aria-multiselectable to true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'multiple');
    await d.openListbox('Enter');

    await expect(d.getListbox()).toHaveAttribute('aria-multiselectable', 'true');
  });
});

test.describe('Multiple Selection', () => {
  test.describe('mouse behavior', () => {
    test(`GIVEN a multi select
        WHEN clicking an option
        THEN the option should be selected
        AND the listbox should remain open`, async ({ page }) => {
      const { driver: d } = await setup(page, 'multiple');
      await d.openListbox('click');
      await d.getItemAt(0).click();
      await expect(d.getItemAt(0)).toHaveAttribute('aria-selected', 'true');
      await expect(d.getListbox()).toBeVisible();
    });

    test(`GIVEN a multi select
        WHEN clicking one option
        AND another option
        THEN both options should be selected`, async ({ page }) => {
      const { driver: d } = await setup(page, 'multiple');
      await d.openListbox('click');
      await d.getItemAt(0).click();
      await d.getItemAt(1).click();
      await expect(d.getItemAt(0)).toHaveAttribute('aria-selected', 'true');
      await expect(d.getItemAt(1)).toHaveAttribute('aria-selected', 'true');
    });

    test(`GIVEN a multi select
          WHEN clicking one option
          AND clicking the same option again
          THEN it should toggle between selected and unselected`, async ({ page }) => {
      const { driver: d } = await setup(page, 'multiple');
      await d.openListbox('click');
      await d.getItemAt(0).click();
      await expect(d.getItemAt(0)).toHaveAttribute('aria-selected', 'true');
      await d.getItemAt(0).click();
      await expect(d.getItemAt(0)).toHaveAttribute('aria-selected', 'false');
    });

    test(`GIVEN a multi select
        WHEN clicking one option
        AND clicking another option
        THEN the selected value should contain both options`, async ({ page }) => {
      const { driver: d } = await setup(page, 'multiple');
      await d.openListbox('click');
      await d.getItemAt(0).click();
      await expect(d.getItemAt(0)).toHaveAttribute('aria-selected', 'true');
      await d.getItemAt(1).click();
      await expect(d.getItemAt(1)).toHaveAttribute('aria-selected', 'true');

      await expect(d.getValueElement()).toHaveText('Tim, Ryan');
    });
  });

  test.describe('keyboard behavior', () => {
    for (const key of ['Enter', 'Space']) {
      test(`GIVEN an open multi select
            WHEN pressing the ${key} key
            AND pressing the ${key} key again
            THEN the selected option should toggle between selected and unselected`, async ({
        page,
      }) => {
        const { driver: d } = await setup(page, 'multiple');
        await d.openListbox('Enter');
        await d.getHighlightedItem().press(key);
        await expect(d.getItemAt(0)).toHaveAttribute('aria-selected', 'true');
        await d.getHighlightedItem().press(key);
        await expect(d.getItemAt(0)).toHaveAttribute('aria-selected', 'false');
      });
    }

    test(`GIVEN a multi select
          WHEN selecting an option
          AND hitting the escape key
          THEN the listbox should be closed`, async ({ page }) => {
      const { driver: d } = await setup(page, 'multiple');
      await d.openListbox('click');
      await d.getItemAt(0).click();
      await expect(d.getItemAt(0)).toHaveAttribute('aria-selected', 'true');
      await d.getHighlightedItem().press('Escape');
      await expect(d.getListbox()).toBeHidden();
    });

    test(`GIVEN a multi select
          WHEN hitting the shift + arrow down key
          THEN focus should move to the next option, and toggle that option`, async ({
      page,
    }) => {
      const { driver: d } = await setup(page, 'multiple');
      await d.openListbox('Enter');
      await d.getHighlightedItem().press('Shift+ArrowDown');
      await expect(d.getItemAt(1)).toHaveAttribute('data-highlighted');
      await expect(d.getItemAt(1)).toHaveAttribute('aria-selected', 'true');
    });

    test(`GIVEN a multi select
          WHEN hitting the shift + arrow up key
          THEN focus should move to the previous option, and toggle that option`, async ({
      page,
    }) => {
      const { driver: d } = await setup(page, 'multiple');
      // initial setup
      await d.openListbox('Enter');
      await d.getHighlightedItem().press('ArrowDown');
      await expect(d.getItemAt(1)).toHaveAttribute('data-highlighted');

      await d.getHighlightedItem().press('Shift+ArrowUp');
      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
      await expect(d.getItemAt(0)).toHaveAttribute('aria-selected', 'true');
    });
  });
});

test.describe('Modal', () => {
  test('by default, the press that closes the listbox reaches the button it lands on', async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'test-modal?modal=off');
    await d.getTrigger().click();
    await expect(d.getListbox()).toBeVisible();
    const outside = page.getByTestId('outside');
    const seenEvents = await recordPressEvents(outside);
    const { x, y } = await centerOf(outside);

    await page.mouse.click(x, y);

    await expect(d.getListbox()).toBeHidden();
    await expect(outside).toHaveText('outside clicks: 1');
    expect(await seenEvents()).toContain('click');
  });

  test('with modal, the press that closes the listbox does not reach the button it lands on', async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'test-modal');
    await d.getTrigger().click();
    await expect(d.getListbox()).toBeVisible();
    const outside = page.getByTestId('outside');
    const seenEvents = await recordPressEvents(outside);
    const { x, y } = await centerOf(outside);

    await page.mouse.click(x, y);

    await expect(d.getListbox()).toBeHidden();
    expect(await seenEvents()).toEqual([]);
    await expect(outside).toHaveText('outside clicks: 0');
  });

  test('with modal, an outside button is not hovered while the listbox is open', async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'test-modal');
    await d.getTrigger().click();
    await expect(d.getListbox()).toBeVisible();
    const outside = page.getByTestId('outside');
    const { x, y } = await centerOf(outside);

    await page.mouse.move(x, y);

    expect(await outside.evaluate((button) => button.matches(':hover'))).toBe(false);
  });

  test('by default, an outside button stays exposed to screen readers while the listbox is open', async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'test-modal?modal=off');
    await d.getTrigger().click();
    await expect(d.getListbox()).toBeVisible();

    await expect(page.getByRole('button', { name: /outside clicks/ })).toHaveCount(1);
  });

  test('with modal, an outside button is hidden from screen readers while the listbox is open', async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'test-modal');
    await d.getTrigger().click();
    await expect(d.getListbox()).toBeVisible();
    await expect(page.getByRole('button', { name: /outside clicks/ })).toHaveCount(0);

    await d.getTrigger().click();
    await expect(d.getListbox()).toBeHidden();

    await expect(page.getByRole('button', { name: /outside clicks/ })).toHaveCount(1);
  });

  test('with modal, the page does not scroll while the listbox is open', async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'test-modal');
    await expect(page.locator('body')).toHaveCSS('overflow', 'visible');

    await d.getTrigger().click();
    await expect(d.getListbox()).toBeVisible();
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');

    await d.getTrigger().click();
    await expect(d.getListbox()).toBeHidden();
    await expect(page.locator('body')).toHaveCSS('overflow', 'visible');
  });

  test('with modal, a click on the trigger still closes the listbox', async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'test-modal');
    await d.getTrigger().click();
    await expect(d.getListbox()).toBeVisible();

    await d.getTrigger().click();

    await expect(d.getListbox()).toBeHidden();
  });

  test('with modal, a click on an option still selects it', async ({ page }) => {
    const { driver: d } = await setup(page, 'test-modal');
    await d.getTrigger().click();
    await expect(d.getListbox()).toBeVisible();

    await d.getItemAt(1).click();

    await expect(d.getListbox()).toBeHidden();
    await expect(d.getTrigger()).toHaveText('Ryan');
  });

  test.describe('touch', () => {
    test.use({ hasTouch: true });

    test('with modal, a tap outside only closes the listbox', async ({ page }) => {
      const { driver: d } = await setup(page, 'test-modal');
      await d.getTrigger().tap();
      await expect(d.getListbox()).toBeVisible();
      const outside = page.getByTestId('outside');
      const seenEvents = await recordPressEvents(outside);
      const { x, y } = await centerOf(outside);

      await page.touchscreen.tap(x, y);

      await expect(d.getListbox()).toBeHidden();
      expect(await seenEvents()).toEqual([]);
      await expect(outside).toHaveText('outside clicks: 0');
    });
  });
});

test.describe('Styles', () => {
  test('a closed listbox laid out with flex stays hidden', async ({ page }) => {
    const { driver: d } = await setup(page, 'test-flex-panel');

    await expect(d.getTrigger()).toBeVisible();
    await expect(page.locator('[popover]')).toBeHidden();
  });

  test('a listbox laid out with flex shows when open', async ({ page }) => {
    const { driver: d } = await setup(page, 'test-flex-panel');

    await d.getTrigger().click();

    await expect(d.getListbox()).toBeVisible();
    await expect(d.getListbox()).toHaveCSS('display', 'flex');
  });

  test('a listbox laid out with flex is hidden again once closed', async ({ page }) => {
    const { driver: d } = await setup(page, 'test-flex-panel');
    await d.getTrigger().click();
    await expect(d.getListbox()).toBeVisible();

    await d.getTrigger().click();

    await expect(page.locator('[popover]')).toBeHidden();
  });
});
