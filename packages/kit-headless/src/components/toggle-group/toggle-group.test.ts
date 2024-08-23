import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './toggle-group.driver';

async function setup(page: Page, exampleName: string) {
  await page.goto(`/headless/toggle-group/${exampleName}`);

  const driver = createTestDriver(page);
  return {
    driver,
  };
}

test.describe('Mouse Behavior', () => {
  //'single' (multiple = false)
  test(`GIVEN a toggle-group with items: left, center, right
        WHEN the 'center' item is clicked
        THEN the 'center' item should have aria-pressed on true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when
    await centerItem.click();

    //Then
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');
    await expect(centerItem).toHaveAttribute('tabIndex', '0');
    await expect(leftItem).toHaveAttribute('tabIndex', '-1');
    await expect(rightItem).toHaveAttribute('tabIndex', '-1');
  });

  test(`GIVEN a toggle-group
        WHEN the 'center' item is clicked
        AND the 'right' item is clicked
        THEN 'right' item should have aria-pressed on true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //When, Then
    await centerItem.click();
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');

    await rightItem.click();
    await expect(centerItem).toHaveAttribute('tabIndex', '-1');
    await expect(leftItem).toHaveAttribute('tabIndex', '-1');
    await expect(rightItem).toHaveAttribute('tabIndex', '0');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'true');
  });

  test(`GIVEN a toggle-group with 'center' clicked
        WHEN the 'right' item is clicked
        AND the 'center' item is clicked
        THEN 'center' item should have aria-pressed on true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    //Given
    await expect(d.getItems()).toHaveCount(3);

    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    await centerItem.click();
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');

    //When, Then
    await rightItem.click();
    await expect(rightItem).toHaveAttribute('aria-pressed', 'true');

    await centerItem.click();
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');
    await expect(centerItem).toHaveAttribute('tabIndex', '0');
    await expect(leftItem).toHaveAttribute('tabIndex', '-1');
    await expect(rightItem).toHaveAttribute('tabIndex', '-1');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');
  });

  //type is 'multiple'
  test(`GIVEN a toggle-group with items: left, center, right
    WHEN the 'center' item is clicked
    THEN the 'center' item should have aria-pressed on true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'multiple');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when
    await centerItem.click();

    //Then
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');
  });

  test(`GIVEN a toggle-group with 'center' clicked
    WHEN the 'right' item is clicked
    THEN both 'center' AND right' items should have aria-pressed on true`, async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'multiple');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    await centerItem.click();
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');

    //when
    await rightItem.click();

    //Then
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'true');
  });

  test(`GIVEN a toggle-group with 'center' clicked
    WHEN the 'right' item is clicked
    AND the 'center' item is clicked
    THEN 'right' item should have aria-pressed should be true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'multiple');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    await centerItem.click();
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');

    //when
    await rightItem.click();
    await centerItem.click();

    //Then
    await expect(rightItem).toHaveAttribute('aria-pressed', 'true');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
  });

  //Uncontrolled / Initial (default props)
  //single (multiple = false)
  test(`GIVEN a toggle-group with 'defaultValue' = 'left'
    WHEN the 'center' item is clicked
    THEN 'center' item should have aria-pressed on true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'defaultValue');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'true');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when
    await centerItem.click();

    //Then
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
  });

  //multiple
  test(`GIVEN a toggle-group with 'defaultValue' = ['left', 'center']
    WHEN the 'center' item is clicked
    THEN 'left' item should have aria-pressed on true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-defaultValue-multiple');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'true');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when
    await centerItem.click();

    //Then
    await expect(leftItem).toHaveAttribute('aria-pressed', 'true');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
  });

  //Controlled (value + onValueChange OR bind:value)
  //single
  test(`GIVEN a toggle-group with 'value' = 'left'
    WHEN the 'center' item is clicked
    THEN 'center' item should have aria-pressed on true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'value');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'true');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when
    await centerItem.click();

    //Then
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
  });

  test(`GIVEN a toggle-group with 'bind:value' = Signal<'left'>
    WHEN the 'center' item is clicked
    THEN 'center' item should have aria-pressed on true
    THEN the span element that store the value of the bounded Signal 
    should be updated`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-value-bind');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'true');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when
    await centerItem.click();

    //Then
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');
    const spanElement = await d.getRoot().locator('[test-data-bounded-span]');
    await expect(spanElement).toContainText('You selected: center');
  });

  //multiple
  test(`GIVEN a toggle-group with 'value' = ['left', 'center']
  WHEN the 'center' item is clicked
  THEN 'left' item should have aria-pressed on true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-value-multiple');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'true');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when
    await centerItem.click();

    //Then
    await expect(leftItem).toHaveAttribute('aria-pressed', 'true');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');

    await expect(leftItem).toHaveAttribute('tabIndex', '0');
    await expect(centerItem).toHaveAttribute('tabIndex', '-1');
    await expect(rightItem).toHaveAttribute('tabIndex', '-1');
  });

  test(`GIVEN a toggle-group with 'bind:value' = Signal<['left', 'center']>
    WHEN the 'center' item is clicked
    THEN 'center' item should have aria-pressed on true
    THEN the span element that store the value of the bounded Signal 
    should be updated`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-value-bind-multiple');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'true');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when
    await centerItem.click();

    //Then
    await expect(leftItem).toHaveAttribute('aria-pressed', 'true');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    const spanElement = await d.getRoot().locator('[test-data-bounded-span]');
    await expect(spanElement).toContainText('You selected: left');
  });

  //disabled
  test(`GIVEN a 'disabled' toggle-group
  WHEN the 'center' item is clicked (CAN'T BE CLICKED)
  THEN data-disabled should remain on each item`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);

    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(leftItem).toBeDisabled();
    await expect(leftItem).toHaveAttribute('data-disabled');
    await expect(leftItem).toHaveAttribute('tabIndex', '-1');

    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toBeDisabled();
    await expect(centerItem).toHaveAttribute('data-disabled');
    await expect(centerItem).toHaveAttribute('tabIndex', '-1');

    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toBeDisabled();
    await expect(rightItem).toHaveAttribute('data-disabled');
    await expect(rightItem).toHaveAttribute('tabIndex', '-1');
  });

  test(`GIVEN a 'disabled' AND 'multiple' toggle-group
  WHEN the 'center' item is clicked (CAN'T BE CLICKED)
  THEN data-disabled should remain on each item`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-disabled-multiple');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);

    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(leftItem).toBeDisabled();
    await expect(leftItem).toHaveAttribute('data-disabled');

    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toBeDisabled();
    await expect(centerItem).toHaveAttribute('data-disabled');

    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toBeDisabled();
    await expect(rightItem).toHaveAttribute('data-disabled');
  });

  test(`GIVEN a 'disabled' toggle-group with 'value' = 'left'
  WHEN the 'center' item is clicked (CAN'T BE CLICKED)
  THEN data-disabled should remain on each item`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-disabled-value');

    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);

    await expect(leftItem).toHaveAttribute('aria-pressed', 'true');
    await expect(leftItem).toBeDisabled();
    await expect(leftItem).toHaveAttribute('data-disabled');

    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toBeDisabled();
    await expect(centerItem).toHaveAttribute('data-disabled');

    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toBeDisabled();
    await expect(rightItem).toHaveAttribute('data-disabled');
  });

  test(`GIVEN a 'disabled' toggle-group with 'value' = ['left', 'center']
  WHEN the 'center' item is clicked
  THEN data-disabled should remain on each item`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-disabled-value-multiple');

    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);

    await expect(leftItem).toHaveAttribute('aria-pressed', 'true');
    await expect(leftItem).toBeDisabled();
    await expect(leftItem).toHaveAttribute('data-disabled');

    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');
    await expect(centerItem).toBeDisabled();
    await expect(centerItem).toHaveAttribute('data-disabled');

    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toBeDisabled();
    await expect(rightItem).toHaveAttribute('data-disabled');
  });

  test(`GIVEN a toggle-group with a disabled 'left' item
  WHEN the 'center' item is clicked
  AND the 'right' item is clicked
  THEN data-disabled should remain on the 'left' item
  AND 'center' item should have aria-pressed on false
  AND 'right' item should have aria-pressed on true
  `, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-item-disabled');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toBeDisabled();
    await expect(leftItem).toHaveAttribute('data-disabled');
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when, Then
    await centerItem.click();
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');

    await rightItem.click();
    await expect(rightItem).toHaveAttribute('aria-pressed', 'true');

    await expect(leftItem).toBeDisabled();
    await expect(leftItem).toHaveAttribute('data-disabled');
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
  });

  test(`GIVEN a toggle-group with a disabled 'left' item
  WHEN the 'center' item is clicked
  AND the 'right' item is clicked
  THEN data-disabled should remain on the 'left' item
  AND both 'center' AND 'right' items should have aria-pressed on false`, async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'test-item-disabled-multiple');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(leftItem).toBeDisabled();
    await expect(leftItem).toHaveAttribute('data-disabled');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when, then
    await centerItem.click();
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');

    await rightItem.click();
    await expect(rightItem).toHaveAttribute('aria-pressed', 'true');

    await expect(leftItem).toBeDisabled();
    await expect(leftItem).toHaveAttribute('data-disabled');
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
  });
});

test.describe('Keyboard Navigation (Moving and Pressing)', () => {
  //'single' (multiple = false)
  test(`GIVEN a toggle-group with items: left, center, right
        WHEN the 'center' item is 'Enter' pressed
        THEN the 'center' item should have aria-pressed on true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when
    await leftItem.focus();
    await leftItem.press('ArrowRight');
    await expect(centerItem).toBeFocused();
    await centerItem.press('Enter');

    //Then
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');
  });

  test(`GIVEN a toggle-group
        WHEN the 'center' item is 'Enter' pressed
        AND the 'right' item is 'Enter' pressed
        THEN 'right' item should have aria-pressed on true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //When, Then
    await leftItem.focus();
    await leftItem.press('ArrowRight');
    await expect(centerItem).toBeFocused();
    await centerItem.press('Enter');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');

    await centerItem.press('ArrowRight');
    await expect(rightItem).toBeFocused();
    await rightItem.press('Enter');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'true');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
  });

  test(`GIVEN a toggle-group with 'center' is 'Enter' pressed
        WHEN the 'right' item is 'Enter' pressed
        AND the 'center' item is 'Enter' pressed
        THEN 'center' item should have aria-pressed on true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    await leftItem.focus();
    await leftItem.press('ArrowRight');
    await expect(centerItem).toBeFocused();
    await centerItem.press('Enter');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');

    //When, Then
    await centerItem.press('ArrowRight');
    await expect(rightItem).toBeFocused();
    await rightItem.press('Enter');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'true');

    await rightItem.press('ArrowLeft');
    await expect(centerItem).toBeFocused();
    await centerItem.press('Enter');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');
  });

  //type is 'multiple'
  test(`GIVEN a toggle-group with items: left, center, right
    WHEN the 'center' item is 'Enter' pressed
    THEN the 'center' item should have aria-pressed on true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'multiple');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when
    await leftItem.focus();
    await leftItem.press('ArrowRight');
    await expect(centerItem).toBeFocused();
    await centerItem.press('Enter');

    //Then
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');
  });

  test(`GIVEN a toggle-group with 'center' is 'Enter' pressed
    WHEN the 'right' item is 'Enter' pressed
    THEN both 'center' AND right' items should have aria-pressed on true`, async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'multiple');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    await leftItem.focus();
    await leftItem.press('ArrowRight');
    await expect(centerItem).toBeFocused();
    await centerItem.press('Enter');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');

    //when
    await centerItem.press('ArrowRight');
    await expect(rightItem).toBeFocused();
    await rightItem.press('Enter');

    //Then
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'true');
  });

  test(`GIVEN a toggle-group with 'center' is 'Enter' pressed
    WHEN the 'right' is 'Enter' pressed
    AND the 'center' is 'Enter' pressed
    THEN 'right' item should have aria-pressed should be true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'multiple');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    await centerItem.focus();
    await centerItem.press('Enter');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');

    //when
    await centerItem.press('ArrowRight');
    await expect(rightItem).toBeFocused();
    await rightItem.press('Enter');
    await rightItem.press('ArrowLeft');
    await expect(centerItem).toBeFocused();
    await centerItem.press('Enter');

    //Then
    await expect(rightItem).toHaveAttribute('aria-pressed', 'true');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
  });

  //Uncontrolled / Initial (default props)
  //single (multiple = false)
  test(`GIVEN a toggle-group with 'defaultValue' = 'left'
    WHEN the 'center' item is 'Enter' pressed
    THEN 'center' item should have aria-pressed on true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'defaultValue');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'true');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when
    await leftItem.focus();
    await leftItem.press('ArrowRight');
    await expect(centerItem).toBeFocused();
    await centerItem.press('Enter');

    //Then
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
  });

  //multiple
  test(`GIVEN a toggle-group with 'defaultValue' = ['left', 'center']
    WHEN the 'center' item is 'Enter' pressed
    THEN 'left' item should have aria-pressed on true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-defaultValue-multiple');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'true');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when
    await leftItem.focus();
    await leftItem.press('ArrowRight');
    await expect(centerItem).toBeFocused();
    await centerItem.press('Enter');

    //Then
    await expect(leftItem).toHaveAttribute('aria-pressed', 'true');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
  });

  //Controlled (value)
  //single
  test(`GIVEN a toggle-group with 'value' = 'left'
    WHEN the 'center' item is 'Enter' pressed
    THEN 'center' item should have aria-pressed on true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'value');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'true');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when
    await leftItem.focus();
    await leftItem.press('ArrowRight');
    await expect(centerItem).toBeFocused();
    await centerItem.press('Enter');

    //Then
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
  });

  //multiple
  test(`GIVEN a toggle-group with 'value' = ['left', 'center']
  WHEN the 'center' item is 'Enter' pressed
  THEN 'left' item should have aria-pressed on true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-value-multiple');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'true');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when
    await leftItem.focus();
    await leftItem.press('ArrowRight');
    await expect(centerItem).toBeFocused();
    await centerItem.press('Enter');

    //Then
    await expect(leftItem).toHaveAttribute('aria-pressed', 'true');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
  });

  //disabled
  test(`GIVEN a 'disabled' toggle-group
  WHEN the 'center' item is is 'Enter' pressed (CAN'T BE PRESSED)
  THEN aria-disabled should be true on each item`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);

    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(leftItem).toBeDisabled();
    await expect(leftItem).toHaveAttribute('aria-disabled', 'true');

    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toBeDisabled();
    await expect(centerItem).toHaveAttribute('aria-disabled', 'true');

    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toBeDisabled();
    await expect(rightItem).toHaveAttribute('aria-disabled', 'true');
  });

  test(`GIVEN a 'disabled' toggle-group
  WHEN the 'center' item is 'Enter' pressed (CAN'T BE PRESSED)
  THEN aria-disabled should be true on each item`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-disabled-multiple');

    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);

    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(leftItem).toBeDisabled();
    await expect(leftItem).toHaveAttribute('aria-disabled', 'true');

    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toBeDisabled();
    await expect(centerItem).toHaveAttribute('aria-disabled', 'true');

    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toBeDisabled();
    await expect(rightItem).toHaveAttribute('aria-disabled', 'true');
  });

  test(`GIVEN a 'disabled' toggle-group with 'value' = 'left'
  WHEN the 'center' item is 'Enter' pressed (CAN'T BE PRESSED)
  THEN aria-disabled should be true on each item`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-disabled-value');

    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);

    await expect(leftItem).toHaveAttribute('aria-pressed', 'true');
    await expect(leftItem).toBeDisabled();
    await expect(leftItem).toHaveAttribute('aria-disabled', 'true');

    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toBeDisabled();
    await expect(centerItem).toHaveAttribute('aria-disabled', 'true');

    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toBeDisabled();
    await expect(rightItem).toHaveAttribute('aria-disabled', 'true');
  });

  test(`GIVEN a 'disabled' toggle-group with 'value' = ['left', 'center']
  WHEN the 'center' item is 'Enter' pressed
  THEN aria-disabled should be true on each item`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-disabled-value-multiple');

    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);

    await expect(leftItem).toHaveAttribute('aria-pressed', 'true');
    await expect(leftItem).toBeDisabled();
    await expect(leftItem).toHaveAttribute('aria-disabled', 'true');

    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');
    await expect(centerItem).toBeDisabled();
    await expect(centerItem).toHaveAttribute('aria-disabled', 'true');

    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toBeDisabled();
    await expect(rightItem).toHaveAttribute('aria-disabled', 'true');
  });

  test(`GIVEN a toggle-group with a disabled 'left' item
  WHEN the 'center' item is 'Enter' pressed
  AND the 'right' item is 'Enter' pressed
  THEN aria-disabled should be true on the 'left' item
  AND 'center' item should have aria-pressed on false
  AND 'right' item should have aria-pressed on true
  `, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-item-disabled');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);

    await expect(leftItem).toBeDisabled();
    await expect(leftItem).toHaveAttribute('aria-disabled', 'true');
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when
    await centerItem.focus();
    await centerItem.press('Enter');

    await centerItem.press('ArrowRight');
    await expect(rightItem).toBeFocused();
    await rightItem.press('Enter');

    //Then
    await expect(leftItem).toBeDisabled();
    await expect(leftItem).toHaveAttribute('aria-disabled', 'true');
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'true');
  });

  test(`GIVEN a toggle-group with a disabled 'left' item
  WHEN the 'center' item is 'Enter' pressed
  AND the 'right' item is 'Enter' pressed
  THEN aria-disabled should be true on the 'left' item
  AND both 'center' AND 'right' items should have aria-pressed on false`, async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'test-item-disabled-multiple');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toBeDisabled();
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //When, Then
    await centerItem.focus();
    await centerItem.press('Enter');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'true');

    await centerItem.press('ArrowRight');
    await expect(rightItem).toBeFocused();
    await rightItem.press('Enter');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'true');

    await expect(leftItem).toBeDisabled();
    await expect(leftItem).toHaveAttribute('aria-disabled', 'true');
  });
});

test.describe('Keyboard Without Looping Behavior (Moving and Pressing)', () => {
  //'single' (multiple = false)
  test(`GIVEN a toggle-group with items: left, center, right
        WHEN the 'left' item is focused
        AND the 'ArrowLeft' key is pressed
        THEN the 'left' item should remain focused`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when, Then
    await leftItem.focus();
    await expect(leftItem).toBeFocused();

    await leftItem.press('ArrowLeft');
    await expect(leftItem).toBeFocused();
  });

  test(`GIVEN a toggle-group with items: left, center, right (NO LOOP)
    WHEN the 'left' item is focused
    AND the 'ArrowLeft' key is pressed
    AND the 'Enter' key is pressed
    THEN the 'left' item should have aria-pressed on true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when, Then
    await leftItem.focus();
    await expect(leftItem).toBeFocused();

    await leftItem.press('ArrowLeft');
    await expect(leftItem).toBeFocused();
    await leftItem.press('Enter');
    await expect(leftItem).toHaveAttribute('aria-pressed', 'true');
  });

  test(`GIVEN a toggle-group with items: left, center, right (NO LOOP)
    WHEN the 'right' item is focused
    AND the 'ArrowRight' key is pressed
    THEN the 'right' item should remain focused`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when, Then
    await rightItem.focus();
    await expect(rightItem).toBeFocused();

    await rightItem.press('ArrowRight');
    await expect(rightItem).toBeFocused();
  });

  test(`GIVEN a toggle-group with items: left, center, right (NO LOOP)
    WHEN the 'right' item is focused
    AND the 'ArrowRight' key is pressed
    AND the 'Enter' key is pressed
    THEN the 'right' item should have aria-pressed on true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when, Then
    await rightItem.focus();
    await expect(rightItem).toBeFocused();

    await rightItem.press('ArrowRight');
    await expect(rightItem).toBeFocused();

    await rightItem.press('Enter');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'true');
  });

  //disabled (item)
  test(`GIVEN a toggle-group with a disabled 'left' item
  WHEN the 'center' item is focused
  AND the 'ArrowLeft' key is pressed
  THEN the 'center' item should remain focused`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-item-disabled');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);

    await expect(leftItem).toBeDisabled();
    await expect(leftItem).toHaveAttribute('aria-disabled', 'true');
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when
    await centerItem.focus();
    await expect(centerItem).toBeFocused();
    await centerItem.press('ArrowLeft');
    await expect(centerItem).toBeFocused();
  });

  //vertical
  test(`GIVEN a toggle-group with 'vertical' orientation
    WHEN the 'left' item is focused
    AND the 'ArrowUp' key is pressed
    THEN the 'left' item should remain focused`, async ({ page }) => {
    const { driver: d } = await setup(page, 'vertical');

    //Given
    const root = d.getToggleGroupRoot();
    await expect(root).toHaveAttribute('aria-orientation', 'vertical');
    await expect(root).toHaveAttribute('dir', 'ltr');
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when, Then
    await leftItem.focus();
    await expect(leftItem).toBeFocused();

    await leftItem.press('ArrowUp');
    await expect(leftItem).toBeFocused();
  });

  //vertical and direction rtl
  test(`GIVEN a toggle-group with 'vertical' orientation and 'rtl' direction
    WHEN the 'left' item is focused
    AND the 'ArrowUp' key is pressed
    THEN the 'center' item should be focused`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-vertical-multiple-rtl');

    //Given
    const root = d.getToggleGroupRoot();
    await expect(root).toHaveAttribute('aria-orientation', 'vertical');
    await expect(root).toHaveAttribute('dir', 'rtl');
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when, Then
    await leftItem.focus();
    await expect(leftItem).toBeFocused();

    await leftItem.press('ArrowUp');
    await expect(centerItem).toBeFocused();
  });

  //horizontal and direction rtl
  test(`GIVEN a toggle-group with 'horizontal' orientation and 'rtl' direction
    WHEN the 'left' item is focused
    AND the 'ArrowLeft' key is pressed
    THEN the 'center' item should be focused`, async ({ page }) => {
    const { driver: d } = await setup(page, 'horizontal-rtl');

    //Given
    const root = d.getToggleGroupRoot();
    await expect(root).toHaveAttribute('aria-orientation', 'horizontal');
    await expect(root).toHaveAttribute('dir', 'rtl');
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when, Then
    await leftItem.focus();
    await expect(leftItem).toBeFocused();

    await leftItem.press('ArrowLeft');
    await expect(centerItem).toBeFocused();
  });
});

test.describe('Keyboard With Looping Behavior (Moving and Pressing)', () => {
  //'single' (multiple = false)
  test(`GIVEN a toggle-group with items: left, center, right
        WHEN the 'left' item is focused
        AND the 'ArrowLeft' key is pressed
        THEN the 'right' item should be focused`, async ({ page }) => {
    const { driver: d } = await setup(page, 'loop');

    //Given
    const root = d.getToggleGroupRoot();
    await expect(root).toHaveAttribute('aria-orientation', 'horizontal');
    await expect(root).toHaveAttribute('dir', 'ltr');
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when, Then
    await leftItem.focus();
    await expect(leftItem).toBeFocused();

    await leftItem.press('ArrowLeft');
    await expect(rightItem).toBeFocused();
  });

  test(`GIVEN a toggle-group with items: left, center, right (NO LOOP)
    WHEN the 'left' item is focused
    AND the 'ArrowLeft' key is pressed
    AND the 'Enter' key is pressed
    THEN the 'right' item should have aria-pressed on true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'loop');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when, Then
    await leftItem.focus();
    await expect(leftItem).toBeFocused();

    await leftItem.press('ArrowLeft');
    await expect(rightItem).toBeFocused();
    await rightItem.press('Enter');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'true');
  });

  test(`GIVEN a toggle-group with items: left, center, right (NO LOOP)
    WHEN the 'right' item is focused
    AND the 'ArrowRight' key is pressed
    THEN the 'left' item should be focused`, async ({ page }) => {
    const { driver: d } = await setup(page, 'loop');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when, Then
    await rightItem.focus();
    await expect(rightItem).toBeFocused();

    await rightItem.press('ArrowRight');
    await expect(leftItem).toBeFocused();
  });

  test(`GIVEN a toggle-group with items: left, center, right (NO LOOP)
    WHEN the 'right' item is focused
    AND the 'ArrowRight' key is pressed
    AND the 'Enter' key is pressed
    THEN the 'left' item should have aria-pressed on true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'loop');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when, Then
    await rightItem.focus();
    await expect(rightItem).toBeFocused();

    await rightItem.press('ArrowRight');
    await expect(leftItem).toBeFocused();

    await leftItem.press('Enter');
    await expect(leftItem).toHaveAttribute('aria-pressed', 'true');
  });

  //disabled (item)
  test(`GIVEN a toggle-group with a disabled 'left' item
  WHEN the 'center' item is focused
  AND the 'ArrowLeft' key is pressed
  THEN the 'right' item should be focused`, async ({ page }) => {
    const { driver: d } = await setup(page, 'loop-item-disabled');

    //Given
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);

    await expect(leftItem).toBeDisabled();
    await expect(leftItem).toHaveAttribute('aria-disabled', 'true');
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when
    await centerItem.focus();
    await expect(centerItem).toBeFocused();
    await centerItem.press('ArrowLeft');
    await expect(rightItem).toBeFocused();
  });

  //vertical
  test(`GIVEN a toggle-group with 'vertical' orientation
    WHEN the 'left' item is focused
    AND the 'ArrowUp' key is pressed
    THEN the 'right' item should be focused`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-loop-vertical');

    //Given
    const root = d.getToggleGroupRoot();
    await expect(root).toHaveAttribute('aria-orientation', 'vertical');
    await expect(root).toHaveAttribute('dir', 'ltr');
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when, Then
    await leftItem.focus();
    await expect(leftItem).toBeFocused();

    await leftItem.press('ArrowUp');
    await expect(rightItem).toBeFocused();
  });

  //vertical and direction rtl
  test(`GIVEN a toggle-group with 'vertical' orientation and 'rtl' direction
    WHEN the 'left' item is focused
    AND the 'ArrowUp' key is pressed
    THEN the 'center' item should be focused`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-loop-vertical-rtl');

    //Given
    const root = d.getToggleGroupRoot();
    await expect(root).toHaveAttribute('aria-orientation', 'vertical');
    await expect(root).toHaveAttribute('dir', 'rtl');
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when, Then
    await leftItem.focus();
    await expect(leftItem).toBeFocused();

    await leftItem.press('ArrowUp');
    await expect(centerItem).toBeFocused();
  });

  //horizontal and direction rtl
  test(`GIVEN a toggle-group with 'horizontal' orientation and 'rtl' direction
    WHEN the 'left' item is focused
    AND the 'ArrowLeft' key is pressed
    THEN the 'center' item should be focused`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-loop-horizontal-rtl');

    //Given
    const root = d.getToggleGroupRoot();
    await expect(root).toHaveAttribute('aria-orientation', 'horizontal');
    await expect(root).toHaveAttribute('dir', 'rtl');
    await expect(d.getItems()).toHaveCount(3);
    const leftItem = await d.getItemByIndex(0);
    const centerItem = await d.getItemByIndex(1);
    const rightItem = await d.getItemByIndex(2);
    await expect(leftItem).toHaveAttribute('aria-pressed', 'false');
    await expect(centerItem).toHaveAttribute('aria-pressed', 'false');
    await expect(rightItem).toHaveAttribute('aria-pressed', 'false');

    //when, Then
    await leftItem.focus();
    await expect(leftItem).toBeFocused();

    await leftItem.press('ArrowLeft');
    await expect(centerItem).toBeFocused();
  });
});
