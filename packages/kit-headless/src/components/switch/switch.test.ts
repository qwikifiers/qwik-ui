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
        WHEN toggled
        THEN the checked property should correctly reflect the toggle state`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    await expect(d.getTrigger()).not.toBeChecked();
    await expect(d.getTrigger()).toHaveAttribute('data-checked', 'flase');
    await d.getTrigger().click();
    await expect(d.getTrigger()).toHaveAttribute('data-checked', 'true');
    await expect(d.getTrigger()).toBeChecked()
  })

  test(`GIVEN a hero switch
    WHEN clicked
    THEN the onChange callback should be triggered`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    await expect(d.getTriggerlaBle()).toHaveText('0')
    await d.getTrigger().click();
    await expect(d.getTriggerlaBle()).toHaveText('1')
  })

})

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
})

test.describe('Default property ', () => {
  test(`
    GIVEN a checked switch
    WHEN the switch is mounted
    THEN the switch should be checked
    `, async ({ page }) => {
    const { driver: d } = await setup(page, 'checked');
    await expect(d.getTrigger()).toBeChecked();
    await expect(d.getTrigger()).toHaveAttribute('data-checked', 'true');
  })

  test(`
    GIVEN a defaultChecked switch
    WHEN the switch is mounted
    THEN the switch should be checked
    `, async ({ page }) => {
    const { driver: d } = await setup(page, 'defaultChecked');
    await expect(d.getTrigger()).toBeChecked();
  })

  test(`
    GIVEN a disabled switch
    
    `, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');
    await expect(d.getTrigger()).toHaveAttribute('data-disabled', 'true');

  })
})
