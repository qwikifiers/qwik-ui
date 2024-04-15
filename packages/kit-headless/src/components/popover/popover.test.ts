import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './popover.driver';

async function setup(page: Page, exampleName: string) {
  await page.goto(`/headless/popover/${exampleName}`);

  const driver = createTestDriver(page);

  return {
    driver,
  };
}

test('@Visual diff', async ({ page }) => {
  const { driver: d } = await setup(page, 'hero');
  await expect(page).toHaveScreenshot('closed popover.png');

  await d.getTrigger().click();

  await expect(page).toHaveScreenshot('opened popover.png');
});

test.describe('Mouse Behavior', () => {
  test(`GIVEN a closed hero popover
        WHEN clicking on the trigger
        THEN the popover should be opened `, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    await expect(d.getPopover()).toBeHidden();

    await d.getTrigger().click();

    await expect(d.getPopover()).toBeVisible();
  });

  test(`GIVEN an open hero popover
        WHEN clicking elsewhere on the page
        THEN the popover should close`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await expect(d.getPopover()).toBeHidden();
    await d.getTrigger().click();

    // If I use `toBeVisible` here, the test fails that the `toBeHidden` check below????
    await expect(d.getPopover()).toHaveCSS('opacity', '1');

    await page.mouse.click(0, 0);

    await expect(d.getPopover()).toBeHidden();
  });

  test(`GIVEN an open auto popover
  WHEN clicking the first trigger on the page and then clicking the second trigger
  THEN the first popover should close and the second one appear`, async ({ page }) => {
    const { driver: d } = await setup(page, 'auto');
    //ask shai: is it good to use nth here???
    const [firstPopOver, secondPopOver] = await d.getAllPopovers();
    const [firstPopoverTrigger, secondPopoverTrigger] = await d.getAllTriggers();

    await expect(firstPopOver).toBeHidden();
    await expect(secondPopOver).toBeHidden();

    await firstPopoverTrigger.click({ position: { x: 1, y: 1 } });
    await expect(firstPopOver).toBeVisible();

    await secondPopoverTrigger.click({ position: { x: 1, y: 1 } });
    await expect(secondPopOver).toBeVisible();

    await expect(firstPopOver).toBeHidden();
  });

  test(`GIVEN a pair of manual popovers
  WHEN clicking the first trigger on the page and then clicking the second trigger
  THEN then both popovers should be opened`, async ({ page }) => {
    const { driver: d } = await setup(page, 'manual');

    //ask shai: is it good to use nth here???
    const [firstPopOver, secondPopOver] = await d.getAllPopovers();
    const [firstPopoverTrigger, secondPopoverTrigger] = await d.getAllTriggers();

    await expect(firstPopOver).toBeHidden();
    await expect(secondPopOver).toBeHidden();

    await firstPopoverTrigger.click({ position: { x: 1, y: 1 } });
    await secondPopoverTrigger.click({ position: { x: 1, y: 1 } });

    await expect(firstPopOver).toBeVisible();
    await expect(secondPopOver).toBeVisible();
  });

  test(`GIVEN a pair of manual opened popovers
  WHEN clicking the first trigger on the page and then clicking the second trigger
  THEN then both popovers should be closed`, async ({ page }) => {
    const { driver: d } = await setup(page, 'manual');

    const [firstPopOver, secondPopOver] = await d.getAllPopovers();
    const [firstPopoverTrigger, secondPopoverTrigger] = await d.getAllTriggers();

    // Arrange
    await firstPopoverTrigger.click({ position: { x: 1, y: 1 } });
    await secondPopoverTrigger.click({ position: { x: 1, y: 1 } });

    await expect(firstPopOver).toBeVisible();
    await expect(secondPopOver).toBeVisible();

    // Need to be explicit about where we're clicking. By default
    // the click action tries to click the center of the element
    // but in this case, the popover is covering it.
    await firstPopoverTrigger.click({ position: { x: 1, y: 1 } });
    await secondPopoverTrigger.click({ position: { x: 1, y: 1 } });

    // Assert
    await expect(firstPopOver).toBeHidden();
    await expect(secondPopOver).toBeHidden();
  });

  test(`GIVEN a popover with placement set to top
  WHEN opening the popover
  THEN the popover should appear to the right of the trigger`, async ({ page }) => {
    const { driver: d } = await setup(page, 'placement');

    const popover = d.getPopover();
    const trigger = d.getTrigger();

    await trigger.hover();

    await expect(popover).toBeVisible();

    const popoverBoundingBox = await popover.boundingBox();
    const triggerBoundingBox = await trigger.boundingBox();

    expect(popoverBoundingBox?.x).toBeGreaterThan(
      (triggerBoundingBox?.x ?? Number.MAX_VALUE) +
        (triggerBoundingBox?.width ?? Number.MAX_VALUE),
    );
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

    expect(
      (triggerBoundingBox?.y ?? 0) -
        ((popoverBoundingBox?.y ?? 0) + (popoverBoundingBox?.height ?? 0)),
    ).toBe(40);
  });

  // test(`GIVEN a combobox with a flip configured
  // WHEN scrolling the page
  // THEN the popover flip to the opposite end once space runs out`, async ({ page }) => {
  //   const { driver: d } = await setup(page, 'flip');

  //   const popover = d.getPopover();
  //   const trigger = d.getTrigger();

  //   // Introduce artificial spacing
  //   await trigger.evaluate((element) => (element.style.top = '800px'));

  //   await trigger.click();

  //   await expect(popover).toBeVisible();

  //   const popoverBoundingBox = await popover.boundingBox();
  //   const triggerBoundingBox = await trigger.boundingBox();

  //   console.log(triggerBoundingBox, popoverBoundingBox);

  //   const triggerBottomAbsolutePosition =
  //     (triggerBoundingBox?.y ?? 0) + (triggerBoundingBox?.height ?? 0);

  //   expect((popoverBoundingBox?.y ?? 0) - triggerBottomAbsolutePosition).toBe(24);
  // });
});

test.describe('Keyboard Behavior', () => {
  for (const key of ['Enter', 'Space']) {
    test(`GIVEN a closed hero popover
    WHEN focusing on the button and pressing the '${key}' key
    THEN the popover should open`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');
      await expect(d.getPopover()).toBeHidden();

      await d.getTrigger().press(key);

      await expect(d.getPopover()).toBeVisible();
    });

    test(`GIVEN a open hero popover
    WHEN focusing on the button and pressing the '${key}' key
    THEN the popover should close`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      // Open the popover
      await d.getTrigger().press(key);

      await expect(d.getPopover()).toBeVisible();

      // Close the popover
      await d.getTrigger().press(key);

      await expect(d.getPopover()).toBeHidden();
    });
  }

  test(`GIVEN a open hero popover
  WHEN focusing on the button and pressing the 'Escape' key
  THEN the popover should close and the trigger be focused`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // Open the popover
    await d.getTrigger().press('Enter');

    await expect(d.getPopover()).toBeVisible();

    // Close the popover
    page.keyboard.press('Escape');

    await expect(d.getPopover()).toBeHidden();
    await expect(d.getTrigger()).toBeFocused();
  });

  test(`GIVEN a programmatic popover with a programmatic trigger
  WHEN focusing on the button and pressing the 'o' key
  THEN the popover should open`, async ({ page }) => {
    const { driver: d } = await setup(page, 'programmatic');

    await expect(d.getPopover()).toBeHidden();

    // Using `page` here because driver is scoped to the popover
    await page.getByRole('button', { name: "Focus me and press the 'o'" }).focus();
    await page.keyboard.type('o');

    await expect(d.getPopover()).toBeVisible();
  });
  test(`GIVEN an open auto popover
  WHEN the first trigger open and the focus changes to the second popover
  THEN the first popover should close and the second one appear`, async ({ page }) => {
    const { driver: d } = await setup(page, 'auto');

    const [firstPopOver, secondPopOver] = await d.getAllPopovers();
    const [firstPopoverTrigger, secondPopoverTrigger] = await d.getAllTriggers();

    await expect(firstPopOver).toBeHidden();
    await expect(secondPopOver).toBeHidden();

    await firstPopoverTrigger.press('Enter');
    await expect(firstPopOver).toBeVisible();
    await firstPopoverTrigger.press('Tab');
    await expect(secondPopoverTrigger).toBeFocused();

    await secondPopoverTrigger.press('Enter');
    await expect(secondPopOver).toBeVisible();

    await expect(firstPopOver).toBeHidden();
  });

  test(`GIVEN a pair of manual popovers
  WHEN clicking the first trigger on the page and then clicking the second trigger
  THEN then both popovers should be opened`, async ({ page }) => {
    const { driver: d } = await setup(page, 'manual');

    const [firstPopOver, secondPopOver] = await d.getAllPopovers();
    const [firstPopoverTrigger, secondPopoverTrigger] = await d.getAllTriggers();

    await expect(firstPopOver).toBeHidden();
    await expect(secondPopOver).toBeHidden();

    await firstPopoverTrigger.press('Enter');

    await secondPopoverTrigger.press('Enter');

    await expect(firstPopOver).toBeVisible();
    await expect(secondPopOver).toBeVisible();
  });

  test(`GIVEN a pair of manual opened popovers
  WHEN activating the first trigger on the page and then activating the second trigger
  THEN then both popovers should be closed`, async ({ page }) => {
    const { driver: d } = await setup(page, 'manual');

    const [firstPopOver, secondPopOver] = await d.getAllPopovers();
    const [firstPopoverTrigger, secondPopoverTrigger] = await d.getAllTriggers();

    // Arrange
    await firstPopoverTrigger.press('Enter');

    await secondPopoverTrigger.press('Enter');

    await expect(firstPopOver).toBeVisible();
    await expect(secondPopOver).toBeVisible();

    // Act
    await secondPopoverTrigger.press('Enter');
    await expect(secondPopOver).toBeHidden();

    // Assert
    await firstPopoverTrigger.press('Enter');
    await expect(firstPopOver).toBeHidden();
  });

  test(`GIVEN a programmatic popover
  WHEN focusing the button on the page and then typing 'o'
  THEN the popover should open`, async ({ page }) => {
    const { driver: d } = await setup(page, 'programmatic');

    const popover = d.getPopover();
    const programmaticButtonTrigger = d.getProgrammaticButtonTrigger();

    await expect(popover).toBeHidden();

    await programmaticButtonTrigger.press('o');

    await expect(popover).toBeVisible();
  });

  test(`GIVEN an open programmatic popover
  WHEN focusing the button on the page and then typing 'o'
  THEN the popover should close`, async ({ page }) => {
    const { driver: d } = await setup(page, 'programmatic');

    const popover = d.getPopover();
    const programmaticButtonTrigger = d.getProgrammaticButtonTrigger();

    await programmaticButtonTrigger.press('o');

    await expect(popover).toBeVisible();

    await programmaticButtonTrigger.press('o');

    await expect(popover).toBeHidden();
  });

  test(`GIVEN a popover with placement set to top
  WHEN opening the popover using the keyboard
  THEN the popover should appear to the right of the trigger`, async ({ page }) => {
    const { driver: d } = await setup(page, 'placement');

    const popover = d.getPopover();
    const trigger = d.getTrigger();

    await trigger.press('Enter');

    await expect(popover).toBeVisible();

    const popoverBoundingBox = await popover.boundingBox();
    const triggerBoundingBox = await trigger.boundingBox();

    expect(popoverBoundingBox?.x).toBeGreaterThan(
      (triggerBoundingBox?.x ?? Number.MAX_VALUE) +
        (triggerBoundingBox?.width ?? Number.MAX_VALUE),
    );
  });
});
