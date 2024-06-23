import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './combobox.driver';

async function setup(page: Page, exampleName: string) {
  await page.goto(`/headless/combobox/${exampleName}`);

  const driver = createTestDriver(page.locator('[data-combobox-root]'));

  return {
    driver,
  };
}

test.describe('Mouse Behavior', () => {
  test(`GIVEN a combobox
        WHEN clicking on the trigger
        THEN open up the listbox AND aria-expanded should be true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.getTrigger().click();

    await expect(d.getListbox()).toBeVisible();
    await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'true');
  });

  test(`GIVEN a combobox with an open listbox
        WHEN the trigger is clicked
        THEN close the listbox AND aria-expanded should be false`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.openListbox('click');

    await d.getTrigger().click();
    await expect(d.getListbox()).toBeHidden();
    await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'false');
  });

  test(`GIVEN a combobox with an open listbox
        WHEN an option is clicked
        THEN close the listbox AND aria-expanded should be false`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.openListbox('click');

    await d.getItemAt(0).click();

    await expect(d.getListbox()).toBeHidden();
    await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'false');
  });

  test(`GIVEN a combobox with an open listbox
        WHEN the 2nd option is clicked
        THEN the 2nd option should have aria-selected`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.openListbox('click');

    await d.getItemAt(1).click();

    await expect(d.getItemAt(1)).toHaveAttribute('aria-selected', 'true');
  });

  test(`GIVEN a  combobox with an open listbox
        WHEN the 3rd option is clicked
        THEN the 3rd option should be the selected value`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.openListbox('click');

    const thirdOptStr = await d.getItemAt(2).textContent();
    await d.getItemAt(2).click();

    await expect(d.getItemAt(2)).toHaveAttribute('aria-selected', 'true');
    await expect(d.getInput()).toHaveValue(thirdOptStr!);
  });

  test(`GIVEN a combobox
        WHEN adding new users and selecting a new user
        THEN the new user should be the selected value`, async ({ page }) => {
    const { driver: d } = await setup(page, 'add-items');

    await page.getByRole('button', { name: 'Add Fruits' }).click();

    await expect(d.getItems()).toHaveCount(11);

    await d.openListbox('click');
    const expectedValue = 'Durian';

    await expect(d.getItemAt(8)).toHaveText(expectedValue);
    await d.getItemAt(8).click();
    await expect(d.getInput()).toHaveValue(expectedValue);
  });

  test(`GIVEN an open combobox
        WHEN clicking on the group label
        THEN the listbox should remain open`, async ({ page }) => {
    const { driver: d } = await setup(page, 'group');

    await d.openListbox('click');

    const label = page.locator('[data-group-label]').first();

    await expect(label).toBeVisible();
    await label.click();
    await expect(d.getListbox()).toBeVisible();
  });
});

test.describe('Keyboard Behavior', () => {
  test.describe('listbox open / close', () => {
    test(`GIVEN a combobox focused on the input
          WHEN pressing the down arrow key
          THEN open up the listbox`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.getInput().press('ArrowDown');
      await expect(d.getListbox()).toBeVisible();
    });

    test(`GIVEN a combobox focused on the input
    WHEN pressing the up arrow key
    THEN open up the listbox`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.getInput().press('ArrowUp');
      await expect(d.getListbox()).toBeVisible();
    });

    test(`GIVEN a combobox with an opened listbox
        WHEN pressing the escape key
        THEN the listbox should close
        AND aria-expanded should be false`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('click');

      await d.getInput().focus();
      await d.getInput().press('Escape');
      await expect(d.getListbox()).toBeHidden();
      await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    test(`GIVEN a  combobox with an opened listbox
          WHEN focusing something outside of the combobox's input
          THEN the listbox should close
          AND aria-expanded should be false`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('click');
      await d.getInput().press('Tab');
      await expect(d.getListbox()).toBeHidden();
      await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });
  });

  test.describe('data-highlighted navigation', () => {
    test(`GIVEN a combobox
        WHEN pressing the down arrow key
        THEN the listbox should be opened
        AND the first option should have data-highlighted`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.getInput().press('ArrowDown');
      await expect(d.getListbox()).toBeVisible();

      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN a  combobox
        WHEN pressing the up arrow
        THEN open up the listbox
        AND the last option should have data-highlighted`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.getInput().press('ArrowUp');
      await expect(d.getListbox()).toBeVisible();

      await expect(d.getItemAt('last')).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN an open combobox
        WHEN pressing the end key
        THEN the last option should have data-highlighted`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('ArrowDown');

      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
      await d.getInput().press('End');

      await expect(d.getItemAt('last')).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN an open combobox
        WHEN pressing the home key after the end key
        THEN the first option should have data-highlighted`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('ArrowDown');

      // to last index
      await d.getInput().press('End');
      await expect(d.getItemAt('last')).toHaveAttribute('data-highlighted');

      // to first index
      await d.getInput().press('Home');
      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN an open combobox
          WHEN the first option is highlighted and the down arrow key is pressed
          THEN the second option should have data-highlighted`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('ArrowDown');

      // first index highlighted

      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');

      await d.getInput().press('ArrowDown');
      await expect(d.getItemAt(1)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN an open combobox
          WHEN the third option is highlighted and the up arrow key is pressed
          THEN the second option should have data-highlighted`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('ArrowDown');

      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
      await d.getInput().press('ArrowDown');
      await d.getInput().press('ArrowDown');
      1;

      await d.getInput().press('ArrowUp');
      await expect(d.getItemAt(1)).toHaveAttribute('data-highlighted');
    });
  });

  test.describe('selecting options', () => {
    test(`GIVEN an opened combobox with the first option highlighted
          WHEN the Enter key is pressed
          THEN the listbox should be closed and aria-expanded should be false`, async ({
      page,
    }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('ArrowDown');

      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
      await d.getInput().press('Enter');
      await expect(d.getListbox()).toBeHidden();
      await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    test(`GIVEN an open combobox
          WHEN an option has data-highlighted
          AND the Enter key is pressed
          THEN option value should be the selected value
          AND should have an aria-selected of true`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('ArrowDown');

      await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
      const expectedValue = await d.getItemAt(0).textContent();
      await d.getInput().press('Enter');
      await expect(d.getInput()).toHaveValue(expectedValue!);
    });

    test(`GIVEN a combobox with a chosen option
          AND the down arrow key is pressed
          THEN the data-highlighted option should not change on re-open`, async ({
      page,
    }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('ArrowDown');

      // second option highlighted
      await d.getInput().press('ArrowDown');
      await expect(d.getItemAt(1)).toHaveAttribute('data-highlighted');
      await d.getInput().press('Enter');
      await expect(d.getListbox()).toBeHidden();

      await d.getInput().press('ArrowDown');
      await expect(d.getItemAt(1)).toHaveAttribute('data-highlighted');
    });

    test(`GIVEN an open combobox with an option selected
            WHEN that same option is clicked
            THEN the listbox should remain open`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('ArrowDown');
      await d.getItemAt(0).click();

      await expect(d.getListbox()).toBeHidden();

      await d.openListbox('click');
      await d.getItemAt(0).click();

      await expect(d.getListbox()).toBeVisible();
    });

    test(`GIVEN an open combobox with an option selected
            WHEN that same option is clicked
            THEN the option should be unselected`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('ArrowDown');
      await d.getItemAt(0).click();

      await expect(d.getItemAt(0)).toHaveAttribute('data-selected');

      await d.openListbox('click');
      await d.getItemAt(0).click();

      await expect(d.getItemAt(0)).not.toHaveAttribute('data-selected');
    });

    test(`GIVEN an open combobox with an option selected
            WHEN that same option is pressed with the enter key
            THEN the listbox should remain open`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('ArrowDown');
      await d.getInput().press('Enter');

      await expect(d.getListbox()).toBeHidden();

      await d.openListbox('ArrowDown');
      await d.getInput().press('Enter');

      await expect(d.getListbox()).toBeVisible();
    });

    test(`GIVEN an open combobox with an option selected
            WHEN that same option is pressed with the enter key
            THEN the option should be unselected`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      await d.openListbox('ArrowDown');
      await d.getInput().press('Enter');

      await expect(d.getItemAt(0)).toHaveAttribute('data-selected');

      await d.openListbox('ArrowDown');
      await d.getInput().press('Enter');

      await expect(d.getItemAt(0)).not.toHaveAttribute('data-selected');
    });
  });

  test.describe('looping', () => {
    test.describe('loop disabled', () => {
      test(`GIVEN an open combobox
          AND the last option is data-highlighted
          WHEN the down key is pressed
          THEN data-highlighted should stay on the last option`, async ({ page }) => {
        const { driver: d } = await setup(page, 'hero');

        // initially last option is highlighted
        await d.openListbox('ArrowUp');
        await expect(d.getItemAt('last')).toHaveAttribute('data-highlighted');

        await d.getItemAt('last').press('ArrowDown');
        await expect(d.getItemAt('last')).toHaveAttribute('data-highlighted');
      });

      test(`GIVEN an open combobox
          AND the first option is data-highlighted
          WHEN the up arrow key is pressed
          THEN data-highlighted should stay on the first option`, async ({ page }) => {
        const { driver: d } = await setup(page, 'hero');

        await d.openListbox('ArrowDown');
        const firstItem = d.getItemAt(0);
        await expect(firstItem).toHaveAttribute('data-highlighted');
        await firstItem.press('ArrowUp');
        await expect(firstItem).toHaveAttribute('data-highlighted');
      });
    });

    test.describe('loop enabled', () => {
      test(`GIVEN an open combobox with loop enabled
            AND the last option is data-highlighted
            WHEN the down arrow key is pressed
            THEN the first option should have data-highlighted`, async ({ page }) => {
        const { driver: d } = await setup(page, 'loop');

        // initially last option is highlighted
        await d.openListbox('ArrowUp');

        await expect(d.getItemAt('last')).toHaveAttribute('data-highlighted');

        await d.getInput().press('ArrowDown');
        await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');
      });

      test(`GIVEN an open combobox with loop enabled
            AND the first option is data-highlighted
            WHEN the up arrow key is pressed
            THEN the last option should have data-highlighted`, async ({ page }) => {
        const { driver: d } = await setup(page, 'loop');

        // initially last option is highlighted
        await d.openListbox('ArrowDown');
        await expect(d.getItemAt(0)).toHaveAttribute('data-highlighted');

        await d.getInput().press('ArrowUp');
        await expect(d.getItemAt('last')).toHaveAttribute('data-highlighted');
      });
    });
  });

  test(`GIVEN an open combobox with multiple groups and a scrollable listbox
        AND the last option is not visible
        WHEN highlighting an option not visible in the viewport
        THEN it should be scrolled into view`, async ({ page }) => {
    const { driver: d } = await setup(page, 'scrollable');

    await d.openListbox('ArrowUp');

    // TODO: fix initially highlighting last item should scroll to the bottom. Execution order issue (likely with the popover)
    await d.getInput().press('ArrowUp');

    await expect(d.getItemAt('last')).toBeInViewport();
  });
});

test.describe('Disabled', () => {
  test(`GIVEN an open disabled combobox with the first option disabled
        WHEN clicking the disabled option
        It should have aria-disabled`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    await d.openListbox('ArrowDown');
    await expect(d.getItemAt(0)).toBeDisabled();
  });

  test(`GIVEN an open disabled combobox
        WHEN first option is disabled
        THEN the second option should have data-highlighted`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    await d.openListbox('ArrowDown');

    await expect(d.getItemAt(1)).toHaveAttribute('data-highlighted');
  });

  test(`GIVEN an open disabled combobox
        WHEN the last option is disabled and the up arrow key is pressed
        THEN the second last index should have data-highlighted`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    await d.openListbox('ArrowUp');
    const length = await d.getItemsLength();
    const lastEnabledOption = d.getItemAt(length - 2);
    await expect(lastEnabledOption).toHaveAttribute('data-highlighted');
  });

  test(`GIVEN an open disabled combobox
        WHEN the second option is highlighted and the down arrow key is pressed
        AND the first and third options are disabled
        THEN the fourth option should be highlighted`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    await d.openListbox('ArrowDown');
    await expect(d.getItemAt(1)).toHaveAttribute('data-highlighted');
    await d.getInput().press('ArrowDown');
    await expect(d.getItemAt(3)).toHaveAttribute('data-highlighted');
  });

  test(`GIVEN an open disabled combobox
        WHEN the fourth is highlighted and the up key is pressed
        AND the first and third options are disabled
        THEN the second option should be highlighted`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    // initially the fourh option is highlighted
    await d.openListbox('ArrowDown');
    const secondOption = await d.getItemAt(1);
    await expect(secondOption).toHaveAttribute('data-highlighted');
    await d.getInput().press('ArrowDown');
    await expect(d.getItemAt(3)).toHaveAttribute('data-highlighted');

    await d.getInput().press('ArrowUp');
    await expect(secondOption).toHaveAttribute('data-highlighted');
  });
});

test.describe('Props', () => {
  test(`GIVEN a combobox
        WHEN there is a placeholder
        THEN the placeholder should be presented instead of a selected value`, async ({
    page,
  }) => {
    await setup(page, 'placeholder');

    const input = await page.getByPlaceholder('placeholder');

    await expect(input).toBeVisible();
  });

  test(`GIVEN a combobox with an onChange$ prop
        WHEN the combobox value changes
        THEN the handler should run once`, async ({ page }) => {
    const { driver: d } = await setup(page, 'change');

    await d.openListbox('click');

    await d.getItemAt(3).click();

    const sibling = d.getRoot().locator('+ p');
    await expect(sibling).toHaveText('You have changed 1 times');
  });

  test(`GIVEN a combobox with an onOpenChange$ prop
        WHEN the combobox value changes
        THEN the placeholder should be presented instead of a selected value`, async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'open-change');

    await d.openListbox('click');

    const sibling = d.getRoot().locator('+ p');
    await expect(sibling).toHaveText('The listbox opened and closed 1 time(s)');
  });

  test(`GIVEN a combobox with an onInput$ prop
        WHEN typing in the combobox once
        THEN the handler should run once`, async ({ page }) => {
    const { driver: d } = await setup(page, 'input');

    const sibling = d.getRoot().locator('+ p');
    await expect(sibling).toHaveText('onInput$ was called 0 time(s)');
    await d.getInput().press('z');
    await expect(sibling).toHaveText('onInput$ was called 1 time(s)');
  });

  test.describe('initial', () => {
    test(`GIVEN a combobox with an initial value prop on the root
          WHEN the value data matches the fourth option
          THEN the selected value should be the data passed to the value prop`, async ({
      page,
    }) => {
      const { driver: d } = await setup(page, 'initial');

      const expectedValue = await d.getItemAt(3).textContent();

      await expect(d.getInput()).toHaveValue(expectedValue!);
      await expect(d.getItemAt(3)).toHaveAttribute('data-highlighted');
      await expect(d.getItemAt(3)).toHaveAttribute('aria-selected', 'true');
    });
  });

  test.describe('reactive', () => {
    test(`GIVEN a reactive combobox with a bind:value prop on the root
          WHEN the signal data matches the second option
          THEN the selected value has the data passed to the bind:value prop`, async ({
      page,
    }) => {
      const { driver: d } = await setup(page, 'reactive');

      const expectedValue = await d.getItemAt(1).textContent();

      await expect(d.getInput()).toHaveValue(expectedValue!);
      await expect(d.getItemAt(1)).toHaveAttribute('data-highlighted');
      await expect(d.getItemAt(1)).toHaveAttribute('aria-selected', 'true');
    });

    test(`GIVEN a reactive combobox with a bind:open prop on the root
          WHEN the bind:open signal changes to true
          THEN the listbox should open to reflect the new signal value`, async ({
      page,
    }) => {
      const { driver: d } = await setup(page, 'reactive-open');

      await expect(d.getListbox()).toBeHidden();

      page.getByRole('button', { name: 'Toggle open state' }).click();

      await expect(d.getListbox()).toBeVisible();
    });
  });

  test.describe('option value', () => {
    test(`GIVEN a combobox with distinct display and option values
          WHEN the 2nd option is selected
          THEN the selected value matches the 2nd option's value`, async ({ page }) => {
      const { driver: d } = await setup(page, 'item-value');

      await d.openListbox('ArrowDown');

      await expect(page.locator('p')).toContainText('The selected value is: null');
      await d.getInput().press('ArrowDown');
      await d.getInput().press('Enter');

      await expect(page.locator('p')).toContainText('The selected value is: 1');
    });

    test(`GIVEN a combobox with distinct display and option values
          WHEN a reactive value is set to the 5th option
          THEN the selected value matches the 5th option's value`, async ({ page }) => {
      const { driver: d } = await setup(page, 'programmatic');

      await expect(d.getInput()).toHaveValue('Ryan');
      await page.getByRole('button', { name: 'Change to Abby' }).click();

      await expect(d.getInput()).toHaveValue(`Abby`);
    });

    test(`GIVEN a combobox with distinct display and option values
          WHEN the 5th option is selected
          AND it clicks another option
          AND it goes back to the 5th option programmatically
          THEN the bind:value signal should update to reflect the 5th option's value`, async ({
      page,
    }) => {
      const { driver: d } = await setup(page, 'programmatic');

      await expect(d.getInput()).toHaveValue('Ryan');
      // setup
      await page.getByRole('button', { name: 'Change to Abby' }).click();
      await expect(d.getInput()).toHaveValue(`Abby`);

      await d.openListbox('click');
      await d.getItemAt(1).click();
      await expect(d.getInput()).toHaveValue(`Ryan`);
      await page.getByRole('button', { name: 'Change to Abby' }).click();
      await expect(d.getInput()).toHaveValue(`Abby`);
    });
  });
});

/** TODO: add docs telling people how to add an aria-label to the root component. (accessible name) */
test.describe('A11y', () => {
  test('Axe Validation Test', async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    const initialResults = await new AxeBuilder({ page })
      .include('[role="combobox"]')
      .analyze();

    expect(initialResults.violations).toEqual([]);

    await d.openListbox('click');

    const afterClickResults = await new AxeBuilder({ page })
      .include('[role="combobox"]')
      .analyze();

    expect(afterClickResults.violations).toEqual([]);
  });

  test(`GIVEN a combobox with a group
        WHEN the user adds a new group
        THEN the group should have an aria-labelledby attribute
        AND its associated label`, async ({ page }) => {
    const { driver: d } = await setup(page, 'group');
    await d.openListbox('ArrowDown');
    const label = page.locator('[data-group-label]').first();

    const labelId = await label.getAttribute('id');

    await expect(d.getRoot().getByRole('group').first()).toHaveAttribute(
      'aria-labelledby',
      labelId!,
    );
  });

  test(`GIVEN a combobox with aria-activedescendent on the input
        WHEN the listbox is opened and the down arrow key is pressed
        THEN aria-activedescendent should be the id of the second option`, async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'hero');
    await d.openListbox('ArrowDown');
    await d.getInput().press('ArrowDown');

    const secondOptionId = await d.getItemAt(1).getAttribute('id');

    await expect(d.getInput()).toHaveAttribute(
      'aria-activedescendant',
      `${secondOptionId}`,
    );
  });

  test(`GIVEN an open combobox with aria-activedescendent
        WHEN the listbox is closed
        THEN aria-activedescendent should be an empty string`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    await d.openListbox('ArrowDown');
    await d.getInput().press('Enter');
    await expect(d.getListbox()).toBeHidden();

    await expect(d.getInput()).toHaveAttribute('aria-activedescendant', '');
  });

  test(`GIVEN a combobox with aria-controls on the input
        WHEN the combobox renders
        THEN the root's aria-controls should be equal to the ID of the listbox`, async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'hero');
    await d.openListbox('ArrowDown');
    const listboxId = await d.getListbox().getAttribute('id');

    await expect(d.getInput()).toHaveAttribute('aria-controls', `${listboxId}`);
  });
});

test.describe('Multiple selection', () => {
  test.describe('mouse behavior', () => {
    test(`GIVEN a multi combobox
        WHEN clicking an option
        THEN the option should be selected
        AND the listbox should remain open`, async ({ page }) => {
      const { driver: d } = await setup(page, 'multiple');
      await d.openListbox('click');
      await d.getItemAt(0).click();
      await expect(d.getItemAt(0)).toHaveAttribute('aria-selected', 'true');
      await expect(d.getListbox()).toBeVisible();
    });

    test(`GIVEN a multi combobox
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

    test(`GIVEN a multi combobox
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

    test(`GIVEN a multi combobox
          WHEN clicking one option
          AND clicking another option
          THEN the selected value should contain both options`, async ({ page }) => {
      const { driver: d } = await setup(page, 'multiple');
      await d.openListbox('click');
      await d.getItemAt(0).click();
      await expect(d.getItemAt(0)).toHaveAttribute('aria-selected', 'true');
      await d.getItemAt(1).click();
      await expect(d.getItemAt(1)).toHaveAttribute('aria-selected', 'true');

      await expect(d.getControl()).toContainText('Apple');
      await expect(d.getControl()).toContainText('Apricot');
    });
  });

  test.describe('keyboard behavior', () => {
    test(`GIVEN an open multi combobox
            WHEN pressing the Enter key
            AND pressing the Enter key again
            THEN the selected option should toggle between selected and unselected`, async ({
      page,
    }) => {
      const { driver: d } = await setup(page, 'multiple');
      await d.openListbox('ArrowDown');
      await d.getInput().press('Enter');
      await expect(d.getItemAt(0)).toHaveAttribute('aria-selected', 'true');
      await d.getInput().press('Enter');
      await expect(d.getItemAt(0)).toHaveAttribute('aria-selected', 'false');
    });

    test(`GIVEN a multi combobox
          WHEN selecting an option
          AND hitting the escape key
          THEN the listbox should be closed`, async ({ page }) => {
      const { driver: d } = await setup(page, 'multiple');
      await d.openListbox('click');
      await d.getItemAt(0).click();
      await expect(d.getItemAt(0)).toHaveAttribute('aria-selected', 'true');
      await d.getInput().press('Escape');
      await expect(d.getListbox()).toBeHidden();
    });
  });
});

test.describe('Filtering options', () => {
  test(`GIVEN a combobox
        WHEN typing into the combobox
        THEN some options should be filtered`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    await d.openListbox('ArrowDown');
    expect(await d.getVisibleItemsLength()).toBe(8);
    await d.getInput().press('a');
    await expect(d.getInput()).toHaveValue('a');
    expect(await d.getVisibleItemsLength()).not.toBe(8);
  });

  test(`GIVEN a combobox
        WHEN typing a string that doesn't match an option
        THEN the listbox should be closed`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    await d.getInput().press('a');
    await expect(d.getInput()).toHaveValue('a');
    await expect(d.getListbox()).toBeVisible();
    await d.getInput().pressSequentially('bc123');
    await expect(d.getInput()).toHaveValue('abc123');
    await expect(d.getListbox()).toBeHidden();
  });

  test(`GIVEN a combobox
        WHEN typing a string that matches an option
        THEN the listbox should be open`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    await d.openListbox('ArrowDown');
    await d.getInput().pressSequentially('App');
    await expect(d.getListbox()).toBeVisible();
  });

  test(`GIVEN a combobox with some filtered options
        WHEN the input is cleared
        THEN everything should be displayed`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    // initial setup
    await d.openListbox('ArrowDown');
    expect(await d.getVisibleItemsLength()).toBe(8);
    await d.getInput().press('a');
    await expect(d.getInput()).toHaveValue('a');
    expect(await d.getVisibleItemsLength()).not.toBe(8);

    await d.getInput().press('Backspace');
    await expect(d.getInput()).toHaveValue('');
    expect(await d.getVisibleItemsLength()).toBe(8);
  });

  test(`GIVEN a combobox
        WHEN an option is selected
        AND the typed string does not match the filter function
        THEN the option should be unselected`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    await d.openListbox('ArrowDown');
    await d.getInput().press('Enter');
    await expect(d.getItemAt(0)).toHaveAttribute('aria-selected', 'true');

    await d.getInput().press('z');
    await expect(d.getItemAt(0)).toHaveAttribute('aria-selected', 'false');
  });

  test(`GIVEN a combobox
        WHEN a custom filter is set
        THEN it should respect the filter function`, async ({ page }) => {
    const { driver: d } = await setup(page, 'filter');
    await d.openListbox('ArrowDown');
    await d.getInput().press('a');

    const getVisibleItems = await page.locator('[data-item]:visible');
    await expect(getVisibleItems.nth(0)).toHaveText('Apple');
    await expect(getVisibleItems.nth(1)).toHaveText('Apricot');
  });
});
