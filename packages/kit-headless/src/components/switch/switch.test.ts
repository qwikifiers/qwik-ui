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
       THEN data-checked and checked property should match`, async ({page}) => {
        const { driver: d } = await setup(page, 'hero');
        await expect(d.getTrigger()).toHaveAttribute('aria-label', 'switch');
        await expect(d.getTrigger()).toHaveAttribute('data-checked', 'false');
        await expect(d.getTrigger()).toHaveAttribute('data-disabled', 'false');
        await expect(d.getTrigger()).toHaveAttribute('aria-describedby', expect.stringMatching(/switch$/));
        await expect(d.getTrigger()).not.toBeDisabled();
        await expect(d.getTrigger()).toHaveAttribute('aria-checked', 'false');
        await expect(d.getTrigger()).not.toBeChecked();
        // type
        await expect(d.getTrigger()).toHaveAttribute('type', 'checkbox');
        // role
        await expect(d.getTrigger()).toHaveAttribute('role', 'switch');
  })
  test(`GIVEN a hero switch
        WHEN toggled
        THEN the checked property should correctly reflect the toggle state`, async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'hero');
    await expect(d.getTrigger()).not.toBeChecked();
    await expect(d.getTrigger()).toHaveAttribute('data-checked', 'false');
    await d.getTrigger().click({ force: true });
    await expect(d.getTrigger()).toHaveAttribute('data-checked', 'true');
    await expect(d.getTrigger()).toBeChecked();
  });

  test(`GIVEN a hero switch
    WHEN clicked
    THEN the onChange callback should be triggered`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    await expect(d.getTriggerlaBle()).toHaveText('test0');
    await d.getTrigger().click({force: true});
    await expect(d.getTriggerlaBle()).toHaveText('test1');
    await expect(d.getTrigger()).toBeChecked();
  });
});

test.describe('Keyboard Behavior', () => {
  test(`GIVEN a hero switch
        WHEN focusing the trigger and pressing the Enter key
        THEN the checked property should toggle`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    await d.getTrigger().focus();
    await expect(d.getTrigger()).not.toBeChecked();
    await d.getTrigger().press('Enter');
    await expect(d.getTrigger()).toBeChecked();
    await d.getTrigger().press('Enter');
    await expect(d.getTrigger()).not.toBeChecked();
  });

  test(`GIVEN a hero switch
    WHEN focusing the trigger and pressing the Space key
    THEN the checked property should toggle`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    await d.getTrigger().focus();
    await expect(d.getTrigger()).not.toBeChecked();
    await d.getTrigger().press(' ');
    await expect(d.getTrigger()).toBeChecked();
    await d.getTrigger().press(' ');
    await expect(d.getTrigger()).not.toBeChecked();
  });

  test(`
    GIVEN a hero switch
    WHEN focusing the trigger and pressing the Tab key
    THEN the checked property should not toggle`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    await d.getTrigger().focus();
    await expect(d.getTrigger()).not.toBeChecked();
    await d.getTrigger().press('Tab');
    await expect(d.getTrigger()).not.toBeChecked();
  });
});

test.describe('Default property ', () => {
  test(`
    GIVEN a checked switch
    WHEN the switch is mounted
    THEN the switch should be checked
    `, async ({ page }) => {
    const { driver: d } = await setup(page, 'checked');
    await expect(d.getTrigger()).toBeChecked();
    await expect(d.getTrigger()).toHaveAttribute('data-checked', 'true');
    await expect(d.getTrigger()).toHaveAttribute('aria-checked', 'true');
  });

  test(`
    GIVEN a defaultChecked switch
    WHEN the switch is mounted
    THEN the switch should be checked
    `, async ({ page }) => {
    const { driver: d } = await setup(page, 'defaultChecked');
    await expect(d.getTrigger()).toBeChecked();
    await d.getTrigger().click({ force: true });
    await expect(d.getTrigger()).not.toBeChecked()

  });

  test(`
    GIVEN a disabled switch
    WHEN the switch is mounted
    THEN the switch should be disabled
    `, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');
    await expect(d.getTrigger()).toHaveAttribute('data-disabled', 'true');
    await expect(d.getTrigger()).toBeDisabled();
  });

  test(`
    GIVEN a disabled switch
    WHEN clicking the switch
    THEN the switch should not toggle`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');
    await expect(d.getTrigger()).toHaveAttribute('data-disabled', 'true');
    await d.getTrigger().click({force: true});
    await expect(d.getTrigger()).not.toBeChecked();
  });

  test(`
    GIVEN a switch without a label
    WHEN the switch is mounted
    THEN it should have a default label`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pure');
    await expect(d.getTriggerlaBle()).not.toBeNull();
  });

  test(`
    GIVEN a switch with custom attributes
    WHEN the switch is mounted
    THEN it should have the custom attributes`, async ({ page }) => {
      const { driver: d } = await setup(page, 'pure');
      await expect(d.getTrigger()).toHaveAttribute('data-test', '11');
  });
});
