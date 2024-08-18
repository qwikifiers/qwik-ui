import { expect, test, type Page } from '@playwright/test';
import { PopoverOpenKeys, createTestDriver } from './popover.driver';

async function setup(page: Page, exampleName: string) {
  await page.goto(`/headless/popover/${exampleName}`);

  const driver = createTestDriver(page);

  return {
    driver,
  };
}

test('@Visual diff', async ({ page }) => {
  const { driver: d } = await setup(page, 'basic');
  await expect(page).toHaveScreenshot('closed popover.png');

  await d.getTrigger().click();

  await expect(page).toHaveScreenshot('opened popover.png');
});

test.describe('Mouse Behavior', () => {
  test(`GIVEN a closed popover
        WHEN clicking on the trigger
        THEN the popover should be opened `, async ({ page }) => {
    const { driver: d } = await setup(page, 'basic');
    await expect(d.getPopover()).toBeHidden();

    await d.getTrigger().click();

    await expect(d.getPopover()).toBeVisible();
  });

  test(`GIVEN an open popover
        WHEN clicking elsewhere on the page
        THEN the popover should close`, async ({ page }) => {
    const { driver: d } = await setup(page, 'basic');

    const { popover } = await d.openPopover('click');

    await page.mouse.click(0, 0);

    await expect(popover).toBeHidden();
  });

  test(`GIVEN a pair of popovers in auto mode
        WHEN clicking the first trigger
        AND clicking the second trigger
        THEN the first popover should close and the second one appear`, async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'auto');

    const { popover: firstPopover } = await d.openPopover('click', 0);
    const { popover: secondPopover } = await d.openPopover('click', 1);

    await expect(firstPopover).toBeHidden();
    await expect(secondPopover).toBeVisible();
  });

  test(`GIVEN an open manual popover
        WHEN clicking elsewhere on the page
        THEN the popover should remain open`, async ({ page }) => {
    const { driver: d } = await setup(page, 'manual');

    // initial open
    await d.openPopover('click', 0);

    await page.mouse.click(0, 0);

    await expect(d.getPopoverByTextContent('Popover 1')).toBeVisible();
  });

  test(`GIVEN a pair of manual popovers
        WHEN clicking the first trigger on the page
        AND then clicking the second trigger
        THEN then both popovers should be opened`, async ({ page }) => {
    const { driver: d } = await setup(page, 'manual');

    const { popover: firstPopover } = await d.openPopover('click', 0);
    const { popover: secondPopover } = await d.openPopover('click', 1);

    await expect(firstPopover).toBeVisible();
    await expect(secondPopover).toBeVisible();
  });

  test(`GIVEN a pair of manual popovers
    WHEN clicking the first trigger on the page
    AND clicking the second trigger
    THEN the seconf popover should overlap the first`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-popover-overlap');

    const [firstTrigger, secondTrigger] = await d.getAllTriggers();
    const [firstPopover, secondPopover] = await d.getAllPopovers();

    firstTrigger.click();
    secondTrigger.click();

    const topPopover = page.locator(
      `[popover]:above(:text("${await firstPopover.innerText()}"))`,
    );

    expect(await topPopover.innerText()).toBe(await secondPopover.innerText());
  });

  test(`GIVEN a pair of manual popovers
    WHEN clicking the second trigger on the page
    AND clicking the first trigger
    THEN the first popover should overlap the second`, async ({ page }) => {
    const { driver: d } = await setup(page, 'test-popover-overlap');

    const [firstTrigger, secondTrigger] = await d.getAllTriggers();
    const [firstPopover, secondPopover] = await d.getAllPopovers();

    firstTrigger.click();
    secondTrigger.click();

    const topPopover = page.locator(
      `[popover]:above(:text("${await secondPopover.innerText()}"))`,
    );

    expect(await topPopover.innerText()).toBe(await firstPopover.innerText());
  });

  test(`GIVEN a pair of manual opened popovers
        WHEN clicking the first trigger on the page
        AND clicking the second trigger
        THEN both popovers should be closed`, async ({ page }) => {
    const { driver: d } = await setup(page, 'manual');

    const { popover: firstPopover, trigger: firstTrigger } = await d.openPopover(
      'click',
      0,
    );
    const { popover: secondPopover, trigger: secondTrigger } = await d.openPopover(
      'click',
      1,
    );

    // Explicitly specifying click positions due to default behavior targeting the element's center,
    // which is obscured by the popover in this scenario.
    await firstTrigger.click({ position: { x: 1, y: 1 } });
    await secondTrigger.click({ position: { x: 1, y: 1 } });

    // Assert
    await expect(firstPopover).toBeHidden();
    await expect(secondPopover).toBeHidden();
  });

  test(`GIVEN a popover with placement set to right
        WHEN clicking the popover
        THEN the popover should appear to the right of the trigger`, async ({ page }) => {
    const { driver: d } = await setup(page, 'placement');

    const popover = d.getPopover();
    const trigger = d.getTrigger();

    await trigger.click();

    await expect(popover).toBeVisible();

    const popoverBoundingBox = await popover.boundingBox();
    const triggerBoundingBox = await trigger.boundingBox();

    const triggerRightEdge =
      (triggerBoundingBox?.x ?? Number.MAX_VALUE) +
      (triggerBoundingBox?.width ?? Number.MAX_VALUE);

    expect(popoverBoundingBox?.x).toBeGreaterThan(triggerRightEdge);
  });

  test(`GIVEN a popover with a gutter configured
        WHEN opening the popover
        THEN the popover should be spaced 40px from the popover`, async ({ page }) => {
    const { driver: d } = await setup(page, 'gutter');

    const popover = d.getPopover();
    const trigger = d.getTrigger();

    await trigger.click();

    await expect(popover).toBeVisible();

    const popoverBoundingBox = await popover.boundingBox();
    const triggerBoundingBox = await trigger.boundingBox();

    const gutterSpace =
      (triggerBoundingBox?.y ?? 0) -
      ((popoverBoundingBox?.y ?? 0) + (popoverBoundingBox?.height ?? 0));
    expect(gutterSpace).toBe(40);
  });

  test(`GIVEN a combobox with a flip configured
        WHEN scrolling the page
        THEN the popover flip to the opposite end once space runs out`, async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'flip');

    const popover = d.getPopover();
    const trigger = d.getTrigger();

    async function calculateYDiff() {
      const popoverBoundingBox = await popover.boundingBox();
      const triggerBoundingBox = await trigger.boundingBox();

      console.log(triggerBoundingBox, popoverBoundingBox);

      return (popoverBoundingBox?.y ?? 0) - (triggerBoundingBox?.y ?? 0);
    }

    // Introduce artificial spacing
    await trigger.evaluate((element) => (element.style.marginTop = '2000px'));
    await trigger.evaluate((element) => (element.style.marginBottom = '1000px'));

    await trigger.click();

    // Should be below the trigger
    await expect(popover).toBeVisible();

    let yDiff = await calculateYDiff();

    expect(yDiff).toBeGreaterThan(0);

    await page.evaluate(() => window.scrollBy(0, -400));

    await page.waitForTimeout(1000);

    // Should be above the trigger
    yDiff = await calculateYDiff();
    expect(yDiff).toBeLessThan(0);
  });

  test.describe('Programmatic functionality', () => {
    test(`GIVEN a programmatic popover
        WHEN the showPopover function is called
        THEN the popover should be open`, async ({ page }) => {
      const { driver: d } = await setup(page, 'test-show');
      await expect(d.getPopover()).toBeHidden();
      const programmaticTrigger = page.getByRole('button', { name: 'show popover' });
      await programmaticTrigger.click();
      await expect(d.getPopover()).toBeVisible();
    });

    test(`GIVEN an open programmatic popover
        WHEN the hidePopover function is called
        THEN the popover should be hidden`, async ({ page }) => {
      const { driver: d } = await setup(page, 'test-hide');
      const programmaticTrigger = page.getByRole('button', { name: 'hide popover' });
      // initial open
      await d.openPopover('click');
      await programmaticTrigger.click({ position: { x: 0, y: 0 } });
      await expect(d.getPopover()).toBeHidden();
    });

    test(`GIVEN a progrmmatic popover
        WHEN focusing on the button and pressing the 'o' key
        THEN the popover should be programmatically opened`, async ({ page }) => {
      const { driver: d } = await setup(page, 'programmatic');

      await expect(d.getPopover()).toBeHidden();

      const programmaticTrigger = page.getByRole('button');

      // Using `page` here because driver is scoped to the popover
      await expect(programmaticTrigger).toBeVisible();
      await programmaticTrigger.click();

      await expect(d.getPopover()).toBeVisible();
    });
  });
});

test.describe('Keyboard Behavior', () => {
  for (const key of ['Enter', 'Space'] as PopoverOpenKeys[]) {
    test(`GIVEN a closed popover
          WHEN focusing on the button and pressing the '${key}' key
          THEN the popover should open`, async ({ page }) => {
      const { driver: d } = await setup(page, 'basic');
      await expect(d.getPopover()).toBeHidden();

      await d.getTrigger().press(key);
      await expect(d.getPopover()).toBeVisible();
    });

    test(`GIVEN an open popover
          WHEN focusing on the button and pressing the '${key}' key
          THEN the popover should close`, async ({ page }) => {
      const { driver: d } = await setup(page, 'basic');

      // Open the popover
      await d.openPopover(key);

      await d.getTrigger().press(key);
      await expect(d.getPopover()).toBeHidden();
    });
  }

  test(`GIVEN an open popover
        WHEN focusing on the button and pressing the 'Escape' key
        THEN the popover should close and the trigger focused`, async ({ page }) => {
    const { driver: d } = await setup(page, 'basic');

    // Open the popover
    await d.openPopover('Enter');

    // Close the popover
    page.keyboard.press('Escape');

    await expect(d.getPopover()).toBeHidden();
    await expect(d.getTrigger()).toBeFocused();
  });

  test.describe('auto', () => {
    test(`GIVEN a pair of auto popovers
    WHEN one popover is open with the enter key
    AND another popover is open with the enter key
    THEN the first popover should close and the second one appear`, async ({ page }) => {
      const { driver: d } = await setup(page, 'auto');

      const { popover: firstPopover } = await d.openPopover('Enter', 0);
      await d.openPopover('Enter', 1);

      await expect(firstPopover).toBeHidden();
    });
  });

  test(`GIVEN a pair of manual opened popovers
        WHEN pressing enter on the first trigger on the page
        AND the same on the second trigger
        THEN then both popovers should be closed`, async ({ page }) => {
    const { driver: d } = await setup(page, 'manual');

    const { popover: firstPopover, trigger: firstTrigger } = await d.openPopover(
      'click',
      0,
    );
    const { popover: secondPopover, trigger: secondTrigger } = await d.openPopover(
      'click',
      1,
    );

    await secondTrigger.press('Enter');
    await expect(secondPopover).toBeHidden();

    // Assert
    await firstTrigger.press('Enter');
    await expect(firstPopover).toBeHidden();
  });

  test(`GIVEN a popover
        WHEN programmatically toggling the popover
        THEN the popover should open`, async ({ page }) => {
    const { driver: d } = await setup(page, 'programmatic');

    const popover = d.getPopover();
    const programmaticTrigger = page.getByRole('button');

    await expect(popover).toBeHidden();

    await programmaticTrigger.press('o');

    await expect(popover).toBeVisible();
  });

  test(`GIVEN a popover
        WHEN programmatically toggling the popover
        THEN the popover should close`, async ({ page }) => {
    const { driver: d } = await setup(page, 'programmatic');

    // initial open
    const popover = d.getPopover();
    const programmaticTrigger = page.getByRole('button');
    await programmaticTrigger.press('o');
    await expect(popover).toBeVisible();

    await programmaticTrigger.press('o');

    await expect(popover).toBeHidden();
  });

  test(`GIVEN a popover with placement set to top
        WHEN opening the popover using the keyboard
        THEN the popover should appear to the right of the trigger`, async ({ page }) => {
    const { driver: d } = await setup(page, 'placement');

    const popover = d.getPopover();
    const trigger = d.getTrigger();

    await trigger.focus();
    await expect(trigger).toBeFocused();

    await trigger.press('Enter');

    await expect(popover).toBeVisible();

    const triggerBoundingBox = await trigger.boundingBox();
    const popoverBoundingBox = await popover.boundingBox();

    expect(popoverBoundingBox?.x).toBeGreaterThan(
      (triggerBoundingBox?.x ?? Number.MAX_VALUE) +
        (triggerBoundingBox?.width ?? Number.MAX_VALUE),
    );
  });

  test.describe('Programmatic functionality', () => {
    test(`GIVEN a programmatic popover
        WHEN the showPopover function is called
        THEN the popover should be open`, async ({ page }) => {
      const { driver: d } = await setup(page, 'test-show');
      await expect(d.getPopover()).toBeHidden();
      const programmaticTrigger = page.getByRole('button', { name: 'show popover' });

      await programmaticTrigger.focus();
      await programmaticTrigger.press('Enter');

      await expect(d.getPopover()).toBeVisible();
    });

    test(`GIVEN an open programmatic popover
          WHEN the hidePopover function is called
          THEN the popover should be hidden`, async ({ page }) => {
      const { driver: d } = await setup(page, 'test-hide');

      // Initial open
      await d.getTrigger().click();
      await expect(d.getPopover()).toBeVisible();

      const programmaticTrigger = page.getByRole('button', { name: 'hide popover' });
      await programmaticTrigger.focus();
      await programmaticTrigger.press('Enter');

      await expect(d.getPopover()).toBeHidden();
    });

    test(`GIVEN a progrmmatic popover
      WHEN focusing on the button and pressing the 'o' key
      THEN the popover should be programmatically opened`, async ({ page }) => {
      const { driver: d } = await setup(page, 'programmatic');

      await expect(d.getPopover()).toBeHidden();

      const programmaticTrigger = page.getByRole('button', {
        name: "Focus me and press the 'o'",
      });

      // Using `page` here because driver is scoped to the popover
      await expect(programmaticTrigger).toBeVisible();
      await programmaticTrigger.focus();
      await programmaticTrigger.press('o');

      await expect(d.getPopover()).toBeVisible();
    });
  });
});
