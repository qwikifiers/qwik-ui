import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './checkbox.driver';
import { TriBool, getTriBool } from './checklist-context-wrapper';
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

test.describe('single checkbox behavior', () => {
  test(`GIVEN a checkbox with a user sig value of true
        WHEN the checkbox renders
        IT should have aria-checked as true`, async ({ page }) => {
    const exampleName = 'hero';
    const { getCheckbox } = await setup(page, exampleName);
    await expect(getCheckbox()).toBeVisible();
    await expect(getCheckbox()).toHaveAttribute('aria-checked', 'true');
  }),
    test(`GIVEN a checkbox with a user sig value of true
        WHEN the checkbox is focused and the spacebar is pressed
        IT should have aria-checked as false`, async ({ page }) => {
      const exampleName = 'hero';
      const { getCheckbox } = await setup(page, exampleName);
      await expect(getCheckbox()).toBeVisible();
      await getCheckbox().focus();
      await getCheckbox().press(' ');
      await expect(getCheckbox()).toHaveAttribute('aria-checked', 'false');
    });

  test(`GIVEN a checkbox with a user sig value of true
        WHEN the checkbox is focused and the spacebar is pressed
        IT should have its icon hidden`, async ({ page }) => {
    const exampleName = 'hero';
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
    const exampleName = 'default';
    const { getCheckbox, getIcon } = await setup(page, exampleName);
    await expect(getIcon()).toBeHidden();
    await getCheckbox().focus();
    await getCheckbox().press(' ');
    await expect(getCheckbox()).toHaveAttribute('aria-checked', 'false');
    await expect(getIcon()).toBeVisible();
  });
});
test.describe('checklist behavior', () => {
  test(`GIVEN a checklist with checkboxes
        WHEN the elements render
        THEN the checklist should be a <ul> with  <li>s of checkboxes, all wrapped around a div with a role and aria-labeledby attributes`, async ({
    page,
  }) => {
    const exampleName = 'list';
    const { getIcon, getCheckList, getCheckbox, getChecklistUL, getChecklistLIs } =
      await setup(page, exampleName);
    await expect(getCheckList()).toBeVisible();
    await expect(getCheckList()).toHaveAttribute('aria-labelledby', 'test123');
    await expect(getChecklistUL()).toBeVisible();
    await expect(getChecklistLIs()).toBeVisible();
  });

  test(`GIVEN a tri boolean function
        WHEN it recieves an array of booleans
        IT should return the correct tri bool`, async ({ page }) => {
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
    const exampleName = 'list';
    const { getTriCheckbox } = await setup(page, exampleName);
    await expect(getTriCheckbox()).toBeVisible();
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'false');
  });
  test(`GIVEN checklist with all unchecked checkboxes
        WHEN the first checkbox is checked
        the chekbox with aria-controls should have aria-checked mixed`, async ({
    page,
  }) => {
    const exampleName = 'list';
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
    const exampleName = 'list';
    const { getTriCheckbox, getCheckbox } = await setup(page, exampleName);
    await expect(getTriCheckbox()).toBeVisible();
    await getCheckbox().nth(1).press(' ');
    await getCheckbox().nth(2).press(' ');
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'true');
  });

  test(`GIVEN checklist with all unchecked checkboxes
        WHEN the checklist's checkbox is checked
        THEN  all chekboxes should have aria-checked true`, async ({ page }) => {
    const exampleName = 'list';
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
    const exampleName = 'list';
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
});
