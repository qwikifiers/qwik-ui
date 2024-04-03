import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './label.driver';

async function setup(page: Page, exampleName: string) {
  await page.goto(`/headless/label/${exampleName}`);
  const driver = createTestDriver(page.getByTestId('root'));
  const { getLabel, getForElement } = driver;

  return { driver, getLabel, getForElement };
}

test.describe('Label usaged', () => {
  test('should have a label', async ({ page }) => {
    const { getLabel } = await setup(page, 'hero');
    await expect(getLabel()).toBeVisible();
  });

  test('should focus on for', async ({ page }) => {
    const { getLabel, getForElement } = await setup(page, 'hero');
    const label = getLabel();
    const forElement = getForElement();

    await label.click();
    await expect(forElement).toBeFocused();
  });

  test('should not select the text on label', async ({ page }) => {
    const { getLabel } = await setup(page, 'hero');
    const label = getLabel();

    await label.dblclick();
    const selection = await page.evaluate(() => window.getSelection()?.toString());
    expect(selection).toBeFalsy();
  });
});
