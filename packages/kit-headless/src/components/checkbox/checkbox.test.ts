// TODO: refactor this into checkbox.test.ts and checklist.test.ts

import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './checkbox.driver';
async function setup(page: Page, exampleName: string) {
  await page.goto(`http://localhost:6174/checkbox/${exampleName}`);

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

/**
 *  TYPESCRIPT SUPPORT + LESS IMPORTS
 *   test(`GIVEN a carousel
        WHEN clicking on the next button
        THEN it should move to the next slide`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.getNextButton().click();
    await expect(d.getSlideAt(1)).toHaveAttribute('data-active');
  });
 */

// components -> usually modular, sometimes grouped depending on what it is
// modular -> tests ONE SPECIFIC thing

// grouped -> tests groups of things

/**
 * 
 *  test.describe('Critical functionality', () => {
 *      test(`GIVEN a checkbox
              When the checkbox is clicked
              Then it should be checked`, async ({ page }) => {
          await expect() -> aria-checked
          await expect() -> data-checked
       });

       // if there's too many of one thing (for example, maybe you need to check 10 different keys! make it a describe block)
        test(`GIVEN a checkbox
              When the checkbox is pressed with space
              Then it should be checked`, async ({ page }) => {
          
       });

       Ex: Select

       test.describe('Keyboard Behavior', () => {

      });
 * })
 * 
 */

test.describe('checkbox', () => {
  // test default state and click from unchecked checkbox
  test(`GIVEN a checkbox that is initially unchecked
        and its icon is hidden
        WHEN the checkbox is clicked
        IT should toggle aria-checked to true
        and make its icon visible`, async ({ page }) => {
    const exampleName = 'test-default';
    const { getCheckbox, getIcon } = await setup(page, exampleName);
    await expect(getCheckbox()).toHaveAttribute('aria-checked', 'false');
    await expect(getIcon()).toBeHidden();
    await getCheckbox().click();
    await expect(getCheckbox()).toHaveAttribute('aria-checked', 'true');
    await expect(getIcon()).toBeVisible();
  });

  //  test default state and keyboard space from unchecked checkbox
  test(`GIVEN a checkbox that is initially unchecked
        and its icon is hidden
        WHEN the checkbox is focused and the spacebar is pressed
        IT should toggle aria-checked to true
        and make its icon visible`, async ({ page }) => {
    const exampleName = 'test-default';
    const { getCheckbox, getIcon } = await setup(page, exampleName);
    await expect(getCheckbox()).toHaveAttribute('aria-checked', 'false');
    await expect(getIcon()).toBeHidden();
    await getCheckbox().focus();
    await getCheckbox().press(' ');
    await expect(getCheckbox()).toHaveAttribute('aria-checked', 'true');
    await expect(getIcon()).toBeVisible();
  });

  // test default state from checked checkbox
  test(`GIVEN a checkbox that is checked
        WHEN the checkbox renders
        IT should have aria-checked as true
        and its icon visible`, async ({ page }) => {
    const exampleName = 'test-initial-checked';
    const { getCheckbox, getIcon } = await setup(page, exampleName);
    await expect(getCheckbox()).toBeVisible();
    await expect(getCheckbox()).toHaveAttribute('aria-checked', 'true');
    await expect(getIcon()).toBeVisible();
  });

  // test mouse click
  test(`GIVEN a checkbox that is checked
        WHEN the checkbox is clicked
        IT should have aria-checked as false
        and its icon hidden`, async ({ page }) => {
    const exampleName = 'test-initial-checked';
    const { getCheckbox, getIcon } = await setup(page, exampleName);
    await expect(getCheckbox()).toBeVisible();
    await getCheckbox().click();
    await expect(getCheckbox()).toHaveAttribute('aria-checked', 'false');
    await expect(getIcon()).toBeHidden();
  });

  //  test keyboard space from checked checkbox
  test(`GIVEN a checkbox that is checked
        WHEN the checkbox is focused and the spacebar is pressed
        IT should have aria-checked as false
        and its icon hidden`, async ({ page }) => {
    const exampleName = 'test-initial-checked';
    const { getCheckbox, getIcon } = await setup(page, exampleName);
    await expect(getCheckbox()).toBeVisible();
    await getCheckbox().focus();
    await getCheckbox().press(' ');
    await expect(getCheckbox()).toHaveAttribute('aria-checked', 'false');
    await expect(getIcon()).toBeHidden();
  });
});

// Checklisst tests
test.describe('checklist', () => {
  //   test(`GIVEN a mixed checklist
  //   WHEN the checklist renders
  //   IT should render the mixed img
  //   AND not the true img`, async ({ page }) => {
  //     const exampleName = 'test-controlled-list-mixed';
  //     await setup(page, exampleName);
  //     await expect(page.locator('#mixed-img')).toBeVisible();
  //     await expect(page.locator('#true-img')).toBeHidden();
  // });

  test(`GIVEN a checklist with all items checked
        WHEN the checklist renders
        The indicator in the toggle all checkbox should be visible`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-controlled-list-true');
    await expect(d.getSelectAllIndicator()).toBeVisible();
  });

  test(`GIVEN an all-unchecked checklist
  WHEN the checklist renders
  IT should  render the true img and the mixed img`, async ({ page }) => {
    const exampleName = 'test-controlled-list-false';
    await setup(page, exampleName);
    await expect(page.locator('#true-img')).toBeHidden();
    await expect(page.locator('#mixed-img')).toBeHidden();
  });

  // TODO: fix this test
  // test(`GIVEN a checklist with checkboxes
  //       WHEN the elements render
  //       THEN the checklist should be a <ul> with  <li>s of checkboxes, all wrapped around a div with a role and aria-labeledby attributes`, async ({
  //   page,
  // }) => {
  //   const { getRoot, getCheckList, getChecklistUL, getChecklistLIs } =
  //     await setup(page, 'test-list');
  //   await expect(getCheckList()).toBeVisible();
  //   await expect(getCheckList()).toHaveAttribute('aria-labelledby', 'test123');
  //   await expect(getChecklistUL()).toBeVisible();
  //   await expect(getChecklistLIs()).toBeVisible();
  // });

  // not using triboolean
  // test(`GIVEN a tri boolean function
  //       WHEN it recieves an array of booleans
  //       IT should return the correct tri bool`, async () => {
  //   const indeterminateArr = [true, true, false];
  //   const trueArr = [true, true, true];
  //   const falseArr = [false, false, false];
  //   const emptyArr: boolean[] = [];
  //   expect(getTriBool(indeterminateArr)).toBe('indeterminate');
  //   expect(getTriBool(trueArr)).toBe(true);
  //   expect(getTriBool(falseArr)).toBe(false);
  //   expect(getTriBool(emptyArr)).toBe('indeterminate');
  // });

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

  // Not using mixed yet
  // test(`GIVEN checklist with all unchecked checkboxes
  //       WHEN the first checkbox is checked
  //       the chekbox with aria-controls should have aria-checked mixed`, async ({
  //   page,
  // }) => {
  //   const exampleName = 'test-list';
  //   const { getTriCheckbox, getCheckbox } = await setup(page, exampleName);
  //   await expect(getTriCheckbox()).toBeVisible();
  //   await getCheckbox().nth(1).press(' ');
  //   await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'mixed');
  // });

  // 4
  test(`GIVEN checklist with all unchecked checkboxes
        WHEN all checkboxes are checked
        the toggle all indicator should be checked`, async ({ page }) => {
    const exampleName = 'test-list';
    const { driver: d } = await setup(page, exampleName);
    await expect(d.getSelectAllIndicator()).toBeHidden();
    await d.getCheckbox().nth(1).click();
    await d.getCheckbox().nth(2).click();
    await expect(d.getSelectAllIndicator()).toBeVisible();
  });

  //5
  test(`GIVEN checklist with all unchecked checkboxes
        WHEN the checklist's checkbox is checked with space
        THEN  all chekboxes should have aria-checked true`, async ({ page }) => {
    const exampleName = 'test-list';
    const { getTriCheckbox, getCheckbox } = await setup(page, exampleName);
    await expect(getTriCheckbox()).toBeVisible();
    await getTriCheckbox().press(' ');
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'true');
    await expect(getCheckbox().nth(1)).toHaveAttribute('aria-checked', 'true');
    await expect(getCheckbox().nth(2)).toHaveAttribute('aria-checked', 'true');
  });

  //6
  // TODO: reme two part of test by adding new test file
  test(`GIVEN checklist with all unchecked checkboxes
        WHEN the checklist's checkbox is checked twice using space
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

  // Search?
  // test(`GIVEN checklist with checkboxes
  //       WHEN the values of aria-controls are search
  //       IT should always return a valid, non-duplicate, checkboxes`, async ({
  //   page,
  // }) => {
  //   const { getTriCheckbox } = await setup(page, 'test-list');
  //   await expect(getTriCheckbox()).toHaveAttribute('aria-controls');
  //   const magic = await getTriCheckbox().getAttribute('aria-controls');
  //   expect(magic).not.toBe(null);
  //   if (magic === null) {
  //     throw new Error(
  //       'no mixed checkbox found. Was the driver or test template changed?'
  //     );
  //   }
  //   const idArr = magic.split(' ');
  //   expect(isUniqArr(idArr)).toBe(true);
  //   for (let index = 0; index < idArr.length; index++) {
  //     const elementId = idArr[index];
  //     const PosCheckbox = page.locator(`#${elementId}`);
  //     await expect(PosCheckbox).toBeVisible();
  //     const role = await PosCheckbox.getAttribute('role');
  //     expect(role).toBe('checkbox');
  //   }
  // });

  // Not using mixed yet
  // test(`GIVEN a controlled checklist with one default checkbox and a controlled checkbox of true
  //   WHEN it renders
  //   IT should have aria-checked mixed`, async ({ page }) => {
  //   const exampleName = 'test-controlled-list';
  //   const { getTriCheckbox } = await setup(page, exampleName);
  //   await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'mixed');
  // });

  //7
  test(`GIVEN a controlled checklist with two checked checkboxes
    WHEN it renders
    IT should have aria-checked true`, async ({ page }) => {
    const exampleName = 'test-controlled-list-trues';
    const { getTriCheckbox } = await setup(page, exampleName);
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'true');
  });

  //8
  test(`GIVEN a controlled checklist with two unchecked checkboxes
    WHEN it renders
    IT should have aria-checked true`, async ({ page }) => {
    const exampleName = 'test-controlled-list-falses';
    const { getTriCheckbox } = await setup(page, exampleName);
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'false');
  });

  //Not using mixed yet
  // test(`GIVEN a controlled checklist with mixed checkboxes
  //   WHEN it renders
  //   IT should have aria-checked mixed`, async ({ page }) => {
  //   const exampleName = 'test-controlled-list-mixed';
  //   const { getTriCheckbox } = await setup(page, exampleName);
  //   await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'mixed');
  // });

  //9
  test(`GIVEN a checklist with intial value of true and default checkboxes as children
    WHEN the checklist renders
    IT shoud have aria-checked true`, async ({ page }) => {
    const exampleName = 'test-controlled-list-true';
    const { getTriCheckbox } = await setup(page, exampleName);
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'true');
  });

  //10
  test(`GIVEN a checklist with intial value of true and default checkboxes as children
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

  // Not using mixed yet
  // ONE CHILD UNCHECKED
  //11
  test(`GIVEN a checklist that has all items checked
        WHEN a child checkbox is unchecked
        THEN the checklist signal should have a mixed state`, async ({ page }) => {
    const exampleName = 'test-controlled-list-true';
    const { getTriCheckbox, getCheckbox } = await setup(page, exampleName);
    const firstCheckbox = getCheckbox().first();
    await firstCheckbox.click();
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'mixed');
  });

  // Not implemented yet
  // ALL CHILDREN UNCHECKED
  // test(`GIVEN a controlled checklist with a checklist signal of true and default checkboxes as children
  // WHEN all child checkbox are unchecked
  // THEN the checklist signal should have aria-checked false`, async ({
  //   page,
  // }) => {
  //   const exampleName = 'test-controlled-list-true';
  //   const { getTriCheckbox } = await setup(page, exampleName);
  //   await page.locator('#child-1').press(' ');
  //   await page.locator('#child-2').press(' ');
  //   await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'false');
  // });

  //Not using IDs yet and may not be needed
  // test(`GIVEN a controlled checklist with every checkbox having a defined ID
  //   WHEN it renders
  //   ALL IDs should be present/rendered`, async ({ page }) => {
  //   await setup(page, 'test-props-ids-list');
  //   const hardCodedIds = ['checklist', 'child-1', 'child-2'];
  //   for (let index = 0; index < hardCodedIds.length; index++) {
  //     const id = hardCodedIds[index];
  //     await expect(page.locator(`#${id}`)).toBeVisible();
  //   }
  // });

  //Not using IDs yet and may not be needed
  // test(`GIVEN a controlled checklist with every checkbox having a defined ID
  //   WHEN it renders
  //   THEN all IDs should be present in the aria-controls`, async ({ page }) => {
  //   const { getTriCheckbox } = await setup(page, 'test-props-ids-list');
  //   const hardChildren = ['child-1', 'child-2'];
  //   const magic = await getTriCheckbox().getAttribute('aria-controls');
  //   const twin = magic?.split(' ');
  //   expect(hardChildren).toStrictEqual(twin);
  // });

  // Not using mixed yet
  // ONE CHILD CHECKED
  // test(`GIVEN checklist with all unchecked checkboxes
  //       WHEN the first child checkbox is clicked
  //       the chekbox with aria-controls should have aria-checked mixed`, async ({
  //   page,
  // }) => {
  //   const exampleName = 'test-list';
  //   const { getTriCheckbox, getCheckbox } = await setup(page, exampleName);
  //   await expect(getTriCheckbox()).toBeVisible();
  //   await getCheckbox().nth(1).click();
  //   await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'mixed');
  // });

  //Duplicates? Starts with Unchecked
  //12
  test(`GIVEN checklist with all unchecked checkboxes
        WHEN all checkboxes are checked using click
        THEN the checkbox with aria-controls should have aria-checked true`, async ({
    page,
  }) => {
    const exampleName = 'test-list';
    const { getTriCheckbox, getCheckbox } = await setup(page, exampleName);
    await expect(getTriCheckbox()).toBeVisible();
    await getCheckbox().nth(1).click();
    await getCheckbox().nth(2).click();
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'true');
  });

  //13
  test(`GIVEN checklist with all unchecked checkboxes
        WHEN the checklist's checkbox is checked by clicking
        THEN all checkboxes should have aria-checked true`, async ({ page }) => {
    const exampleName = 'test-list';
    const { getTriCheckbox, getCheckbox } = await setup(page, exampleName);
    await expect(getTriCheckbox()).toBeVisible();
    await getTriCheckbox().click();
    await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'true');
    await expect(getCheckbox().nth(1)).toHaveAttribute('aria-checked', 'true');
    await expect(getCheckbox().nth(2)).toHaveAttribute('aria-checked', 'true');
  });

  //14
  // TODO: reme two part of test by adding new test file
  test(`GIVEN checklist with all unchecked checkboxes
        WHEN the checklist's checkbox is checked twice using click
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

  // test(`GIVEN checklist with checkboxes
  //       WHEN the values of aria-controls are search
  //       IT should always return a valid, non-duplicate, checkboxes`, async ({ page }) => {
  //   const { getTriCheckbox } = await setup(page, 'test-list');
  //   await expect(getTriCheckbox()).toHaveAttribute('aria-controls');
  //   const magic = await getTriCheckbox().getAttribute('aria-controls');
  //   expect(magic).not.toBe(null);
  //   const idArr = magic!.split(' ');
  //   expect(isUniqArr(idArr)).toBe(true);
  //   for (let index = 0; index < idArr.length; index++) {
  //     const elementId = idArr[index];
  //     const PosCheckbox = page.locator(`#${elementId}`);
  //     await expect(PosCheckbox).toBeVisible();
  //     const role = await PosCheckbox.getAttribute('role');
  //     expect(role).toBe('checkbox');
  //   }
  // });

  // Not using mixed yet
  //   test(`GIVEN a controlled checklist with a checklist signal of true and default checkboxes as children
  //       WHEN all child checkbox are unchecked
  //       THEN the checklist signal should have aria-checked false`, async ({
  //     page,
  //   }) => {
  //     const exampleName = 'test-controlled-list-true';
  //     const { getTriCheckbox } = await setup(page, exampleName);
  //     await page.locator('#child-1').click();
  //     await page.locator('#child-2').click();
  //     await expect(getTriCheckbox()).toHaveAttribute('aria-checked', 'false');
  //   });
});
