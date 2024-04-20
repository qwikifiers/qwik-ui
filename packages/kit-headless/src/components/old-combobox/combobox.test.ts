import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './combobox.driver';

async function setup(page: Page, exampleName: string) {
  await page.goto(`/headless/combobox/${exampleName}`);

  const driver = createTestDriver(page);

  return {
    driver,
  };
}

test('@Visual diff', async ({ page }) => {
  const { driver: d } = await setup(page, 'hero');
  await expect(page).toHaveScreenshot('closed combobox.png');

  await d.getTrigger().click();

  await expect(page).toHaveScreenshot('opened combobox.png');
});

test.describe('Mouse Behavior', () => {
  test(`GIVEN a default combobox
        WHEN clicking on the trigger
        THEN open up the listbox AND aria-expanded should be true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.getTrigger().click();

    await expect(d.getListbox()).toBeVisible();
    await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'true');
  });

  test(`GIVEN a default open combobox
        WHEN the trigger is clicked
        THEN close the listbox 
        AND aria-expanded should be false`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.openListbox('click');

    await d.getTrigger().click();
    await expect(d.getListbox()).toBeHidden();
    await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'false');
  });

  test(`GIVEN a default open combobox
        WHEN an option is clicked
        THEN close the listbox 
        AND aria-expanded should be false`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.openListbox('click');

    await d.getOptionAt(0).click();

    await expect(d.getListbox()).toBeHidden();
    await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'false');
  });

  test(`GIVEN a default open combobox
        WHEN the 2nd option is clicked
        THEN the 2nd option should have aria-selected`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.openListbox('click');

    await d.getOptionAt(1).click();

    await expect(d.getOptionAt(1)).toHaveAttribute('aria-selected', 'true');
  });

  test(`GIVEN a default open combobox
        WHEN the 3rd option is clicked
        THEN the 3rd option should be the selected value`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.openListbox('click');

    const thirdOptStr = await d.getOptionAt(2).textContent();
    await d.getOptionAt(2).click();

    await expect(d.getOptionAt(2)).toHaveAttribute('aria-selected', 'true');
    await expect(d.getInput()).toHaveValue(thirdOptStr!);
  });

  // test(`GIVEN a combobox
  // WHEN adding new users and selecting a new user
  // THEN the new user should be the selected value`, async ({ page }) => {
  //   const { driver: d } = await setup(page, 'add-users');

  //   await page.getByRole('button', { name: 'Add Users' }).click();

  //   await expect(d.getOptions()).toHaveCount(8);

  //   await d.openListbox('click');
  //   const expectedValue = 'Bob';

  //   await expect(d.getOptionAt(7)).toHaveText(expectedValue);
  //   await d.getOptionAt(7).click();
  //   await expect(d.getOptions()).toHaveText(expectedValue);
  // });

  // test(`GIVEN an open hero combobox
  // WHEN clicking on the group label
  // THEN the listbox should remain open`, async ({ page }) => {
  //   const { driver: d } = await setup(page, 'group');

  //   await d.openListbox('click');

  //   const label = d.getRoot().getByRole('listitem').first();

  //   await expect(label).toBeVisible();
  //   await label.click();
  //   await expect(d.getListbox()).toBeVisible();
  // });
});

test.describe('Keyboard Behavior', () => {
  test.describe('listbox open / close', () => {
    test(`GIVEN a default combobox
          WHEN focusing the trigger and hitting enter
          THEN open up the listbox 
          AND aria-expanded should be true`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.getTrigger().press('Enter');

      await expect(d.getListbox()).toBeVisible();
      await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'true');
    });

    test(`GIVEN a default open combobox
          WHEN focusing the trigger and hitting enter
          THEN close the listbox 
          AND aria-expanded should be false`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('click');

      await d.getTrigger().press('Enter');
      await expect(d.getListbox()).toBeHidden();
      await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'false');
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

  test.describe('data-highlighted navigation', () => {});

  test.describe('comboboxing options', () => {});

  test.describe('typeahead', () => {});

  test.describe('looping', () => {});
});

test.describe('Disabled', () => {});

test.describe('Props', () => {
  test.describe('uncontrolled', () => {});

  test.describe('controlled', () => {});
});

/** TODO: add docs telling people how to add an aria-label to the root component. (accessible name) */
test.describe('A11y', () => {
  test('Axe Validation Test', async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    const initialResults = await new AxeBuilder({ page })
      .include('[role="combobox"]')
      .analyze();

    expect(initialResults.violations).toEqual([]);

    await d.getTrigger().click();

    await expect(d.getListbox()).toBeVisible();

    const afterClickResults = await new AxeBuilder({ page })
      .include('[role="combobox"]')
      .analyze();

    expect(afterClickResults.violations).toEqual([]);
  });
});
