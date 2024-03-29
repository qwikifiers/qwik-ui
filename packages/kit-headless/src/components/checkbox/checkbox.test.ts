import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './checkbox.driver';

async function setup(page: Page, exampleName: string) {
  await page.goto(`/headless/checkbox/${exampleName}`);

  const driver = createTestDriver(page);

  const { getNthCheckbox, getIcon, getCheckList, getULCheckList } = driver;

  return {
    driver,
    getNthCheckbox,
    getIcon,
    getCheckList,
    getULCheckList,
  };
}

test.describe('single checkbox behavior', () => {
  test(`GIVEN a checkbox with a user sig value of true
        WHEN the checkbox renders
        IT should have aria-checked as true`, async ({ page }) => {
    const exampleName = 'hero';
    const { getNthCheckbox } = await setup(page, exampleName);
    await expect(getNthCheckbox()).toBeVisible();
    await expect(getNthCheckbox()).toHaveAttribute('aria-checked', 'true');
  }),
    test(`GIVEN a checkbox with a user sig value of true
        WHEN the checkbox is focused and the spacebar is pressed
        IT should have aria-checked as false`, async ({ page }) => {
      const exampleName = 'hero';
      const { getNthCheckbox } = await setup(page, exampleName);
      await expect(getNthCheckbox()).toBeVisible();
      await getNthCheckbox().focus();
      await getNthCheckbox().press(' ');
      await expect(getNthCheckbox()).toHaveAttribute('aria-checked', 'false');
    });

  test(`GIVEN a checkbox with a user sig value of true
        WHEN the checkbox is focused and the spacebar is pressed
        IT should have its icon hidden`, async ({ page }) => {
    const exampleName = 'hero';
    const { getNthCheckbox, getIcon } = await setup(page, exampleName);
    await expect(getIcon()).toBeVisible();
    await getNthCheckbox().focus();
    await getNthCheckbox().press(' ');
    await expect(getNthCheckbox()).toHaveAttribute('aria-checked', 'false');
    await expect(getIcon()).toBeHidden();
  });
  test(`GIVEN a default checkbox with a default sig value of false
        WHEN the checkbox is focused and the spacebar is pressed
        IT should have its icon visible`, async ({ page }) => {
    const exampleName = 'default';
    const { getNthCheckbox, getIcon } = await setup(page, exampleName);
    await expect(getIcon()).toBeHidden();
    await getNthCheckbox().focus();
    await getNthCheckbox().press(' ');
    await expect(getNthCheckbox()).toHaveAttribute('aria-checked', 'false');
    await expect(getIcon()).toBeVisible();
  });
});
test.describe.only('checklist behavior', () => {
  test(`GIVEN a checklist with checkboxes
        WHEN the elements render
        THEN the checklist should be a <ul> with  <li>s of checkboxes, all wrapped around a div with a role and aria-labeledby attributes`, async ({
    page,
  }) => {
    const exampleName = 'list';
    const { getCheckList, getNthCheckbox, getULCheckList } = await setup(
      page,
      exampleName,
    );
    await expect(getCheckList()).toBeVisible();
    await expect(getULCheckList()).toBeVisible();
  });
  // test(`GIVEN a checklist with a fist checkbox's value as false
  //       WHEN the first checkbox is focused and the spacebar is pressed
  //       IT should have its icon visible`, async ({ page }) => {
  //   const exampleName = 'default';
  //   const { getNthCheckbox, getIcon } = await setup(page, exampleName);
  //   await expect(getIcon()).toBeHidden();
  //   await getNthCheckbox().focus();
  //   await getNthCheckbox().press(' ');
  //   await expect(getNthCheckbox()).toHaveAttribute('aria-checked', 'false');
  //   await expect(getIcon()).toBeVisible();
  // });
});
