import { expect, test, type Page } from '@playwright/test';
import { PopoverOpenKeys, createTestDriver } from './popover.driver';
import { centerOf, recordPressEvents } from '../../utils/test-utils';

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

    await firstTrigger.click();
    await secondTrigger.click();

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

    await firstTrigger.click();
    await secondTrigger.click();

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

  test('a panel with shift beside its trigger stays inside the window while its trigger is partly in view', async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'test-shift-scroll');
    await d.getTrigger().click();
    await expect(d.getPopover()).toBeVisible();

    await page.getByTestId('scroller').evaluate((scroller) => scroller.scrollTo(0, 320));

    await expect.poll(async () => (await d.getPopover().boundingBox())?.y).toBe(0);
  });

  test('a panel with shift beside its trigger stays next to it when the trigger scrolls out of view', async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'test-shift-scroll');
    await d.getTrigger().click();
    await expect(d.getPopover()).toBeVisible();

    await page.getByTestId('scroller').evaluate((scroller) => scroller.scrollTo(0, 400));

    await expect
      .poll(async () => {
        const panel = await d.getPopover().boundingBox();
        const trigger = await d.getTrigger().boundingBox();
        return (panel?.y ?? 0) - ((trigger?.y ?? 0) + (trigger?.height ?? 0));
      })
      .toBeLessThanOrEqual(0);
  });

  test('a trigger inside a form opens the popover without submitting the form', async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'test-form');

    await d.getTrigger().click();

    await expect(d.getPopover()).toBeVisible();
    await expect(page.getByTestId('submits')).toHaveText('form submits: 0');
  });

  test('padding and border utilities apply to a floating panel when the app declares the layer order', async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'test-layer-order');

    await d.getTrigger().click();
    await expect(d.getPopover()).toBeVisible();

    await expect(d.getPopover()).toHaveCSS('padding-top', '16px');
    await expect(d.getPopover()).toHaveCSS('border-top-width', '2px');
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

test.describe('Modal', () => {
  const openPopover = async (page: Page) => {
    await page.getByRole('button', { name: 'Open popover' }).click();
    await expect(page.locator('[popover]')).toBeVisible();
  };

  test('by default, the click that closes the popover reaches the button it lands on', async ({
    page,
  }) => {
    await setup(page, 'test-modal?modal=off');
    await openPopover(page);
    const outside = page.getByTestId('outside');
    const seenEvents = await recordPressEvents(outside);
    const { x, y } = await centerOf(outside);

    await page.mouse.click(x, y);

    await expect(page.locator('[popover]')).toBeHidden();
    await expect(outside).toHaveText('outside clicks: 1');
    expect(await seenEvents()).toContain('click');
  });

  test('with modal, the press that closes the popover does not reach the button it lands on', async ({
    page,
  }) => {
    await setup(page, 'test-modal');
    await openPopover(page);
    const outside = page.getByTestId('outside');
    const seenEvents = await recordPressEvents(outside);
    const { x, y } = await centerOf(outside);

    await page.mouse.click(x, y);

    await expect(page.locator('[popover]')).toBeHidden();
    expect(await seenEvents()).toEqual([]);
    await expect(outside).toHaveText('outside clicks: 0');
  });

  test('with modal, the click that closes the popover does not follow the link it lands on', async ({
    page,
  }) => {
    await setup(page, 'test-modal');
    await openPopover(page);
    const { x, y } = await centerOf(page.getByText('Outside link'));

    await page.mouse.click(x, y);

    await expect(page.locator('[popover]')).toBeHidden();
    expect(new URL(page.url()).hash).toBe('');
  });

  test('with modal, an outside button is not hovered while the popover is open', async ({
    page,
  }) => {
    await setup(page, 'test-modal');
    await openPopover(page);
    const outside = page.getByTestId('outside');
    const { x, y } = await centerOf(outside);

    await page.mouse.move(x, y);

    expect(await outside.evaluate((button) => button.matches(':hover'))).toBe(false);
  });

  test('by default, an outside button stays exposed to screen readers while the popover is open', async ({
    page,
  }) => {
    await setup(page, 'test-modal?modal=off');
    await openPopover(page);

    await expect(page.getByRole('button', { name: /outside clicks/ })).toHaveCount(1);
  });

  test('with modal, an outside button is hidden from screen readers while the popover is open', async ({
    page,
  }) => {
    await setup(page, 'test-modal');
    await openPopover(page);
    await expect(page.getByRole('button', { name: /outside clicks/ })).toHaveCount(0);

    await page.keyboard.press('Escape');
    await expect(page.locator('[popover]')).toBeHidden();

    await expect(page.getByRole('button', { name: /outside clicks/ })).toHaveCount(1);
  });

  test('with modal, the page does not scroll while the popover is open', async ({
    page,
  }) => {
    await setup(page, 'test-modal');
    await expect(page.locator('body')).toHaveCSS('overflow', 'visible');

    await openPopover(page);
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');

    await page.keyboard.press('Escape');
    await expect(page.locator('[popover]')).toBeHidden();
    await expect(page.locator('body')).toHaveCSS('overflow', 'visible');
  });

  test('with modal, Tab from the last element stays inside the panel', async ({
    page,
  }) => {
    await setup(page, 'test-modal');
    await openPopover(page);
    const panelButton = page.getByRole('button', { name: /panel clicks/ });
    await expect(panelButton).toBeFocused();

    await page.keyboard.press('Tab');

    await expect(panelButton).toBeFocused();
  });

  test('with modal, closing the popover gives focus back to the trigger', async ({
    page,
  }) => {
    await setup(page, 'test-modal');
    await openPopover(page);
    await expect(page.getByRole('button', { name: /panel clicks/ })).toBeFocused();

    await page.keyboard.press('Escape');

    await expect(page.locator('[popover]')).toBeHidden();
    await expect(page.getByRole('button', { name: 'Open popover' })).toBeFocused();
  });

  test('with modal, a click made from code on an outside button still goes through', async ({
    page,
  }) => {
    await setup(page, 'test-modal');
    await openPopover(page);
    const outside = page.getByTestId('outside');

    await outside.evaluate((button: HTMLButtonElement) => button.click());

    await expect(outside).toHaveText('outside clicks: 1');
  });

  test('the next click on that button goes through once the popover is closed', async ({
    page,
  }) => {
    await setup(page, 'test-modal');
    await openPopover(page);
    const outside = page.getByTestId('outside');
    const { x, y } = await centerOf(outside);
    await page.mouse.click(x, y);
    await expect(page.locator('[popover]')).toBeHidden();

    await outside.click();

    await expect(outside).toHaveText('outside clicks: 1');
  });

  test('a click on a button inside the panel still runs it', async ({ page }) => {
    await setup(page, 'test-modal');
    await openPopover(page);

    await page.getByRole('button', { name: /panel clicks/ }).click();

    await expect(page.getByRole('button', { name: /panel clicks/ })).toHaveText(
      'panel clicks: 1',
    );
  });

  test('a click on the trigger still closes the popover', async ({ page }) => {
    await setup(page, 'test-modal');
    await openPopover(page);

    await page.getByRole('button', { name: 'Open popover' }).click();

    await expect(page.locator('[popover]')).toBeHidden();
  });

  test('modal turned on after the page loads takes effect', async ({ page }) => {
    await setup(page, 'test-modal?modal=off');
    await page.getByLabel('modal').check();
    await openPopover(page);
    const outside = page.getByTestId('outside');
    const seenEvents = await recordPressEvents(outside);
    const { x, y } = await centerOf(outside);

    await page.mouse.click(x, y);

    await expect(page.locator('[popover]')).toBeHidden();
    expect(await seenEvents()).toEqual([]);
  });

  test('modal turned off after the page loads lets hover and clicks through again', async ({
    page,
  }) => {
    await setup(page, 'test-modal');
    await page.getByLabel('modal').uncheck();
    await openPopover(page);
    const outside = page.getByTestId('outside');
    const { x, y } = await centerOf(outside);

    await page.mouse.move(x, y);
    expect(await outside.evaluate((button) => button.matches(':hover'))).toBe(true);
    await page.mouse.click(x, y);

    await expect(outside).toHaveText('outside clicks: 1');
    await expect(page.locator('body')).toHaveCSS('overflow', 'visible');
  });

  test('a popover mounted in the browser with modal stops the press', async ({
    page,
  }) => {
    await setup(page, 'test-modal');
    await page.getByLabel('mounted').uncheck();
    await page.getByLabel('mounted').check();
    await openPopover(page);
    const outside = page.getByTestId('outside');
    const seenEvents = await recordPressEvents(outside);
    const { x, y } = await centerOf(outside);

    await page.mouse.click(x, y);

    await expect(page.locator('[popover]')).toBeHidden();
    expect(await seenEvents()).toEqual([]);
  });

  test('a manual popover with modal lets outside clicks through', async ({ page }) => {
    await setup(page, 'test-modal-manual');
    await openPopover(page);
    const outside = page.getByTestId('outside');

    await outside.click();

    await expect(outside).toHaveText('outside clicks: 1');
    await expect(page.locator('[popover]')).toBeVisible();
    await expect(page.locator('body')).toHaveCSS('overflow', 'visible');
  });

  test('a press on a modal backdrop only closes the popover inside the modal', async ({
    page,
  }) => {
    await setup(page, 'test-modal-in-modal');
    await page.getByRole('button', { name: 'Open Modal' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await openPopover(page);

    await page.mouse.click(5, 5);

    await expect(page.locator('[popover]')).toBeHidden();
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test.describe('touch', () => {
    test.use({ hasTouch: true });

    test('with modal, a tap outside only closes the popover', async ({ page }) => {
      await setup(page, 'test-modal');
      await page.getByRole('button', { name: 'Open popover' }).tap();
      await expect(page.locator('[popover]')).toBeVisible();
      const outside = page.getByTestId('outside');
      const seenEvents = await recordPressEvents(outside);
      const { x, y } = await centerOf(outside);

      await page.touchscreen.tap(x, y);

      await expect(page.locator('[popover]')).toBeHidden();
      expect(await seenEvents()).toEqual([]);
      await expect(outside).toHaveText('outside clicks: 0');
    });
  });
});

test.describe('Styles', () => {
  test('a closed panel laid out with flex stays hidden', async ({ page }) => {
    const { driver: d } = await setup(page, 'test-flex-panel');

    await expect(d.getTrigger()).toBeVisible();
    await expect(d.getPopover()).toBeHidden();
  });

  test('a closed panel that does not float and is laid out with flex stays hidden', async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'test-flex-panel-static');

    await expect(d.getTrigger()).toBeVisible();
    await expect(d.getPopover()).toBeHidden();
  });

  test('a panel laid out with flex shows when open', async ({ page }) => {
    const { driver: d } = await setup(page, 'test-flex-panel');

    await d.getTrigger().click();

    await expect(d.getPopover()).toBeVisible();
    await expect(d.getPopover()).toHaveCSS('display', 'flex');
  });

  test('a panel laid out with flex is hidden again once closed', async ({ page }) => {
    const { driver: d } = await setup(page, 'test-flex-panel');
    await d.getTrigger().click();
    await expect(d.getPopover()).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(d.getPopover()).toBeHidden();
  });
});

test.describe('Close', () => {
  test('a click on Popover.Close closes the popover', async ({ page }) => {
    const { driver: d } = await setup(page, 'test-close');
    await page.getByRole('button', { name: 'Open popover' }).click();
    await expect(d.getPopover()).toBeVisible();

    await page.getByRole('button', { name: 'Close' }).click();

    await expect(d.getPopover()).toBeHidden();
  });

  test('Popover.Close also runs its own onClick$', async ({ page }) => {
    const { driver: d } = await setup(page, 'test-close');
    await page.getByRole('button', { name: 'Open popover' }).click();
    await expect(d.getPopover()).toBeVisible();

    await page.getByRole('button', { name: 'Close' }).click();

    await expect(page.getByTestId('close-clicks')).toHaveText('close clicks: 1');
    await expect(d.getPopover()).toBeHidden();
  });

  test('Enter on Popover.Close closes the popover', async ({ page }) => {
    const { driver: d } = await setup(page, 'test-close');
    await page.getByRole('button', { name: 'Open popover' }).click();
    await expect(d.getPopover()).toBeVisible();

    await page.getByRole('button', { name: 'Close' }).press('Enter');

    await expect(d.getPopover()).toBeHidden();
  });
});
