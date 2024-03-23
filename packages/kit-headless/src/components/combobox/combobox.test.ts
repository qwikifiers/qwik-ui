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

/** TODO: add docs telling people how to add an aria-label to the root component. (accessible name) */
test.describe('A11y', () => {
  test('Axe Validation Test', async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    const initialResults = await new AxeBuilder({ page })
      .include('[role="combobox"]')
      .analyze();

    expect(initialResults.violations).toEqual([]);

    await d.getTrigger().click();

    await expect(d.selectOption('Malcolm')).toBeVisible();

    const afterClickResults = await new AxeBuilder({ page })
      .include('[role="combobox"]')
      .analyze();

    expect(afterClickResults.violations).toEqual([]);
  });
});
