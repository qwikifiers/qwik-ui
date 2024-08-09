import { expect, test, type Page } from '@playwright/test';
import { createTooltipDriver } from './tooltip.driver';
import { assertBoundingBoxExists } from '../../utils/test-utils';

async function setup(page: Page, exampleName: string) {
  await page.goto(`/headless/tooltip/${exampleName}`);

  const driver = createTooltipDriver(page);

  return {
    driver,
  };
}

test('@Visual diff', async ({ page }) => {
  const { driver: d } = await setup(page, 'basic');
  await expect(page).toHaveScreenshot('closed tooltip.png');

  await d.getTrigger().hover();

  await expect(page).toHaveScreenshot('opened tooltip.png');
});

test.describe('Mouse Behavior', () => {
  test(`GIVEN a closed tooltip
        WHEN hovering over the trigger
        THEN the tooltip should open`, async ({ page }) => {
    const { driver: d } = await setup(page, 'basic');
    await expect(d.getTooltip()).toBeHidden();

    await d.getTrigger().hover();

    await expect(d.getTooltip()).toBeVisible();
  });

  test(`GIVEN an open tooltip
        WHEN moving the mouse away from the trigger
        THEN the tooltip should close`, async ({ page }) => {
    const { driver: d } = await setup(page, 'basic');

    await d.getTrigger().hover();
    await expect(d.getTooltip()).toBeVisible();

    await page.mouse.move(0, 0);
    await expect(d.getTooltip()).toBeHidden();
  });

  test(`GIVEN an open tooltip
        WHEN clicking on the trigger
        THEN the tooltip should remain open`, async ({ page }) => {
    const { driver: d } = await setup(page, 'basic');

    await d.getTrigger().hover();
    await expect(d.getTooltip()).toBeVisible();

    await d.getTrigger().click();
    await expect(d.getTooltip()).toBeVisible();
  });
});

test.describe('Keyboard Behavior', () => {
  test(`GIVEN an open tooltip
        WHEN focusing on the trigger and pressing the 'Escape' key
        THEN the tooltip should close`, async ({ page }) => {
    const { driver: d } = await setup(page, 'basic');
    await expect(d.getTooltip()).toBeHidden();

    await d.getTrigger().focus();
    await expect(d.getTooltip()).toBeVisible();

    await d.getTrigger().press('Escape');
    await expect(d.getTooltip()).not.toBeVisible();
  });
});

test.describe('Placement and Positioning', () => {
  test(`GIVEN a tooltip with placement set to top
    WHEN hovering over the trigger
    THEN the tooltip should appear at the top of the trigger`, async ({ page }) => {
    const { driver: d } = await setup(page, 'placement');

    const placement = 'top';
    d.selectOption(placement);

    const tooltip = d.getTooltip();
    const trigger = d.getTrigger();

    await trigger.hover();

    await expect(tooltip).toBeVisible();

    d.validateTooltipPosition(placement);
  });

  test(`GIVEN a tooltip with placement set to right
    WHEN hovering over the trigger
    THEN the tooltip should appear at the right of the trigger`, async ({ page }) => {
    const { driver: d } = await setup(page, 'placement');

    const placement = 'right';
    d.selectOption(placement);

    const tooltip = d.getTooltip();
    const trigger = d.getTrigger();

    await trigger.hover();

    await expect(tooltip).toBeVisible();

    d.validateTooltipPosition(placement);
  });

  test(`GIVEN a tooltip with placement set to bottom
    WHEN hovering over the trigger
    THEN the tooltip should appear at the bottom of the trigger`, async ({ page }) => {
    const { driver: d } = await setup(page, 'placement');

    const placement = 'bottom';
    d.selectOption(placement);

    const tooltip = d.getTooltip();
    const trigger = d.getTrigger();

    await trigger.hover();

    await expect(tooltip).toBeVisible();

    d.validateTooltipPosition(placement);
  });

  test(`GIVEN a tooltip with placement set to left
    WHEN hovering over the trigger
    THEN the tooltip should appear at the left of the trigger`, async ({ page }) => {
    const { driver: d } = await setup(page, 'placement');

    const placement = 'left';
    d.selectOption(placement);

    const tooltip = d.getTooltip();
    const trigger = d.getTrigger();

    await trigger.hover();

    await expect(tooltip).toBeVisible();

    d.validateTooltipPosition(placement);
  });

  test(`GIVEN a tooltip with a gutter configured
        WHEN opening the tooltip
        THEN the tooltip should be spaced correctly from the trigger`, async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'gutter');

    const tooltip = d.getTooltip();
    const trigger = d.getTrigger();

    await trigger.hover();
    await expect(tooltip).toBeVisible();

    const tooltipBoundingBox = await tooltip.boundingBox();
    const triggerBoundingBox = await trigger.boundingBox();

    assertBoundingBoxExists(tooltipBoundingBox);
    assertBoundingBoxExists(triggerBoundingBox);

    const gutterSpace = triggerBoundingBox.y - tooltipBoundingBox.y;
    expect(gutterSpace).toBe(44);
  });

  test(`GIVEN a tooltip with flip configured
        WHEN scrolling the page
        THEN the tooltip should flip to the opposite end once space runs out`, async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'flip');

    const tooltip = d.getTooltip();
    const trigger = d.getTrigger();

    async function calculateYDiff() {
      const tooltipBoundingBox = await tooltip.boundingBox();
      const triggerBoundingBox = await trigger.boundingBox();

      assertBoundingBoxExists(tooltipBoundingBox);
      assertBoundingBoxExists(triggerBoundingBox);

      return tooltipBoundingBox.y - triggerBoundingBox.y;
    }

    // Introduce artificial spacing
    await trigger.evaluate((element) => (element.style.marginTop = '2000px'));
    await trigger.evaluate((element) => (element.style.marginBottom = '1000px'));

    await trigger.hover();
    await expect(tooltip).toBeVisible();

    let yDiff = await calculateYDiff();
    expect(yDiff).toBeLessThan(0);

    await page.evaluate(() => window.scrollBy(0, 340));

    await page.waitForTimeout(1000);

    await trigger.hover();
    await expect(tooltip).toBeVisible();

    yDiff = await calculateYDiff();
    expect(yDiff).toBeGreaterThan(0);
  });
});

test.describe('Tooltip Animations', () => {
  test(`GIVEN a tooltip with an animation
        WHEN hovering over the trigger
        THEN the tooltip should open with an animation`, async ({ page }) => {
    const { driver: d } = await setup(page, 'animation');
    const tooltip = d.getTooltip();
    const trigger = d.getTrigger();

    await trigger.hover();
    await expect(tooltip).toBeHidden();

    // Wait for the duration of the animation (e.g., 500ms)
    await page.waitForTimeout(500);

    await expect(tooltip).toBeVisible();
  });

  test(`GIVEN an open tooltip with an animation
        WHEN moving the mouse away from the trigger
        THEN the tooltip should close with an animation`, async ({ page }) => {
    const { driver: d } = await setup(page, 'animation');
    const tooltip = d.getTooltip();
    const trigger = d.getTrigger();

    await trigger.hover();
    await page.waitForTimeout(500);
    await expect(tooltip).toBeVisible();

    await page.mouse.move(0, 0);

    // Wait for the duration of the animation (e.g., 500ms)
    await page.waitForTimeout(500);

    await expect(tooltip).toBeHidden();
  });
});

test.describe('Tooltip Events', () => {
  test(`GIVEN a tooltip with opOpenChange configured
        WHEN hovering over the trigger
        THEN the text should say "The tooltip is open"`, async ({ page }) => {
    const { driver: d } = await setup(page, 'onChange');
    const tooltip = d.getTooltip();
    const trigger = d.getTrigger();

    expect(d.getOnChangeVerificationText('closed')).toBeVisible();

    await trigger.hover();
    await expect(tooltip).toBeVisible();

    expect(d.getOnChangeVerificationText('open')).toBeVisible();
  });
});
