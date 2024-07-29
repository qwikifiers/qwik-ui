// otp.tests.ts
import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './otp.driver';

async function setup(page: Page, exampleName: string) {
  await page.goto(`headless/otp/${exampleName}`);

  const driver = createTestDriver(page);

  return {
    driver,
  };
}
test.describe('OTP Component Tests', () => {
  test(`GIVEN an OTP item 
        WHEN entering values
        THEN the content should be entered into a single input`, async ({ page }) => {
    const { driver } = await setup(page, 'hero');

    const input = driver.getInput();

    const fullOTP = '123456';
    await input.fill(fullOTP);

    await expect(input).toHaveValue(fullOTP);
  });
  test(`GIVEN values are entered into the hidden input
        THEN each visible input should display the correct value`, async ({ page }) => {
    const { driver } = await setup(page, 'hero');
    const input = driver.getInput();

    const fullOTP = '123456';
    await input.fill(fullOTP);

    for (let i = 0; i < fullOTP.length; i++) {
      const visibleInput = driver.getVisibleInput(i);
      await expect(visibleInput).toHaveValue(fullOTP[i]);
    }
  });
});
