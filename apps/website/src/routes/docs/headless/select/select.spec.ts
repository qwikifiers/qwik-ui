import { test, expect, type Page } from '@playwright/test';
import { createTestDriver } from './select.driver';
async function setup(page: Page, selector: string) {
  await page.goto('/docs/headless/select');

  const driver = createTestDriver(page.getByTestId(selector));

  const { getListbox, getTrigger, getOptions, getValue, openListbox } = driver;

  return {
    driver,
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

  test(`GIVEN an uncontrolled select with a value prop on the root component
        WHEN the value data matches the fourth option
        THEN the selected value should be the data passed to the value prop`, async ({
    page,
  }) => {
    const { getValue } = await setup(page, 'select-uncontrolled-test');

    await expect(await getValue()).toEqual('Jessie');
  });

  test(`GIVEN an uncontrolled select with a value prop on the root component
        WHEN the value data matches the fourth option
        THEN the fourth option should have data-highlighted set to true`, async ({
    page,
  }) => {
    const { getValue, getOptions } = await setup(page, 'select-uncontrolled-test');

    expect(await getValue()).toEqual('Jessie');
    const options = await getOptions();
    await expect(options[3]).toHaveAttribute('data-highlighted');
  });

  // test(`GIVEN an uncontrolled select with a value prop on the root component
  //       WHEN the value data does NOT match any option
  //       THEN throw an error`, async ({ page }) => {
  //   const { getValue } = await setup(page, 'select-wrong-value-test');

  //   expect(await getValue()).toEqual('Jessi');
  // });
});
