import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './label.driver';

async function setup(page: Page, exampleName: string) {
  await page.goto(`/headless/label/${exampleName}`);
  const driver = createTestDriver(page);

  return { driver };
}

test.describe('Label usage', () => {
  test(`GIVEN a label
        WHEN a label is rendered
        THEN it should be visible
  `, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await expect(d.getLabel()).toBeVisible();
  });

  test(`GIVEN a label and an input
        WHEN the label is clicked
        THEN the input should be focused
  `, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.getLabel().click();
    await expect(d.getInput()).toBeFocused();
  });

  test(`GIVEN a label
        WHEN the label is double clicked
        THEN the label text should not be selected
    `, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.getLabel().dblclick();
    const selection = await page.evaluate(() => window.getSelection()?.toString());
    expect(selection).toBeFalsy();
  });
});
