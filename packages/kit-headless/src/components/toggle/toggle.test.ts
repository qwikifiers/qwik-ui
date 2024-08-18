import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './toggle.driver';

async function setup(page: Page, exampleName: string) {
  await page.goto(`/headless/toggle/${exampleName}`);

  const driver = createTestDriver(page);

  return {
    driver,
  };
}

test.describe('Mouse Behavior', () => {
  test(`GIVEN a toggle 
    WHEN the toggle is clicked
    THEN aria-pressed should be true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    //Given
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'false');

    //when
    await d.getToggleButton().click();

    //Then
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'true');
  });

  //Uncontrolled / Initial
  test(`GIVEN a pressed toggle (with 'defaultPressed')
    WHEN the toggle is clicked
    THEN aria-pressed should be false`, async ({ page }) => {
    const { driver: d } = await setup(page, 'defaultPressed');

    //Given
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'true');

    //When
    await d.getToggleButton().click();

    //Then
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'false');
  });

  //Controlled / Reactive
  //pressed
  test(`GIVEN a pressed toggle (with 'pressed')
        WHEN the toggle is clicked
        THEN aria-pressed should be false`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pressed');

    //Given
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'true');

    //When
    await d.getToggleButton().click();

    //Then
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'false');
  });

  //disabled
  test(`GIVEN a disabled toggle
        WHEN the toggle is clicked
        AND data-disabled should remain`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    await expect(d.getToggleButton()).toBeDisabled();
    await expect(d.getToggleButton()).toHaveAttribute('data-disabled');
  });

  test(`GIVEN a disabled and pressed toggle
        WHEN the toggle is clicked
        THEN aria-pressed should be true
        AND data-disabled should remain`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-pressed-disabled');

    await expect(d.getToggleButton()).toBeDisabled();
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'true');
    await expect(d.getToggleButton()).toHaveAttribute('data-disabled');
  });

  test(`GIVEN a pressed and disabled toggle
        WHEN the toggle is clicked
        THEN aria-pressed should remain false
        AND data-disabled should remain`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-pressed-disabled');

    await expect(d.getToggleButton()).toBeDisabled();
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'true');
    await expect(d.getToggleButton()).toHaveAttribute('data-disabled');
  });
});

test.describe('Keyboard Behavior a11y', () => {
  test(`GIVEN a toggle 
    WHEN the toggle is 'Enter' pressed
    THEN aria-pressed should be true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    //Given
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'false');

    //when
    await d.pressButtonWithEnter();

    //Then
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'true');
  });

  test(`GIVEN a toggle 
    WHEN the toggle is 'Space' pressed
    THEN aria-pressed should be true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    //Given
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'false');

    //when
    await d.pressButtonWithSpace();

    //Then
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'true');
  });

  //Uncontrolled / Initial
  test(`GIVEN a pressed toggle (with 'defaultPressed')
    WHEN the toggle is 'Enter' pressed
    THEN aria-pressed should be false`, async ({ page }) => {
    const { driver: d } = await setup(page, 'defaultPressed');

    //Given
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'true');

    //When
    await d.pressButtonWithEnter();

    //Then
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'false');
  });
  test(`GIVEN a pressed toggle (with 'defaultPressed')
    WHEN the toggle is 'Space' pressed
    THEN aria-pressed should be false`, async ({ page }) => {
    const { driver: d } = await setup(page, 'defaultPressed');

    //Given
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'true');

    //When
    await d.pressButtonWithEnter();

    //Then
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'false');
  });

  //Controlled / Reactive
  //pressed
  test(`GIVEN a pressed toggle (with 'pressed')
        WHEN the toggle is 'Enter' pressed
        THEN aria-pressed should be false`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pressed');

    //Given
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'true');

    //When
    await d.getToggleButton().click();

    //Then
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'false');
  });

  test(`GIVEN a pressed toggle (with 'pressed')
    WHEN the toggle is 'Space' pressed
    THEN aria-pressed should be false`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pressed');

    //Given
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'true');

    //When
    await d.getToggleButton().click();

    //Then
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'false');
  });

  //disabled
  test(`GIVEN a disabled toggle
    WHEN the toggle is 'Enter' pressed
    THEN aria-disabled should remain true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    //Then
    await expect(d.getToggleButton()).toBeDisabled();
    await expect(d.getToggleButton()).toHaveAttribute('aria-disabled', 'true');
  });

  test(`GIVEN a disabled toggle
        WHEN the toggle is 'Space' pressed
        THEN aria-disabled should remain true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    //Then
    await expect(d.getToggleButton()).toBeDisabled();
    await expect(d.getToggleButton()).toHaveAttribute('aria-disabled', 'true');
  });

  test(`GIVEN a disabled and pressed toggle
    WHEN the toggle is 'Enter' pressed
    THEN aria-pressed should remain false
    AND data-disabled should remain`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-disabled-pressed');

    await expect(d.getToggleButton()).toBeDisabled();
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'true');
    await expect(d.getToggleButton()).toHaveAttribute('aria-disabled', 'true');
  });

  test(`GIVEN a disabled and pressed toggle
        WHEN the toggle is 'Space' pressed
        THEN aria-pressed should remain false
        AND data-disabled should remain`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-disabled-pressed');

    await expect(d.getToggleButton()).toBeDisabled();
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'true');
    await expect(d.getToggleButton()).toHaveAttribute('aria-disabled', 'true');
  });

  test(`GIVEN a pressed and disabled toggle
        WHEN the toggle is 'Enter' pressed
        THEN aria-pressed should remain false
        AND data-disabled should remain`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-pressed-disabled');

    await expect(d.getToggleButton()).toBeDisabled();
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'true');
    await expect(d.getToggleButton()).toHaveAttribute('aria-disabled', 'true');
  });
  test(`GIVEN a pressed and disabled toggle
        WHEN the toggle is 'Space' pressed
        THEN aria-pressed should remain false
        AND data-disabled should remain`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-pressed-disabled');

    await expect(d.getToggleButton()).toBeDisabled();
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'true');
    await expect(d.getToggleButton()).toHaveAttribute('aria-disabled', 'true');
  });
});
