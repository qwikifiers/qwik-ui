import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './checkbox.driver';
import { getTriBool } from '../checklist/checklist-context-wrapper';
async function setup(page: Page, exampleName: string) {
  await page.goto(`/headless/checkbox/${exampleName}`);

  const driver = createTestDriver(page);

  const {
    getCheckbox,
    getTriCheckbox,
    getRoot,
    getIcon,
    getCheckList,
    getChecklistUL,
    getChecklistLIs,
  } = driver;

  return {
    driver,
    getCheckbox,
    getIcon,
    getCheckList,
    getChecklistUL,
    getChecklistLIs,
    getTriCheckbox,
    getRoot,
  };
}

test.describe('checklist', () => {
  test(`GIVEN a mixed checklist
  WHEN the checklist renders
  IT should render the mixed img
  AND not the true img`, async ({ page }) => {
    const exampleName = 'test-controlled-list-mixed';
    await setup(page, exampleName);
    await expect(page.locator('#mixed-img')).toBeVisible();
    await expect(page.locator('#true-img')).toBeHidden();
  });

  test(`GIVEN an all-checked checklist
  WHEN the checklist renders
  IT should  render the true img
  AND not the mixed img`, async ({ page }) => {
    const exampleName = 'test-controlled-list-true';
    await setup(page, exampleName);
    await expect(page.locator('#true-img')).toBeVisible();
    await expect(page.locator('#mixed-img')).toBeHidden();
  });

  test(`GIVEN an all-unchecked checklist
  WHEN the checklist renders
  IT should  render the true img and the mixed img`, async ({ page }) => {
    const exampleName = 'test-controlled-list-false';
    await setup(page, exampleName);
    await expect(page.locator('#true-img')).toBeHidden();
    await expect(page.locator('#mixed-img')).toBeHidden();
  });

  test(`GIVEN a checklist with checkboxes
        WHEN the elements render
        THEN the checklist should be a <ul> with  <li>s of checkboxes, all wrapped around a div with a role and aria-labeledby attributes`, async ({
    page,
  }) => {
    const { getCheckList, getChecklistUL, getChecklistLIs } = await setup(
      page,
      'test-list',
    );
    await expect(getCheckList()).toBeVisible();
    await expect(getCheckList()).toHaveAttribute('aria-labelledby', 'test123');
    await expect(getChecklistUL()).toBeVisible();
    await expect(getChecklistLIs()).toBeVisible();
  });

  test(`GIVEN a tri boolean function
        WHEN it recieves an array of booleans
        IT should return the correct tri bool`, async () => {
    const indeterminateArr = [true, true, false];
    const trueArr = [true, true, true];
    const falseArr = [false, false, false];
    const emptyArr: boolean[] = [];
    expect(getTriBool(indeterminateArr)).toBe('indeterminate');
    expect(getTriBool(trueArr)).toBe(true);
    expect(getTriBool(falseArr)).toBe(false);
    expect(getTriBool(emptyArr)).toBe('indeterminate');
  });

  test(`GIVEN checklist with all unchecked checkboxes
        WHEN it renders
        the chekbox with aria-controls should have aria-checked false`, async ({
    page,
  }) => {
    const exampleName = 'test-list';
    const { getTriCheckbox } = await setup(page, exampleName);
    await expect(getTriCheckbox()).toBeVisible();
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'false');
  });
  test(`GIVEN checklist with all unchecked checkboxes
        WHEN the first checkbox is checked
        the chekbox with aria-controls should have aria-checked mixed`, async ({
    page,
  }) => {
    const exampleName = 'test-list';
    const { getTriCheckbox, getCheckbox } = await setup(page, exampleName);
    await expect(getTriCheckbox()).toBeVisible();
    await getCheckbox().nth(1).press(' ');
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'mixed');
  });

  test(`GIVEN checklist with all unchecked checkboxes
        WHEN all checkboxes are checked
        the chekbox with aria-controls should have aria-checked true`, async ({
    page,
  }) => {
    const exampleName = 'test-list';
    const { getTriCheckbox, getCheckbox } = await setup(page, exampleName);
    await expect(getTriCheckbox()).toBeVisible();
    await getCheckbox().nth(1).press(' ');
    await getCheckbox().nth(2).press(' ');
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'true');
  });

  test(`GIVEN checklist with all unchecked checkboxes
        WHEN the checklist's checkbox is checked
        THEN  all chekboxes should have aria-checked true`, async ({ page }) => {
    const exampleName = 'test-list';
    const { getTriCheckbox, getCheckbox } = await setup(page, exampleName);
    await expect(getTriCheckbox()).toBeVisible();
    await getTriCheckbox().press(' ');
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'true');
    await expect(getCheckbox().nth(1)).toHaveAttribute('aria-checked', 'true');
    await expect(getCheckbox().nth(2)).toHaveAttribute('aria-checked', 'true');
  });

  // TODO: reme two part of test by adding new test file
  test(`GIVEN checklist with all unchecked checkboxes
        WHEN the checklist's checkbox is checked twice
        THEN  all chekboxes should go from aria-checked true to aria-checkded false`, async ({
    page,
  }) => {
    const exampleName = 'test-list';
    const { getTriCheckbox, getCheckbox } = await setup(page, exampleName);
    await expect(getTriCheckbox()).toBeVisible();
    await getTriCheckbox().press(' ');
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'true');
    await expect(getCheckbox().nth(1)).toHaveAttribute('aria-checked', 'true');
    await expect(getCheckbox().nth(2)).toHaveAttribute('aria-checked', 'true');
    await getTriCheckbox().press(' ');
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'false');
    await expect(getCheckbox().nth(1)).toHaveAttribute('aria-checked', 'false');
    await expect(getCheckbox().nth(2)).toHaveAttribute('aria-checked', 'false');
  });
  test(`GIVEN checklist with checkboxes
        WHEN the values of aria-controls are search
        IT should always return a valid, non-duplicate, checkboxes`, async ({ page }) => {
    const { getTriCheckbox } = await setup(page, 'test-list');
    await expect(getTriCheckbox()).toHaveAttribute('aria-controls');
    const magic = await getTriCheckbox().getAttribute('aria-controls');
    expect(magic).not.toBe(null);
    if (magic === null) {
      throw new Error(
        'no mixed checkbox found. Was the driver or test template changed?',
      );
    }
    const idArr = magic.split(' ');
    expect(isUniqArr(idArr)).toBe(true);
    for (let index = 0; index < idArr.length; index++) {
      const elementId = idArr[index];
      const PosCheckbox = page.locator(`#${elementId}`);
      await expect(PosCheckbox).toBeVisible();
      const role = await PosCheckbox.getAttribute('role');
      expect(role).toBe('checkbox');
    }
  });

  test(`GIVEN a controlled checklist with one default checkbox and a controlled checkbox of true
    WHEN it renders
    IT should have aria-checked mixed`, async ({ page }) => {
    const exampleName = 'test-controlled-list';
    const { getTriCheckbox } = await setup(page, exampleName);
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'mixed');
  });

  test(`GIVEN a controlled checklist with two true checkboxes
    WHEN it renders
    IT should have aria-checked true`, async ({ page }) => {
    const exampleName = 'test-controlled-list-trues';
    const { getTriCheckbox } = await setup(page, exampleName);
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'true');
  });
  test(`GIVEN a controlled checklist with two false checkboxes
    WHEN it renders
    IT should have aria-checked true`, async ({ page }) => {
    const exampleName = 'test-controlled-list-falses';
    const { getTriCheckbox } = await setup(page, exampleName);
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'false');
  });

  test(`GIVEN a controlled checklist with mixed checkboxes
    WHEN it renders
    IT should have aria-checked mixed`, async ({ page }) => {
    const exampleName = 'test-controlled-list-mixed';
    const { getTriCheckbox } = await setup(page, exampleName);
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'mixed');
  });

  test(`GIVEN a controlled checklist with a checklist signal of true and default checkboxes as children
    WHEN the checklist renders
    IT shoud have aria-checked true`, async ({ page }) => {
    const exampleName = 'test-controlled-list-true';
    const { getTriCheckbox } = await setup(page, exampleName);
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'true');
  });
  test(`GIVEN a controlled checklist with a checklist signal of true and default checkboxes as children
  WHEN the checklist renders
  ALL its child checkboxes should have aria-checked true`, async ({ page }) => {
    const exampleName = 'test-controlled-list-true';
    const { getCheckbox } = await setup(page, exampleName);
    const allCheckboxes = await getCheckbox().all();
    for (let index = 0; index < allCheckboxes.length; index++) {
      const checkbox = allCheckboxes[index];
      await expect(checkbox).toHaveAttribute('aria-checked', 'true');
    }
  });

  // TODO: change api to not use indeterminate and used mixed instead
  test(`GIVEN a controlled checklist with a checklist signal of true and default checkboxes as children
  WHEN a child checkbox is unchecked
  THEN the checklist signal should have aria-checked mixed`, async ({ page }) => {
    const exampleName = 'test-controlled-list-true';
    const { getTriCheckbox } = await setup(page, exampleName);
    const firstCheckbox = page.locator('#child-1');
    await firstCheckbox.press(' ');
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'mixed');
  });

  test(`GIVEN a controlled checklist with a checklist signal of true and default checkboxes as children
  WHEN all child checkbox are unchecked
  THEN the checklist signal should have aria-checked false`, async ({ page }) => {
    const exampleName = 'test-controlled-list-true';
    const { getTriCheckbox } = await setup(page, exampleName);
    await page.locator('#child-1').press(' ');
    await page.locator('#child-2').press(' ');
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'false');
  });
  test(`GIVEN a controlled checklist with every checkbox having a defined ID
    WHEN it renders
    ALL IDs should be present/rendered`, async ({ page }) => {
    await setup(page, 'test-props-ids-list');
    const hardCodedIds = ['checklist', 'child-1', 'child-2'];
    for (let index = 0; index < hardCodedIds.length; index++) {
      const id = hardCodedIds[index];
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });

  test(`GIVEN a controlled checklist with every checkbox having a defined ID
    WHEN it renders
    THEN all IDs should be present in the aria-controls`, async ({ page }) => {
    const { getTriCheckbox } = await setup(page, 'test-props-ids-list');
    const hardChildren = ['child-1', 'child-2'];
    const magic = await getTriCheckbox().getAttribute('aria-controls');
    const twin = magic?.split(' ');
    expect(hardChildren).toStrictEqual(twin);
  });

  test(`GIVEN checklist with all unchecked checkboxes
        WHEN the first child checkbox is clicked
        the chekbox with aria-controls should have aria-checked mixed`, async ({
    page,
  }) => {
    const exampleName = 'test-list';
    const { getTriCheckbox, getCheckbox } = await setup(page, exampleName);
    await expect(getTriCheckbox()).toBeVisible();
    await getCheckbox().nth(1).click();
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'mixed');
  });

  test(`GIVEN checklist with all unchecked checkboxes
        WHEN all checkboxes are checked
        the chekbox with aria-controls should have aria-checked true`, async ({
    page,
  }) => {
    const exampleName = 'test-list';
    const { getTriCheckbox, getCheckbox } = await setup(page, exampleName);
    await expect(getTriCheckbox()).toBeVisible();
    await getCheckbox().nth(1).click();
    await getCheckbox().nth(2).click();
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'true');
  });

  test(`GIVEN checklist with all unchecked checkboxes
        WHEN the checklist's checkbox is checked
        THEN  all chekboxes should have aria-checked true`, async ({ page }) => {
    const exampleName = 'test-list';
    const { getTriCheckbox, getCheckbox } = await setup(page, exampleName);
    await expect(getTriCheckbox()).toBeVisible();
    await getTriCheckbox().click();
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'true');
    await expect(getCheckbox().nth(1)).toHaveAttribute('aria-checked', 'true');
    await expect(getCheckbox().nth(2)).toHaveAttribute('aria-checked', 'true');
  });

  // TODO: reme two part of test by adding new test file
  test(`GIVEN checklist with all unchecked checkboxes
        WHEN the checklist's checkbox is checked twice
        THEN  all chekboxes should go from aria-checked true to aria-checkded false`, async ({
    page,
  }) => {
    const exampleName = 'test-list';
    const { getTriCheckbox, getCheckbox } = await setup(page, exampleName);
    await expect(getTriCheckbox()).toBeVisible();
    await getTriCheckbox().click();
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'true');
    await expect(getCheckbox().nth(1)).toHaveAttribute('aria-checked', 'true');
    await expect(getCheckbox().nth(2)).toHaveAttribute('aria-checked', 'true');
    await getTriCheckbox().click();
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'false');
    await expect(getCheckbox().nth(1)).toHaveAttribute('aria-checked', 'false');
    await expect(getCheckbox().nth(2)).toHaveAttribute('aria-checked', 'false');
  });
  test(`GIVEN checklist with checkboxes
        WHEN the values of aria-controls are search
        IT should always return a valid, non-duplicate, checkboxes`, async ({ page }) => {
    const { getTriCheckbox } = await setup(page, 'test-list');
    await expect(getTriCheckbox()).toHaveAttribute('aria-controls');
    const magic = await getTriCheckbox().getAttribute('aria-controls');
    expect(magic).not.toBe(null);
    const idArr = magic!.split(' ');
    expect(isUniqArr(idArr)).toBe(true);
    for (let index = 0; index < idArr.length; index++) {
      const elementId = idArr[index];
      const PosCheckbox = page.locator(`#${elementId}`);
      await expect(PosCheckbox).toBeVisible();
      const role = await PosCheckbox.getAttribute('role');
      expect(role).toBe('checkbox');
    }
  });

  test(`GIVEN a controlled checklist with a checklist signal of true and default checkboxes as children
      WHEN a child checkbox is unchecked
      THEN the checklist signal should have aria-checked mixed`, async ({ page }) => {
    const exampleName = 'test-controlled-list-true';
    const { getTriCheckbox } = await setup(page, exampleName);
    const firstCheckbox = page.locator('#child-1');
    await firstCheckbox.click();
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'mixed');
  });

  test(`GIVEN a controlled checklist with a checklist signal of true and default checkboxes as children
      WHEN all child checkbox are unchecked
      THEN the checklist signal should have aria-checked false`, async ({ page }) => {
    const exampleName = 'test-controlled-list-true';
    const { getTriCheckbox } = await setup(page, exampleName);
    await page.locator('#child-1').click();
    await page.locator('#child-2').click();
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'false');
  });
});
test.describe('checkbox', () => {
  test(`GIVEN a checkbox with a user sig value of true
  WHEN the checkbox renders
  IT should have aria-checked as true`, async ({ page }) => {
    const exampleName = 'test-hero';
    const { getCheckbox } = await setup(page, exampleName);
    await expect(getCheckbox()).toBeVisible();
    await expect(getCheckbox()).toHaveAttribute('aria-checked', 'true');
  }),
    test(`GIVEN a checkbox with a user sig value of true
WHEN the checkbox is focused and the spacebar is pressed
IT should have aria-checked as false`, async ({ page }) => {
      const exampleName = 'test-hero';
      const { getCheckbox } = await setup(page, exampleName);
      await expect(getCheckbox()).toBeVisible();
      await getCheckbox().focus();
      await getCheckbox().press(' ');
      await expect(getCheckbox()).toHaveAttribute('aria-checked', 'false');
    });

  test(`GIVEN a checkbox with a user sig value of true
  WHEN the checkbox is focused and the spacebar is pressed
  IT should have its icon hidden`, async ({ page }) => {
    const exampleName = 'test-hero';
    const { getCheckbox, getIcon } = await setup(page, exampleName);
    await expect(getIcon()).toBeVisible();
    await getCheckbox().focus();
    await getCheckbox().press(' ');
    await expect(getCheckbox()).toHaveAttribute('aria-checked', 'false');
    await expect(getIcon()).toBeHidden();
  });
  test(`GIVEN a default checkbox with a default sig value of false
  WHEN the checkbox is focused and the spacebar is pressed
  IT should have its icon visible`, async ({ page }) => {
    const exampleName = 'test-default';
    const { getCheckbox, getIcon } = await setup(page, exampleName);
    await expect(getIcon()).toBeHidden();
    await getCheckbox().focus();
    await getCheckbox().press(' ');
    await expect(getCheckbox()).toHaveAttribute('aria-checked', 'false');
    await expect(getIcon()).toBeVisible();
  });

  test(`GIVEN a checkbox with a user sig value of true
        WHEN the checkbox is clicked
        IT should have aria-checked as false`, async ({ page }) => {
    const exampleName = 'test-hero';
    const { getCheckbox } = await setup(page, exampleName);
    await expect(getCheckbox()).toBeVisible();
    await getCheckbox().click();
    await expect(getCheckbox()).toHaveAttribute('aria-checked', 'false');
  });

  test(`GIVEN a checkbox with a user sig value of true
        WHEN the checkbox is clicked
        IT should have its icon hidden`, async ({ page }) => {
    const exampleName = 'test-hero';
    const { getCheckbox, getIcon } = await setup(page, exampleName);
    await expect(getIcon()).toBeVisible();
    await getCheckbox().click();
    await expect(getCheckbox()).toHaveAttribute('aria-checked', 'false');
    await expect(getIcon()).toBeHidden();
  });
  test(`GIVEN a default checkbox with a default sig value of false
        WHEN the checkbox is clicked
        IT should have its icon visible`, async ({ page }) => {
    const exampleName = 'test-default';
    const { getCheckbox, getIcon } = await setup(page, exampleName);
    await expect(getIcon()).toBeHidden();
    await getCheckbox().click();
    await expect(getCheckbox()).toHaveAttribute('aria-checked', 'false');
    await expect(getIcon()).toBeVisible();
  });
});
//TODO: create util file
//TODO: add click
//TODO: refactor to use ids instead of nths since its test-only now
function isUniqArr(arr: string[]) {
  const singleInstances = new Set(arr);
  return arr.length === singleInstances.size;
}
