import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './select.driver';
async function setup(page: Page, exampleName: string) {
  await page.goto(`/headless/select/${exampleName}`);

  const driver = createTestDriver(page.getByRole('combobox'));

  const {
    getRoot,
    getListbox,
    getTrigger,
    getOptionAt,
    getLastOption,
    getValue,
    openListbox,
  } = driver;

  return {
    driver,
    getRoot,
    getListbox,
    getTrigger,
    getLastOption,
    getOptionAt,
    getValue,
    openListbox,
  };
}

test.describe('Mouse Behavior', () => {
  test(`GIVEN a hero select
        WHEN clicking on the trigger
        THEN open up the listbox AND aria-expanded should be true`, async ({ page }) => {
    const { getTrigger, getListbox } = await setup(page, 'hero');

    await getTrigger().click();

    await expect(getListbox()).toBeVisible();
    await expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
  });

  test(`GIVEN a hero select with an open listbox
        WHEN the trigger is clicked
        THEN close the listbox AND aria-expanded should be false`, async ({ page }) => {
    const { getTrigger, getListbox, openListbox } = await setup(page, 'hero');

    await openListbox('click');

    await getTrigger().click();
    await expect(getListbox()).toBeHidden();
    await expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
  });

  test(`GIVEN a hero select with an open listbox
        WHEN an option is clicked
        THEN close the listbox AND aria-expanded should be false`, async ({ page }) => {
    const { getTrigger, getListbox, getOptionAt, openListbox } = await setup(
      page,
      'hero',
    );

    await openListbox('click');

    await getOptionAt(0).click();

    await expect(getListbox()).toBeHidden();
    await expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
  });

  test(`GIVEN a hero select with an open listbox
        WHEN the 2nd option is clicked
        THEN the 2nd option should have aria-selected`, async ({ page }) => {
    const { getOptionAt, openListbox } = await setup(page, 'hero');

    await openListbox('click');

    const option = getOptionAt(1);
    await option.click();

    await expect(option).toHaveAttribute('aria-selected', 'true');
  });

  test(`GIVEN a hero select with an open listbox
        WHEN the 3rd option is clicked
        THEN the 3rd option should be the selected value`, async ({ page }) => {
    const { getOptionAt, getValue, openListbox } = await setup(page, 'hero');

    await openListbox('click');

    const option = await getOptionAt(2);
    const thirdOptStr = await option.textContent();
    await option.click();

    await expect(option).toHaveAttribute('aria-selected', 'true');
    expect(thirdOptStr).toEqual(await getValue());
  });

  test(`GIVEN a select
        WHEN adding new users and selecting a new user
        THEN the new user should be the selected value`, async ({ page }) => {
    const { getRoot, getOptionAt, openListbox, getValue } = await setup(
      page,
      'add-users',
    );

    const sibling = getRoot().locator('+ button');

    await expect(sibling).toHaveText('Add Users');
    await sibling.click();

    await openListbox('click');
    const option = await getOptionAt(7);
    await expect(option).toHaveText('Bob');
    await option.click();
    expect(await getValue()).toEqual(await option.textContent());
  });

  // if we want to add focusing the trigger on blur
  // test(`GIVEN a basic select
  //       WHEN the listbox is open and the blur event is triggered
  //       THEN focus should go back to the trigger`, async ({ page }) => {
  //   const { getTrigger, openListbox } = await setup(page, 'hero');

  //   await openListbox('click');
  //   await getTrigger().blur();
  //   await expect(getTrigger()).toBeFocused();
  // });

  test(`GIVEN an open hero select
        WHEN clikcking on the group label
        THEN the listbox should remain open`, async ({ page }) => {
    const { getRoot, openListbox, getListbox } = await setup(page, 'group');

    await openListbox('click');

    const label = getRoot().getByRole('listitem').first();

    await expect(label).toBeVisible();
    await label.click();
    await expect(getListbox()).toBeVisible();
  });
});

test.describe('Keyboard Behavior', () => {
  test.describe('listbox open / close', () => {
    test(`GIVEN a hero select
    WHEN focusing the trigger and hitting enter
    THEN open up the listbox AND aria-expanded should be true`, async ({ page }) => {
      const { getTrigger, getListbox } = await setup(page, 'hero');

      await getTrigger().focus();
      await getTrigger().press('Enter');

      await expect(getListbox()).toBeVisible();
      await expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
    });

    test(`GIVEN a hero select with an open listbox
    WHEN focusing the trigger and hitting enter
    THEN close the listbox AND aria-expanded should be false`, async ({ page }) => {
      const { getTrigger, getListbox, openListbox } = await setup(page, 'hero');

      await openListbox('click');

      await getTrigger().focus();
      await getTrigger().press('Enter');
      await expect(getListbox()).toBeHidden();
      await expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    test(`GIVEN a hero select
        WHEN pressing the space key
        THEN open up the listbox AND aria-expanded should be true`, async ({ page }) => {
      const { getTrigger, getListbox } = await setup(page, 'hero');

      await getTrigger().focus();
      await getTrigger().press('Space');

      await expect(getListbox()).toBeVisible();
      await expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
    });

    test(`GIVEN a hero select with an open listbox
        WHEN pressing the space key
        THEN close listbox AND aria-expanded should be false`, async ({ page }) => {
      const { getTrigger, getListbox, openListbox } = await setup(page, 'hero');

      await openListbox('Space');

      await getTrigger().focus();
      await getTrigger().press('Space');
      await expect(getListbox()).toBeHidden();
      await expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    test(`GIVEN a hero select
        WHEN pressing the down arrow key
        THEN open up the listbox AND aria-expanded should be true`, async ({ page }) => {
      const { getTrigger, getListbox } = await setup(page, 'hero');

      await getTrigger().focus();
      await getTrigger().press('ArrowDown');
      await expect(getListbox()).toBeVisible();
    });

    test(`GIVEN a hero select with an opened listbox
        WHEN pressing the escape key
        THEN the listbox should close
        AND aria-expanded should be false`, async ({ page }) => {
      const { getTrigger, getListbox, openListbox } = await setup(page, 'hero');

      await openListbox('click');

      await getTrigger().focus();
      await getTrigger().press('Escape');
      await expect(getListbox()).toBeHidden();
      await expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    test(`GIVEN a hero select with an opened listbox
          WHEN focusing something outside of the hero select's trigger
          THEN the listbox should close
          AND aria-expanded should be false`, async ({ page }) => {
      const { getTrigger, getListbox, openListbox } = await setup(page, 'hero');

      await openListbox('Enter');
      await getTrigger().press('Tab');
      await expect(getListbox()).toBeHidden();
      await expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });
  });

  test.describe('data-highlighted navigation', () => {
    test(`GIVEN a hero select
        WHEN pressing the down arrow key
        THEN open up the listbox
        AND the first option should have data-highlighted`, async ({ page }) => {
      const { getTrigger, getListbox, getOptionAt } = await setup(page, 'hero');

      await getTrigger().focus();
      await getTrigger().press('ArrowDown');
      await expect(getListbox()).toBeVisible();

      await expect(getOptionAt(0)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN a hero select
        WHEN pressing the enter key
        THEN open up the listbox
        AND the first option should have data-highlighted`, async ({ page }) => {
      const { getTrigger, getListbox, getOptionAt } = await setup(page, 'hero');

      await getTrigger().focus();
      await getTrigger().press('Enter');
      await expect(getListbox()).toBeVisible();

      await expect(getOptionAt(0)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN a hero select
        WHEN pressing the space key
        THEN open up the listbox
        AND the first option should have data-highlighted`, async ({ page }) => {
      const { getTrigger, getListbox, getOptionAt } = await setup(page, 'hero');

      await getTrigger().focus();
      await getTrigger().press('Space');
      await expect(getListbox()).toBeVisible();

      await expect(getOptionAt(0)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN a hero select
        WHEN pressing the up arrow
        THEN open up the listbox
        AND the first option should have data-highlighted`, async ({ page }) => {
      const { getTrigger, getListbox, getOptionAt } = await setup(page, 'hero');

      await getTrigger().focus();
      await getTrigger().press('ArrowUp');
      await expect(getListbox()).toBeVisible();

      await expect(getOptionAt(0)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN an open hero select
        WHEN pressing the end key
        THEN the last option should have data-highlighted`, async ({ page }) => {
      const { getTrigger, getLastOption, openListbox } = await setup(page, 'hero');

      await openListbox('click');

      await getTrigger().focus();
      await getTrigger().press('End');

      await expect(getLastOption()).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN an open hero select
        WHEN pressing the home key after the end key
        THEN the first option should have data-highlighted`, async ({ page }) => {
      const { getLastOption, getTrigger, getOptionAt, openListbox } = await setup(
        page,
        'hero',
      );

      await openListbox('click');

      // to last index
      await getTrigger().focus();
      await getTrigger().press('End');

      await expect(getLastOption()).toHaveAttribute('data-highlighted');

      // to first index
      await getTrigger().press('Home');
      await expect(getOptionAt(0)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN an open hero select
  WHEN the first option is highlighted and the down arrow key is pressed
  THEN the second option should have data-highlighted`, async ({ page }) => {
      const { getTrigger, getOptionAt, openListbox } = await setup(page, 'hero');

      await openListbox('Enter');

      // first index highlighted

      await expect(getOptionAt(0)).toHaveAttribute('data-highlighted');

      await getTrigger().focus();
      await getTrigger().press('ArrowDown');
      await expect(getOptionAt(1)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN an open hero select
  WHEN the third option is highlighted and the up arrow key is pressed
  THEN the second option should have data-highlighted`, async ({ page }) => {
      const { getTrigger, getOptionAt, openListbox } = await setup(page, 'hero');

      await openListbox('Enter');

      await expect(getOptionAt(0)).toHaveAttribute('data-highlighted');
      await getTrigger().press('ArrowDown');
      await getTrigger().press('ArrowDown');

      await getTrigger().press('ArrowUp');
      await expect(getOptionAt(1)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN a hero select with a chosen option
          AND the down arrow key is pressed
          THEN the data-highlighted option should not change on re-open`, async ({
      page,
    }) => {
      const { getTrigger, getListbox, getOptionAt, openListbox } = await setup(
        page,
        'hero',
      );

      await openListbox('Enter');

      // second option highlighted
      const option = await getOptionAt(1);
      await getTrigger().press('ArrowDown');
      await expect(option).toHaveAttribute('data-highlighted');
      await getTrigger().press('Enter');
      await expect(getListbox()).toBeHidden();

      await getTrigger().press('ArrowDown');
      await expect(option).toHaveAttribute('data-highlighted');
    });
  });

  test.describe('selecting options', () => {
    test(`GIVEN an open hero select
          WHEN an option has data-highlighted
          AND the Enter key is pressed
          THEN the listbox should be closed and aria-expanded false`, async ({
      page,
    }) => {
      const { getTrigger, getListbox, getOptionAt, openListbox } = await setup(
        page,
        'hero',
      );

      await openListbox('Enter');

      await expect(getOptionAt(0)).toHaveAttribute('data-highlighted');
      await getTrigger().press('Enter');
      await expect(getListbox()).toBeHidden();
      await expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    test(`GIVEN an open hero select
          WHEN an option has data-highlighted
          AND the Enter key is pressed
          THEN option value should be the selected value
          AND should have an aria-selected of true`, async ({ page }) => {
      const { getTrigger, getOptionAt, getValue, openListbox } = await setup(
        page,
        'hero',
      );

      await openListbox('Enter');

      const option = await getOptionAt(0);
      await expect(option).toHaveAttribute('data-highlighted');
      const optStr = await option.textContent();
      await getTrigger().press('Enter');

      const value = await getValue();
      expect(optStr).toEqual(value);
    });

    test(`GIVEN an open hero select
          WHEN an option has data-highlighted
          AND the Space key is pressed
          THEN the listbox should be closed and aria-expanded false`, async ({
      page,
    }) => {
      const { getTrigger, getListbox, getOptionAt, openListbox } = await setup(
        page,
        'hero',
      );

      await openListbox('Space');

      // second option highlighted
      await expect(getOptionAt(0)).toHaveAttribute('data-highlighted');
      await getTrigger().press('Space');
      await expect(getListbox()).toBeHidden();
      await expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    test(`GIVEN an open hero select
          WHEN an option has data-highlighted
          AND the Space key is pressed
          THEN option value should be the selected value
          AND should have an aria-selected of true`, async ({ page }) => {
      const { getTrigger, getOptionAt, getValue, openListbox } = await setup(
        page,
        'hero',
      );

      await openListbox('Space');

      const option = await getOptionAt(0);
      await expect(option).toHaveAttribute('data-highlighted');
      const optStr = await option.textContent();
      await getTrigger().press('Space');

      expect(optStr).toEqual(await getValue());
    });

    test(`GIVEN a basic select
          WHEN pressing the right arrow key
          AND the placeholder is the selected value
          THEN select the first enabled option
          AND the first enabled option should have aria-selected`, async ({ page }) => {
      const { getTrigger, getOptionAt, getValue } = await setup(page, 'hero');

      const option = await getOptionAt(0);
      await getTrigger().focus();
      await getTrigger().press('ArrowRight', { delay: 500 });

      expect(await getValue()).toEqual(await option.textContent());
      await expect(option).toHaveAttribute('aria-selected', 'true');
      await expect(option).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN a basic select
          WHEN pressing the right arrow key
          AND there is a selected value
          THEN select the next enabled option
          AND the next enabled option should have aria-selected`, async ({ page }) => {
      const { getTrigger, getOptionAt, getValue } = await setup(page, 'hero');

      const option = await getOptionAt(1);
      await getTrigger().focus();
      await getTrigger().press('ArrowRight', { delay: 500 });
      await getTrigger().press('ArrowRight', { delay: 500 });

      expect(await getValue()).toEqual(await option.textContent());
      await expect(option).toHaveAttribute('aria-selected', 'true');
      await expect(option).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN a basic select
          WHEN pressing the left arrow key
          AND there is a selected value
          THEN select the previous enabled option
          AND the previous enabled option should have 
          aria-selected & data-highlighted`, async ({ page }) => {
      const { getTrigger, getOptionAt, getValue } = await setup(page, 'hero');

      // get initial selected value
      const option = await getOptionAt(0);
      await getTrigger().focus();
      await getTrigger().press('ArrowRight', { delay: 250 });
      await getTrigger().press('ArrowRight', { delay: 250 });

      await getTrigger().press('ArrowLeft', { delay: 250 });
      expect(await getValue()).toEqual(await option.textContent());
      await expect(option).toHaveAttribute('aria-selected', 'true');
      await expect(option).toHaveAttribute('data-highlighted');
    });
  });

  test.describe('typeahead', () => {
    test(`GIVEN an open select with a typeahead support
          WHEN the user types in the letter "j"
          THEN the first option starting with the letter "j" should have data-highlighted`, async ({
      page,
    }) => {
      const { getRoot, getTrigger, openListbox } = await setup(page, 'typeahead');
      await openListbox('ArrowDown');
      await getTrigger().pressSequentially('j', { delay: 250 });
      const highlightedOpt = getRoot().locator('[data-highlighted]');
      await expect(highlightedOpt).toContainText('j', { ignoreCase: true });
    });

    test(`GIVEN an open select with a typeahead support
          WHEN the user types in the letter "j" twice
          THEN the second option starting with the letter "j" should have data-highlighted`, async ({
      page,
    }) => {
      const { getRoot, getTrigger, openListbox } = await setup(page, 'typeahead');
      await openListbox('ArrowDown');
      await getTrigger().pressSequentially('jj', { delay: 1250 });
      const highlightedOpt = getRoot().locator('[data-highlighted]');
      await expect(highlightedOpt).toContainText('jessie', { ignoreCase: true });
    });

    test(`GIVEN an open select with a typeahead support
          WHEN the user types in the letters "jjt"
          THEN the first option starting with the letter "t" should have data-highlighted`, async ({
      page,
    }) => {
      const { getRoot, getTrigger, openListbox } = await setup(page, 'typeahead');
      await openListbox('ArrowDown');
      await getTrigger().pressSequentially('jjt', { delay: 1250 });
      const highlightedOpt = getRoot().locator('[data-highlighted]');
      await expect(highlightedOpt).toContainText('tim', { ignoreCase: true });
    });

    test(`GIVEN an open select with typeahead support and multiple characters
          WHEN the user types in the letter "a"
          AND waits a bit, then types in the letter "je"
          THEN the first option starting with "je" should have data-highlighted`, async ({
      page,
    }) => {
      const { getRoot, getTrigger, openListbox } = await setup(page, 'typeahead');
      await openListbox('ArrowDown');
      await getTrigger().pressSequentially('a', { delay: 1500 });
      await getTrigger().pressSequentially('je', { delay: 100 });
      const highlightedOpt = getRoot().locator('[data-highlighted]');
      await expect(highlightedOpt).toContainText('jessie', { ignoreCase: true });
    });

    test(`GIVEN an open select with typeahead support and multiple characters
          WHEN the user types in a letter that does not match any option
          THEN the data-highlighted value should not change.`, async ({ page }) => {
      const { getRoot, getTrigger, openListbox } = await setup(page, 'typeahead');
      await openListbox('ArrowDown');
      await getTrigger().pressSequentially('am', { delay: 1250 });
      const highlightedOpt = getRoot().locator('[data-highlighted]');
      await expect(highlightedOpt).toContainText('abby', { ignoreCase: true });
    });

    test(`GIVEN an open select with typeahead support and repeated characters
          WHEN the user types in a letter three times
          THEN the data-highlighted value should cycle through the options`, async ({
      page,
    }) => {
      const { getRoot, getTrigger, openListbox } = await setup(page, 'typeahead');
      await openListbox('ArrowDown');
      await getTrigger().pressSequentially('jjj', { delay: 1250 });
      const highlightedOpt = getRoot().locator('[data-highlighted]');
      await expect(highlightedOpt).toContainText('jim', { ignoreCase: true });
    });

    test(`GIVEN an open select with typeahead support and grouped options
          WHEN the user types a letter matching an option in one group
          AND the user types a letter matching an option in another group
          THEN the data-highlighted value should switch groups`, async ({ page }) => {
      const { getRoot, getTrigger, openListbox } = await setup(page, 'group');
      await openListbox('ArrowDown');
      await getTrigger().press('j');
      const highlightedOpt = getRoot().locator('[data-highlighted]');
      await expect(highlightedOpt).toContainText('Jim', { ignoreCase: true });
      await getTrigger().press('d');
      await expect(highlightedOpt).toContainText('dog', { ignoreCase: true });
    });

    test(`GIVEN a closed select with typeahead support
          WHEN the user types a letter matching an option
          THEN the display value should first matching option`, async ({ page }) => {
      const { getTrigger } = await setup(page, 'hero');
      await getTrigger().focus();
      await getTrigger().press('j');
      await expect(getTrigger()).toHaveText('Jim');
    });

    test(`GIVEN a closed select with typeahead support
          WHEN the user types a letter matching an option
          THEN the first matching option should be selected`, async ({ page }) => {
      // ideally want to refactor this so that even if the test example is changed, the test will still pass, getting it more programmatically.
      const { getRoot, getTrigger } = await setup(page, 'hero');
      await getTrigger().focus();
      await getTrigger().press('j');
      const firstJOption = getRoot().getByRole('option', {
        name: 'Jim',
        includeHidden: true,
      });
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
        const { getTrigger, getLastOption, openListbox } = await setup(page, 'hero');

        // initially last option is highlighted
        await openListbox('Enter');
        const trigger = getTrigger();
        await trigger.focus();
        await trigger.press('End');

        await expect(getLastOption()).toHaveAttribute('data-highlighted');

        await trigger.focus();
        await trigger.press('ArrowDown');
        await expect(getLastOption()).toHaveAttribute('data-highlighted');
      });

      test(`GIVEN an open basic select
          AND the first option is data-highlighted
          WHEN the up arrow key is pressed
          THEN data-highlighted should stay on the first option`, async ({ page }) => {
        const { getTrigger, getOptionAt, openListbox } = await setup(page, 'hero');

        await openListbox('Enter');
        const option = getOptionAt(0);
        await expect(option).toHaveAttribute('data-highlighted');
        await getTrigger().focus();
        await getTrigger().press('ArrowUp');
        await expect(option).toHaveAttribute('data-highlighted');
      });

      test(`GIVEN a closed basic select
          AND the last option is selected
          WHEN the right arrow key is pressed
          THEN it should stay on the last option`, async ({ page }) => {
        const { getTrigger, getLastOption, getListbox, openListbox } = await setup(
          page,
          'hero',
        );

        // initially last option is highlighted & listbox closed
        await openListbox('Enter');
        await getTrigger().focus();
        await getTrigger().press('End');
        const lastOption = getLastOption();
        await expect(lastOption).toHaveAttribute('data-highlighted');
        await getTrigger().press('Enter');
        await expect(lastOption).toHaveAttribute('aria-selected', 'true');
        await expect(getListbox()).toBeHidden();

        await getTrigger().focus();
        await getTrigger().press('ArrowRight');
        await expect(lastOption).toHaveAttribute('data-highlighted');
        await expect(lastOption).toHaveAttribute('aria-selected', 'true');
      });

      test(`GIVEN a closed basic select
          AND the first option is selected
          WHEN the left arrow key is pressed
          THEN it should stay on the first option`, async ({ page }) => {
        const { getTrigger, getOptionAt, getListbox, openListbox } = await setup(
          page,
          'hero',
        );

        // initially first option is highlighted & listbox closed
        await openListbox('Enter');
        await getTrigger().focus();
        await getTrigger().press('Enter');
        const option = await getOptionAt(0);
        await expect(option).toHaveAttribute('data-highlighted');
        await expect(option).toHaveAttribute('aria-selected', 'true');
        await expect(getListbox()).toBeHidden();

        await getTrigger().focus();
        await getTrigger().press('ArrowLeft');
        await expect(option).toHaveAttribute('data-highlighted');
        await expect(option).toHaveAttribute('aria-selected', 'true');
      });
    });

    test.describe('loop enabled', () => {
      test(`GIVEN an open select with loop enabled
            AND the last option is data-highlighted
            WHEN the down arrow key is pressed
            THEN the first option should have data-highlighted`, async ({ page }) => {
        const { getTrigger, getOptionAt, getLastOption, openListbox } = await setup(
          page,
          'loop',
        );

        // initially last option is highlighted
        await openListbox('Enter');
        await getTrigger().focus();
        await getTrigger().press('End');

        await expect(getLastOption()).toHaveAttribute('data-highlighted');

        await getTrigger().focus();
        await getTrigger().press('ArrowDown');
        await expect(getOptionAt(0)).toHaveAttribute('data-highlighted');
      });

      test(`GIVEN an open select with loop enabled
            AND the first option is data-highlighted
            WHEN the up arrow key is pressed
            THEN the last option should have data-highlighted`, async ({ page }) => {
        const { getTrigger, getOptionAt, getLastOption, openListbox } = await setup(
          page,
          'loop',
        );

        // initially last option is highlighted
        await openListbox('Enter');
        await expect(getOptionAt(0)).toHaveAttribute('data-highlighted');

        await getTrigger().focus();
        await getTrigger().press('ArrowUp');
        await expect(getLastOption()).toHaveAttribute('data-highlighted');
      });

      test(`GIVEN a closed select with loop enabled
            AND the last option is selected
            WHEN the right arrow key is pressed
            THEN it should loop to the first option`, async ({ page }) => {
        const { getTrigger, getOptionAt, getLastOption, openListbox } = await setup(
          page,
          'loop',
        );

        // initially last option is highlighted
        await openListbox('Enter');
        await getTrigger().focus();
        await getTrigger().press('End');
        await getTrigger().press('Enter');
        const option = await getOptionAt(0);
        await expect(getLastOption()).toHaveAttribute('aria-selected', 'true');

        await getTrigger().focus();
        await getTrigger().press('ArrowRight');
        await expect(option).toHaveAttribute('data-highlighted');
        await expect(option).toHaveAttribute('aria-selected', 'true');
      });

      test(`GIVEN a closed select with loop enabled
            AND the first option is selected
            WHEN the right arrow key is pressed
            THEN it should loop to the first option`, async ({ page }) => {
        const { getTrigger, getOptionAt, getLastOption, openListbox } = await setup(
          page,
          'loop',
        );

        // initially select first option
        await openListbox('Enter');
        await getTrigger().focus();
        await getTrigger().press('Enter');
        const lastOption = getLastOption();
        await expect(getOptionAt(0)).toHaveAttribute('aria-selected', 'true');

        await getTrigger().focus();
        await getTrigger().press('ArrowLeft');
        await expect(lastOption).toHaveAttribute('data-highlighted');
        await expect(lastOption).toHaveAttribute('aria-selected', 'true');
      });
    });
  });

  test(`GIVEN an open select with multiple groups and a scrollable listbox
        AND the last option is not visible
        WHEN the end key is pressed
        THEN the last option should be visible`, async ({ page }) => {
    const { getTrigger, getRoot, openListbox } = await setup(page, 'scrollable');

    await openListbox('Enter');

    await getTrigger().focus();
    await getTrigger().press('End');
    const lastOption = getRoot().getByRole('option', { includeHidden: false }).last();

    await expect(lastOption).toBeInViewport();
  });
});

test.describe('Disabled', () => {
  test(`GIVEN an open disabled select with the first option disabled
        WHEN clicking the disabled option
        It should have aria-disabled`, async ({ page }) => {
    const { getTrigger, getOptionAt, openListbox } = await setup(page, 'disabled');

    await openListbox('Enter');

    await getTrigger().focus();
    await getTrigger().press('ArrowDown');
    await expect(getOptionAt(0)).toBeDisabled();
  });

  // causing false positives?
  // test(`GIVEN an open disabled select with the first option disabled
  //       WHEN clicking the disabled option
  //       THEN the listbox should stay open`, async ({ page }) => {
  //   const { getListbox, getOptionAt, openListbox } = await setup(
  //     page,
  //     'disabled',
  //   );

  //   await openListbox('Enter');

  //   const options = await getOptionAt();
  //   // eslint-disable-next-line playwright/no-force-option
  //   await options[0].click({ force: true });
  //   await expect(getListbox()).toBeVisible();
  // });

  test(`GIVEN an open disabled select
        WHEN first option is disabled
        THEN the second option should have data-highlighted`, async ({ page }) => {
    const { getOptionAt, openListbox } = await setup(page, 'disabled');

    await openListbox('ArrowDown');

    await expect(getOptionAt(1)).toHaveAttribute('data-highlighted');
  });

  test(`GIVEN an open disabled select
        WHEN the last option is disabled and the end key is pressed
        THEN the second last index should have data-highlighted`, async ({ page }) => {
    const { driver, getTrigger, getOptionAt, openListbox } = await setup(
      page,
      'disabled',
    );

    await openListbox('ArrowDown');
    await getTrigger().press('End');
    const length = await driver.getOptionsLength();
    const lastEnabledOption = await getOptionAt(length - 2);
    await expect(lastEnabledOption).toHaveAttribute('data-highlighted');
  });

  test(`GIVEN an open disabled select
        WHEN the second option is highlighted and the down arrow key is pressed
        AND the first and third options are disabled
        THEN the fourth option should be highlighted`, async ({ page }) => {
    const { getTrigger, getOptionAt, openListbox } = await setup(page, 'disabled');

    await openListbox('ArrowDown');
    await expect(getOptionAt(1)).toHaveAttribute('data-highlighted');
    await getTrigger().press('ArrowDown');
    await expect(getOptionAt(3)).toHaveAttribute('data-highlighted');
  });

  test(`GIVEN an open disabled select
        WHEN the fourth is highlighted and the up key is pressed
        AND the first and third options are disabled
        THEN the second option should be highlighted`, async ({ page }) => {
    const { getTrigger, getOptionAt, openListbox } = await setup(page, 'disabled');

    // initially the fourh option is highlighted
    await openListbox('ArrowDown');
    const secondOption = await getOptionAt(1);
    await expect(secondOption).toHaveAttribute('data-highlighted');
    await getTrigger().press('ArrowDown');
    await expect(getOptionAt(3)).toHaveAttribute('data-highlighted');

    await getTrigger().press('ArrowUp');
    await expect(secondOption).toHaveAttribute('data-highlighted');
  });
});

test.describe('Props', () => {
  test(`GIVEN a basic select
        WHEN there is a placeholder
        THEN the placeholder should be presented instead of a selected value`, async ({
    page,
  }) => {
    const { getValue } = await setup(page, 'hero');

    await expect(await getValue()).toEqual('Select an option');
  });

  test(`GIVEN a select with an onChange$ prop
        WHEN the select value changes
        THEN the placeholder should be presented instead of a selected value`, async ({
    page,
  }) => {
    const { openListbox, getOptionAt, getRoot } = await setup(page, 'change-value');

    await openListbox('click');

    await getOptionAt(3).click();

    const sibling = getRoot().locator('+ p');
    await expect(sibling).toHaveText('You have changed 1 times');
  });

  test(`GIVEN a select with an onOpenChange$ prop
        WHEN the select value changes
        THEN the placeholder should be presented instead of a selected value`, async ({
    page,
  }) => {
    const { getRoot, openListbox } = await setup(page, 'open-change');

    await openListbox('click');

    const sibling = getRoot().locator('+ p');
    await expect(sibling).toHaveText('The listbox opened and closed 1 time(s)');
  });

  test.describe('uncontrolled', () => {
    test(`GIVEN an uncontrolled select with a value prop on the root component
          WHEN the value data matches the fourth option
          THEN the selected value should be the data passed to the value prop`, async ({
      page,
    }) => {
      const { getValue, getOptionAt } = await setup(page, 'uncontrolled');

      expect(await getValue()).toEqual(await getOptionAt(3).textContent());
    });

    test(`GIVEN an uncontrolled select with a value prop on the root component
          WHEN the value prop data matches the fourth option
          THEN the fourth option should have data-highlighted`, async ({ page }) => {
      const { getValue, getOptionAt } = await setup(page, 'uncontrolled');

      const option = await getOptionAt(3);
      expect(await getValue()).toEqual(await option.textContent());
      await expect(option).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN an uncontrolled select with a value prop on the root component
          WHEN the value prop data matches the fourth option
          THEN the fourth option should have aria-selected set to true`, async ({
      page,
    }) => {
      const { getValue, getOptionAt } = await setup(page, 'uncontrolled');

      const option = await getOptionAt(3);
      expect(await getValue()).toEqual(await option.textContent());
      await expect(option).toHaveAttribute('aria-selected', 'true');
    });

    test(`GIVEN an uncontrolled select with a value prop on the root component
          WHEN the value data does NOT match any option
          THEN fallback to the placeholder`, async ({ page }) => {
      const { getValue } = await setup(page, 'wrong-value');

      /**
       we also currently give a console warning in the terminal if an option does not match. Ideally, I would like to have a union type of options, and it gives an error if there is no matching option
    */
      expect(await getValue()).toEqual('wrong value placeholder');
    });
  });

  test.describe('controlled', () => {
    test(`GIVEN a controlled select with a bind:value prop on the root component
          WHEN the signal data matches the second option
          THEN the selected value should be the data passed to the bind:value prop`, async ({
      page,
    }) => {
      const { getValue, getOptionAt } = await setup(page, 'controlled');

      expect(await getValue()).toEqual(await getOptionAt(1).textContent());
    });

    test(`GIVEN a controlled select with a bind:value prop on the root component
          WHEN the signal data matches the second option
          THEN the selected value should should have data-highlighted`, async ({
      page,
    }) => {
      const { getValue, getOptionAt } = await setup(page, 'controlled');

      const option = await getOptionAt(1);
      expect(await getValue()).toEqual(await option.textContent());
      await expect(option).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN an controlled select with a bind:value prop on the root component
          WHEN the signal data matches the second option
          THEN the second option should have aria-selected set to true`, async ({
      page,
    }) => {
      const { getValue, getOptionAt } = await setup(page, 'controlled');

      const option = await getOptionAt(1);
      expect(await getValue()).toEqual(await option.textContent());
      await expect(option).toHaveAttribute('aria-selected', 'true');
    });
  });

  test.describe('option value', () => {
    test(`GIVEN a select with distinct display and option values
          WHEN the 2nd option is selected
          THEN the selected value matches the 2nd option's value`, async ({ page }) => {
      const { openListbox, getTrigger, getRoot } = await setup(page, 'option-value');

      await openListbox('Enter');
      const changeStr = getRoot().locator('+ p');
      await expect(changeStr).toContainText('The selected value is: null');
      await getTrigger().focus();
      await getTrigger().press('ArrowDown');
      await getTrigger().press('Enter');

      await expect(changeStr).toContainText('The selected value is: 1');
    });

    test(`GIVEN a select with distinct display and option values
          WHEN a controlled value is set to the 5th option
          THEN the selected value matches the 5th option's value`, async ({ page }) => {
      const { getTrigger, getRoot, getOptionAt } = await setup(page, 'controlled-value');

      await expect(getTrigger()).toHaveText('Select an option');
      await getRoot().locator('+ button').click();

      await expect(getTrigger()).toHaveText(`${await getOptionAt(4).textContent()}`);
    });
  });
});

test.describe('A11y', () => {
  test(`GIVEN a select with a group
        WHEN the user adds a new group
        THEN the group should have an aria-labelledby attribute
        AND its associated label`, async ({ page }) => {
    const { getRoot, openListbox } = await setup(page, 'group');
    await openListbox('ArrowDown');
    const labelId = await getRoot().getByRole('listitem').first().getAttribute('id');
    const group = getRoot().getByRole('group').first();

    await expect(group).toHaveAttribute('aria-labelledby', labelId!);
  });

  test(`GIVEN an open hero select with aria-activedescendent
        WHEN the listbox is opened and the down arrow key is pressed
        THEN aria-activedescendent should be the id of the second option`, async ({
    page,
  }) => {
    const { getTrigger, getRoot, openListbox, getOptionAt } = await setup(page, 'hero');
    await openListbox('ArrowDown');
    await getTrigger().focus();
    await getTrigger().press('ArrowDown');

    const secondOptionId = await getOptionAt(1).getAttribute('id');

    await expect(getRoot()).toHaveAttribute('aria-activedescendant', `${secondOptionId}`);
  });

  test(`GIVEN an open hero select with aria-activedescendent
        WHEN the listbox is closed
        THEN aria-activedescendent should be an empty string`, async ({ page }) => {
    const { getTrigger, getRoot, openListbox, getListbox } = await setup(page, 'hero');
    await openListbox('ArrowDown');
    await getTrigger().focus();
    await getTrigger().press('Enter');
    await expect(getListbox()).toBeHidden();

    await expect(getRoot()).toHaveAttribute('aria-activedescendant', '');
  });

  test(`GIVEN a hero select with aria-controls
        WHEN the select renders
        THEN the root's aria-controls should be equal to the ID of the listbox`, async ({
    page,
  }) => {
    const { getRoot, getListbox, openListbox } = await setup(page, 'hero');
    await openListbox('Enter');
    const listboxId = await getListbox().getAttribute('id');

    await expect(getRoot()).toHaveAttribute('aria-controls', `${listboxId}`);
  });
});
