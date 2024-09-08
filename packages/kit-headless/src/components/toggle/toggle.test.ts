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
  test(`GIVEN a pressed toggle (with initial 'pressed')
    WHEN the toggle is clicked
    THEN aria-pressed should be false`, async ({ page }) => {
    const { driver: d } = await setup(page, 'initialPressed');

    //Given
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'true');

    //When
    await d.getToggleButton().click();

    //Then
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'false');
  });

  //pressed with onPressedChange to have some control
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

  //Controlled / Reactive
  //bind:pressed: 1 way binding (reading)
  test(`GIVEN a pressed toggle (with 'bind-pressed')
    WHEN the toggle is clicked
    THEN aria-pressed should be false
    AND the span element that store the value of the bounded Signal 
    should be updated
    `, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-bind-pressed');

    //Given
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'true');

    //When
    await d.getToggleButton().click();

    //Then
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'false');
    const spanElement = await d.getRoot().locator('[test-data-bounded-span]');
    await expect(spanElement).toContainText('You unpressed me');
  });

  //bind:pressed: 2 way binding (writing)
  test(`GIVEN a pressed toggle (with 'bind-pressed')
    WHEN the toggle is clicked
    AND the external button is clicked
    THEN aria-pressed should be true
    AND the span element that store the value of the bounded Signal 
    should be updated
    `, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-bind-pressed');

    //Given
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'true');

    //When
    await d.getToggleButton().click();
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'false');

    const button = await d.getRoot().locator('[test-data-bounded-button]');
    await button.click();

    //Then
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'true');
    const spanElement = await d.getRoot().locator('[test-data-bounded-span]');
    await expect(spanElement).toContainText('You pressed me');
  });

  //disabled
  test(`GIVEN a disabled toggle
        WHEN the toggle is clicked
        THEN data-disabled should remain`, async ({ page }) => {
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
  test(`GIVEN a pressed toggle (with initial 'pressed')
    WHEN the toggle is 'Enter' pressed
    THEN aria-pressed should be false`, async ({ page }) => {
    const { driver: d } = await setup(page, 'initialPressed');

    //Given
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'true');

    //When
    await d.pressButtonWithEnter();

    //Then
    await expect(d.getToggleButton()).toHaveAttribute('aria-pressed', 'false');
  });
  test(`GIVEN a pressed toggle (with initial 'pressed')
    WHEN the toggle is 'Space' pressed
    THEN aria-pressed should be false`, async ({ page }) => {
    const { driver: d } = await setup(page, 'initialPressed');

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
