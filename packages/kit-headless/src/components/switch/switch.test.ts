import { type Page, test, expect } from '@playwright/test';
import { createTestDriver } from './switch.driver';

declare global {
  interface Window {
    onChangeTriggered: boolean;
    onChangeHandler: () => void;
  }
}
async function setup(page: Page, exampleName: string) {
  await page.goto(`/headless/switch/${exampleName}`);

  const driver = createTestDriver(page.locator('[data-qui-switch]'));

  return {
    driver,
  };
}

test.describe('Mouse Behavior', () => {
  test(`GIVEN a hero switch
       WHEN checking data attributes and properties
       THEN data-checked and checked property should match`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    await expect(d.getInputElement()).toHaveAttribute('aria-label', 'switch');
    await expect(d.getInputElement()).toHaveAttribute('data-checked', 'false');
    await expect(d.getInputElement()).toHaveAttribute('data-disabled', 'false');
    await expect(d.getInputElement()).toHaveAttribute('aria-describedby', expect.stringMatching(/switch$/));
    await expect(d.getInputElement()).not.toBeDisabled();
    await expect(d.getInputElement()).toHaveAttribute('aria-checked', 'false');
    await expect(d.getInputElement()).not.toBeChecked();
    // type
    await expect(d.getInputElement()).toHaveAttribute('type', 'checkbox');
    // role
    await expect(d.getInputElement()).toHaveAttribute('role', 'switch');
  })
  test(`GIVEN a hero switch
        WHEN toggled
        THEN the checked property should correctly reflect the toggle state`, async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'hero');
    await expect(d.getInputElement()).not.toBeChecked();
    await expect(d.getInputElement()).toHaveAttribute('aria-describedby', expect.stringMatching(/switch$/));
    await expect(d.getInputElement()).toHaveAttribute('aria-label', 'switch');
    await expect(d.getInputElement()).toHaveAttribute('data-checked', 'false');
    await expect(d.getInputElement()).toHaveAttribute('data-disabled', 'false');
    await d.getInputElement().click();
    await expect(d.getInputElement()).toHaveAttribute('data-checked', 'true');
    await expect(d.getInputElement()).toHaveAttribute('data-disabled', 'false');
    await expect(d.getInputElement()).toBeChecked();
    // type
    await expect(d.getInputElement()).toHaveAttribute('type', 'checkbox');
    // role
    await expect(d.getInputElement()).toHaveAttribute('role', 'switch');
  });
});

test.describe('Keyboard Behavior', () => {
  test(`GIVEN a hero switch
        WHEN focusing the trigger and pressing the Enter key
        THEN the checked property should toggle`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    await d.getInputElement().focus();
    await expect(d.getInputElement()).not.toBeChecked();
    await expect(d.getInputElement()).toHaveAttribute('aria-describedby', expect.stringMatching(/switch$/));
    await expect(d.getInputElement()).toHaveAttribute('aria-label', 'switch');
    await expect(d.getInputElement()).toHaveAttribute('data-checked', 'false');
    await expect(d.getInputElement()).toHaveAttribute('data-disabled', 'false');
    await d.getInputElement().press('Enter');
    await expect(d.getInputElement()).toBeChecked();
    await expect(d.getInputElement()).toHaveAttribute('data-checked', 'true');
    await d.getInputElement().press('Enter');
    await expect(d.getInputElement()).not.toBeChecked();
  });

  test(`GIVEN a hero switch
    WHEN focusing the trigger and pressing the Space key
    THEN the checked property should toggle`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    await d.getInputElement().focus();
    await expect(d.getInputElement()).not.toBeChecked();
    await expect(d.getInputElement()).toHaveAttribute('aria-describedby', expect.stringMatching(/switch$/));
    await expect(d.getInputElement()).toHaveAttribute('aria-label', 'switch');
    await expect(d.getInputElement()).toHaveAttribute('data-checked', 'false');
    await expect(d.getInputElement()).toHaveAttribute('data-disabled', 'false');
    await d.getInputElement().press(' ');
    await expect(d.getInputElement()).toBeChecked();
    await expect(d.getInputElement()).toHaveAttribute('data-checked', 'true');
    await d.getInputElement().press(' ');
    await expect(d.getInputElement()).not.toBeChecked();
  });

  test.describe('Default property ', () => {
    test(`
    GIVEN a checked switch
    WHEN the switch is mounted
    THEN the switch should be checked
    `, async ({ page }) => {
      const { driver: d } = await setup(page, 'checked');
      await expect(d.getInputElement()).toBeChecked();
      await expect(d.getInputElement()).toHaveAttribute('aria-describedby', expect.stringMatching(/switch$/));
      await expect(d.getInputElement()).toHaveAttribute('aria-label', 'switch');
      await expect(d.getInputElement()).toHaveAttribute('data-checked', 'true');
      await expect(d.getInputElement()).toHaveAttribute('data-disabled', 'false');
    });

    test(`
    GIVEN a switch that is initially checked
    WHEN the switch is mounted
    THEN the switch should be checked
    `, async ({ page }) => {
      const { driver: d } = await setup(page, 'defaultChecked');
      await expect(d.getInputElement()).toBeChecked();
      await expect(d.getInputElement()).toHaveAttribute('aria-describedby', expect.stringMatching(/switch$/));
      await expect(d.getInputElement()).toHaveAttribute('aria-label', 'switch');
      await expect(d.getInputElement()).toHaveAttribute('data-checked', 'true');
      await d.getInputElement().click();
      await expect(d.getInputElement()).toHaveAttribute('data-checked', 'false');
      await expect(d.getInputElement()).toHaveAttribute('data-disabled', 'false');
      await expect(d.getInputElement()).not.toBeChecked()

    });

    test(`
    GIVEN a disabled switch
    WHEN the switch is mounted
    THEN the switch should be disabled
    `, async ({ page }) => {
      const { driver: d } = await setup(page, 'disabled');
      await expect(d.getInputElement()).toHaveAttribute('data-disabled', 'true');
      await expect(d.getInputElement()).toHaveAttribute('aria-describedby', expect.stringMatching(/switch$/));
      await expect(d.getInputElement()).toHaveAttribute('aria-label', 'switch');
      await expect(d.getInputElement()).toBeDisabled();
    });

    test(`
    GIVEN a disabled switch
    WHEN clicking the switch
    THEN the switch should not toggle`, async ({ page }) => {
      const { driver: d } = await setup(page, 'disabled');
      await expect(d.getInputElement()).toHaveAttribute('aria-describedby', expect.stringMatching(/switch$/));
      await expect(d.getInputElement()).toHaveAttribute('data-disabled', 'true');
      await d.getInputElement().click();
      await expect(d.getInputElement()).not.toBeChecked();
    });

    test(`
    GIVEN a switch without a label
    WHEN the switch is mounted
    THEN it should have a default label`, async ({ page }) => {
      const { driver: d } = await setup(page, 'pure');
      await expect(d.getTriggerLabel()).not.toBeNull();
      await expect(d.getInputElement()).toHaveAttribute('data-disabled', 'false');
      await expect(d.getInputElement()).toHaveAttribute('aria-describedby', expect.stringMatching(/switch$/));
      await expect(d.getInputElement()).toHaveAttribute('data-test', '11');
    });

  });
});
