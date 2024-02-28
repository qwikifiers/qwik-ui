import { test, expect, type Page } from '@playwright/test';
import { createTestDriver } from './select.driver';
async function setup(page: Page, selector: string) {
  await page.goto('/docs/headless/select');

  const driver = createTestDriver(page.getByTestId(selector));

  const { getRoot, getListbox, getTrigger, getOptions, getValue, openListbox } = driver;

  return {
    driver,
    getRoot,
    getListbox,
    getTrigger,
    getOptions,
    getValue,
    openListbox,
  };
}

test.describe('Mouse Behavior', () => {
  test(`GIVEN a hero select
        WHEN clicking on the trigger
        THEN open up the listbox AND aria-expanded should be true`, async ({ page }) => {
    const { getTrigger, getListbox } = await setup(page, 'select-hero-test');

    await getTrigger().click();

    await expect(getListbox()).toBeVisible();
    await expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
  });

  test(`GIVEN a hero select with an open listbox
        WHEN the trigger is clicked
        THEN close the listbox AND aria-expanded should be false`, async ({ page }) => {
    const { getTrigger, getListbox, openListbox } = await setup(page, 'select-hero-test');

    await openListbox('click');

    await getTrigger().click();
    await expect(getListbox()).toBeHidden();
    await expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
  });

  test(`GIVEN a hero select with an open listbox
        WHEN an option is clicked
        THEN close the listbox AND aria-expanded should be false`, async ({ page }) => {
    const { getTrigger, getListbox, getOptions, openListbox } = await setup(
      page,
      'select-hero-test',
    );

    await openListbox('click');

    const options = await getOptions();
    options[0].click();

    await expect(getListbox()).toBeHidden();
    await expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
  });

  test(`GIVEN a hero select with an open listbox
        WHEN the 2nd option is clicked
        THEN the 2nd option should have aria-selected`, async ({ page }) => {
    const { getOptions, openListbox } = await setup(page, 'select-hero-test');

    await openListbox('click');

    const options = await getOptions();
    options[1].click();

    await expect(options[1]).toHaveAttribute('aria-selected', 'true');
  });

  test(`GIVEN a hero select with an open listbox
        WHEN the 3rd option is clicked
        THEN the 3rd option should be the selected value`, async ({ page }) => {
    const { getOptions, getValue, openListbox } = await setup(page, 'select-hero-test');

    await openListbox('click');

    const options = await getOptions();
    const thirdOptStr = await options[2].textContent();
    await options[2].click();

    await expect(options[2]).toHaveAttribute('aria-selected', 'true');
    expect(thirdOptStr).toEqual(await getValue());
  });

  test(`GIVEN a select
        WHEN adding new users and selecting a new user
        THEN the new user should be the selected value`, async ({ page }) => {
    const { getRoot, getOptions, openListbox, getValue } = await setup(
      page,
      'select-add-users-test',
    );

    const sibling = getRoot().locator('+ button');

    await expect(sibling).toHaveText('Add Users');
    await sibling.click();

    await openListbox('click');
    const options = await getOptions();
    await expect(options[7]).toHaveText('Bob');
    await options[7].click();
    expect(await getValue()).toEqual(await options[7].textContent());
  });
});

test.describe('Keyboard Behavior', () => {
  test.describe('listbox open / close', () => {
    test(`GIVEN a hero select
    WHEN focusing the trigger and hitting enter
    THEN open up the listbox AND aria-expanded should be true`, async ({ page }) => {
      const { getTrigger, getListbox } = await setup(page, 'select-hero-test');

      await getTrigger().focus();
      await getTrigger().press('Enter');

      await expect(getListbox()).toBeVisible();
      await expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
    });

    test(`GIVEN a hero select with an open listbox
    WHEN focusing the trigger and hitting enter
    THEN close the listbox AND aria-expanded should be false`, async ({ page }) => {
      const { getTrigger, getListbox, openListbox } = await setup(
        page,
        'select-hero-test',
      );

      await openListbox('click');

      await getTrigger().focus();
      await getTrigger().press('Enter');
      await expect(getListbox()).toBeHidden();
      await expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

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
      const { getTrigger, getListbox, openListbox } = await setup(
        page,
        'select-hero-test',
      );

      await openListbox('Space');

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
      const { getTrigger, getListbox, openListbox } = await setup(
        page,
        'select-hero-test',
      );

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
      const { getTrigger, getListbox, openListbox } = await setup(
        page,
        'select-hero-test',
      );

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
      const { getTrigger, getListbox, getOptions } = await setup(
        page,
        'select-hero-test',
      );

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
      const { getTrigger, getListbox, getOptions } = await setup(
        page,
        'select-hero-test',
      );

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
      const { getTrigger, getListbox, getOptions } = await setup(
        page,
        'select-hero-test',
      );

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
      const { getTrigger, getListbox, getOptions } = await setup(
        page,
        'select-hero-test',
      );

      await getTrigger().focus();
      await getTrigger().press('ArrowUp');
      await expect(getListbox()).toBeVisible();

      const options = await getOptions();
      await expect(options[0]).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN an open hero select
        WHEN pressing the end key
        THEN the last option should have data-highlighted`, async ({ page }) => {
      const { getTrigger, getOptions, openListbox } = await setup(
        page,
        'select-hero-test',
      );

      await openListbox('click');

      await getTrigger().focus();
      await getTrigger().press('End');

      const options = await getOptions();
      const lastIndex = options.length - 1;
      await expect(options[lastIndex]).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN an open hero select
        WHEN pressing the home key after the end key
        THEN the first option should have data-highlighted`, async ({ page }) => {
      const { getTrigger, getOptions, openListbox } = await setup(
        page,
        'select-hero-test',
      );

      await openListbox('click');

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
      const { getTrigger, getOptions, openListbox } = await setup(
        page,
        'select-hero-test',
      );

      await openListbox('Enter');

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
      const { getTrigger, getOptions, openListbox } = await setup(
        page,
        'select-hero-test',
      );

      await openListbox('Enter');

      const options = await getOptions();
      await expect(options[0]).toHaveAttribute('data-highlighted');
      await getTrigger().press('ArrowDown');
      await getTrigger().press('ArrowDown');

      await getTrigger().press('ArrowUp');
      await expect(options[1]).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN a hero select with a chosen option
          AND the down arrow key is pressed
          THEN the data-highlighted option should not change on re-open`, async ({
      page,
    }) => {
      const { getTrigger, getListbox, getOptions, openListbox } = await setup(
        page,
        'select-hero-test',
      );

      await openListbox('Enter');

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

  test.describe('selecting options', () => {
    test(`GIVEN an open hero select
          WHEN an option has data-highlighted
          AND the Enter key is pressed
          THEN the listbox should be closed and aria-expanded false`, async ({
      page,
    }) => {
      const { getTrigger, getListbox, getOptions, openListbox } = await setup(
        page,
        'select-hero-test',
      );

      await openListbox('Enter');

      const options = await getOptions();
      await expect(options[0]).toHaveAttribute('data-highlighted');
      await getTrigger().press('Enter');
      await expect(getListbox()).toBeHidden();
      await expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    test(`GIVEN an open hero select
          WHEN an option has data-highlighted
          AND the Enter key is pressed
          THEN option value should be the selected value
          AND should have an aria-selected of true`, async ({ page }) => {
      const { getTrigger, getOptions, getValue, openListbox } = await setup(
        page,
        'select-hero-test',
      );

      await openListbox('Enter');

      const options = await getOptions();
      await expect(options[0]).toHaveAttribute('data-highlighted');
      const optStr = await options[0].textContent();
      await getTrigger().press('Enter');

      const value = await getValue();
      console.log(value);
      expect(optStr).toEqual(value);
    });

    test(`GIVEN an open hero select
          WHEN an option has data-highlighted
          AND the Space key is pressed
          THEN the listbox should be closed and aria-expanded false`, async ({
      page,
    }) => {
      const { getTrigger, getListbox, getOptions, openListbox } = await setup(
        page,
        'select-hero-test',
      );

      await openListbox('Space');

      // second option highlighted
      const options = await getOptions();
      await expect(options[0]).toHaveAttribute('data-highlighted');
      await getTrigger().press('Space');
      await expect(getListbox()).toBeHidden();
      await expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    test(`GIVEN an open hero select
          WHEN an option has data-highlighted
          AND the Space key is pressed
          THEN option value should be the selected value
          AND should have an aria-selected of true`, async ({ page }) => {
      const { getTrigger, getOptions, getValue, openListbox } = await setup(
        page,
        'select-hero-test',
      );

      await openListbox('Space');

      const options = await getOptions();
      await expect(options[0]).toHaveAttribute('data-highlighted');
      const optStr = await options[0].textContent();
      await getTrigger().press('Space');

      expect(optStr).toEqual(await getValue());
    });
  });

  test.describe('typeahead', () => {
    test(`GIVEN an open select with a typeahead support
          WHEN the user types in the letter "j"
          THEN the first option starting with the letter "j" should have data-highlighted`, async ({
      page,
    }) => {
      const { getRoot, getTrigger, openListbox } = await setup(
        page,
        'select-typeahead-test',
      );
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
      const { getRoot, getTrigger, openListbox } = await setup(
        page,
        'select-typeahead-test',
      );
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
      const { getRoot, getTrigger, openListbox } = await setup(
        page,
        'select-typeahead-test',
      );
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
      const { getRoot, getTrigger, openListbox } = await setup(
        page,
        'select-typeahead-test',
      );
      await openListbox('ArrowDown');
      await getTrigger().pressSequentially('a', { delay: 1500 });
      await getTrigger().pressSequentially('je', { delay: 100 });
      const highlightedOpt = getRoot().locator('[data-highlighted]');
      await expect(highlightedOpt).toContainText('jessie', { ignoreCase: true });
    });

    test(`GIVEN an open select with typeahead support and multiple characters
          WHEN the user types in a letter that does not match any option
          THEN the data-highlighted value should not change.`, async ({ page }) => {
      const { getRoot, getTrigger, openListbox } = await setup(
        page,
        'select-typeahead-test',
      );
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
      const { getRoot, getTrigger, openListbox } = await setup(
        page,
        'select-typeahead-test',
      );
      await openListbox('ArrowDown');
      await getTrigger().pressSequentially('jjj', { delay: 1250 });
      const highlightedOpt = getRoot().locator('[data-highlighted]');
      await expect(highlightedOpt).toContainText('jim', { ignoreCase: true });
    });
  });
});

test.describe('Disabled', () => {
  test(`GIVEN an open disabled select with the first option disabled
        WHEN clicking the disabled option
        It should have aria-disabled`, async ({ page }) => {
    const { getTrigger, getOptions, openListbox } = await setup(
      page,
      'select-disabled-test',
    );

    await openListbox('Enter');

    await getTrigger().focus();
    await getTrigger().press('ArrowDown');
    const options = await getOptions();
    await expect(options[0]).toBeDisabled();
  });

  // causing false positives?
  // test(`GIVEN an open disabled select with the first option disabled
  //       WHEN clicking the disabled option
  //       THEN the listbox should stay open`, async ({ page }) => {
  //   const { getListbox, getOptions, openListbox } = await setup(
  //     page,
  //     'select-disabled-test',
  //   );

  //   await openListbox('Enter');

  //   const options = await getOptions();
  //   // eslint-disable-next-line playwright/no-force-option
  //   await options[0].click({ force: true });
  //   await expect(getListbox()).toBeVisible();
  // });

  test(`GIVEN an open disabled select
        WHEN first option is disabled
        THEN the second option should have data-highlighted`, async ({ page }) => {
    const { getOptions, openListbox } = await setup(page, 'select-disabled-test');

    await openListbox('ArrowDown');
    const options = await getOptions();
    await expect(options[1]).toHaveAttribute('data-highlighted');
  });

  test(`GIVEN an open disabled select
        WHEN the last option is disabled and the end key is pressed
        THEN the second last index should have data-highlighted`, async ({ page }) => {
    const { getTrigger, getOptions, openListbox } = await setup(
      page,
      'select-disabled-test',
    );

    await openListbox('ArrowDown');
    await getTrigger().press('End');
    const options = await getOptions();
    await expect(options[options.length - 2]).toHaveAttribute('data-highlighted');
  });
});

test.describe('Props', () => {
  test(`GIVEN a basic select
        WHEN there is a placeholder
        THEN the placeholder should be presented instead of a selected value`, async ({
    page,
  }) => {
    const { getValue } = await setup(page, 'select-hero-test');

    await expect(await getValue()).toEqual('Select an option');
  });

  test(`GIVEN a select with an onChange$ prop
        WHEN the select value changes
        THEN the placeholder should be presented instead of a selected value`, async ({
    page,
  }) => {
    const { openListbox, getOptions, getRoot } = await setup(page, 'select-change-test');

    await openListbox('click');

    const options = await getOptions();
    await options[3].click();

    const sibling = getRoot().locator('+ p');
    await expect(sibling).toHaveText('You have changed 1 times');
  });

  test(`GIVEN a select with an onOpenChange$ prop
        WHEN the select value changes
        THEN the placeholder should be presented instead of a selected value`, async ({
    page,
  }) => {
    const { getRoot, openListbox } = await setup(page, 'select-open-change-test');

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
      const { getValue, getOptions } = await setup(page, 'select-uncontrolled-test');

      const options = await getOptions();

      expect(await getValue()).toEqual(await options[3].textContent());
    });

    test(`GIVEN an uncontrolled select with a value prop on the root component
          WHEN the value prop data matches the fourth option
          THEN the fourth option should have data-highlighted`, async ({ page }) => {
      const { getValue, getOptions } = await setup(page, 'select-uncontrolled-test');

      const options = await getOptions();
      expect(await getValue()).toEqual(await options[3].textContent());
      await expect(options[3]).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN an uncontrolled select with a value prop on the root component
          WHEN the value prop data matches the fourth option
          THEN the fourth option should have aria-selected set to true`, async ({
      page,
    }) => {
      const { getValue, getOptions } = await setup(page, 'select-uncontrolled-test');

      const options = await getOptions();
      expect(await getValue()).toEqual(await options[3].textContent());
      await expect(options[3]).toHaveAttribute('aria-selected', 'true');
    });

    test(`GIVEN an uncontrolled select with a value prop on the root component
          WHEN the value data does NOT match any option
          THEN fallback to the placeholder`, async ({ page }) => {
      const { getValue } = await setup(page, 'select-wrong-value-test');

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
      const { getValue, getOptions } = await setup(page, 'select-controlled-test');

      const options = await getOptions();
      expect(await getValue()).toEqual(await options[1].textContent());
    });

    test(`GIVEN a controlled select with a bind:value prop on the root component
          WHEN the signal data matches the second option
          THEN the selected value should should have data-highlighted`, async ({
      page,
    }) => {
      const { getValue, getOptions } = await setup(page, 'select-controlled-test');

      const options = await getOptions();
      expect(await getValue()).toEqual(await options[1].textContent());
      await expect(options[1]).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN an controlled select with a bind:value prop on the root component
          WHEN the signal data matches the second option
          THEN the second option should have aria-selected set to true`, async ({
      page,
    }) => {
      const { getValue, getOptions } = await setup(page, 'select-controlled-test');

      const options = await getOptions();
      expect(await getValue()).toEqual(await options[1].textContent());
      await expect(options[1]).toHaveAttribute('aria-selected', 'true');
    });
  });
});
