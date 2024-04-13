import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './modal.driver';

async function setup(page: Page, exampleName: string) {
  await page.goto(`/headless/modal/${exampleName}`);

  const driver = createTestDriver(page);

  return {
    driver,
  };
}

test('@Visual diff', async ({ page }) => {
  const { driver: d } = await setup(page, 'hero');
  await expect(page).toHaveScreenshot('closed modal.png');

  await d.getTrigger().click();

  await expect(page).toHaveScreenshot('opened modal.png');
});

// test.describe('a11y', () => {
//   test('Axe Validation Test', async ({ page }) => {
//     const { driver: d } = await setup(page, 'hero');

//     const initialResults = await new AxeBuilder({ page })
//       .include('[role="dialog"]')
//       .analyze();

//     expect(initialResults.violations).toEqual([]);

//     await d.openModal();

//     const afterClickResults = await new AxeBuilder({ page })
//       .include('[role="dialog"]')
//       .analyze();

//     expect(afterClickResults.violations).toEqual([]);
//   });
// });
