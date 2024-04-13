import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './modal.driver';

async function setup(page: Page, exampleName: string) {
  await page.goto(`/headless/modal/${exampleName}`);

  const driver = createTestDriver(page);

  return {
    driver,
  };
}

// test.describe('a11y', () => {
//   test('Axe Validation Test', async ({ page }) => {
//     const { driver: d } = await setup(page, 'hero');

//     const initialResults = await new AxeBuilder({ page })
//       .include('[role="dialog"]')
//       .analyze();

//     expect(initialResults.violations).toEqual([]);

//     await d.openModal();

//     const afterClickResults = await new AxeBuilder({ page })
//       .include('[role="dialog"]')
//       .analyze();

//     expect(afterClickResults.violations).toEqual([]);
//   });
// });

const openCloseExamples = ['hero', 'animatable'];

test('@Visual diff', async ({ page }) => {
  const { driver: d } = await setup(page, 'hero');
  await expect(page).toHaveScreenshot('closed modal.png');

  await d.getTrigger().click();

  await expect(page).toHaveScreenshot('opened modal.png');
});

openCloseExamples.forEach((example) => {
  test.describe('Mouse Behavior', () => {
    test(`GIVEN a ${example} modal
          WHEN clicking the modal trigger
          THEN open the modal`, async ({ page }) => {
      const { driver: d } = await setup(page, example);

      await d.getTrigger().click();
      await expect(d.getModal()).toBeVisible();
    });

    test(`GIVEN a ${example} open modal
          WHEN clicking the backdrop
          THEN close the modal`, async ({ page }) => {
      const { driver: d } = await setup(page, example);

      // initial open
      await d.getTrigger().click();
      await expect(d.getModal()).toBeVisible();

      // click top left corner
      await d.getModal().click({ position: { x: 0, y: 0 } });
      await expect(d.getModal()).toBeHidden();
    });
  });

  test.describe('Keyboard Behavior', () => {
    test(`GIVEN a ${example} open modal
          WHEN pressing the escape key
          THEN close the modal`, async ({ page }) => {
      const { driver: d } = await setup(page, example);

      await d.openModal();

      await d.getTrigger().press('Escape');
      await expect(d.getModal()).toBeHidden();
    });
  });
});

test.describe('Scroll locking', () => {
  test(`GIVEN a modal and page with a vertical scrollbar
        WHEN the modal is opened
        THEN the page's scrollbar is hidden`, async ({ page }) => {
    const { driver: d } = await setup(page, 'scroll-lock');

    expect(
      await page.evaluate(() => {
        const { overflow } = getComputedStyle(document.body);
        return overflow === 'visible';
      }),
    ).toBe(true);

    await d.openModal();

    expect(
      await page.evaluate(() => {
        const { overflow } = getComputedStyle(document.body);
        return overflow === 'visible';
      }),
    ).toBe(false);
  });

  test(`GIVEN an open modal that is scroll locked
        WHEN the modal is closed
        THEN the page's scrollbar shoud be visible`, async ({ page }) => {
    const { driver: d } = await setup(page, 'scroll-lock');

    expect(
      await page.evaluate(() => {
        const { overflow } = getComputedStyle(document.body);
        return overflow === 'visible';
      }),
    ).toBe(true);

    await d.openModal();

    expect(
      await page.evaluate(() => {
        const { overflow } = getComputedStyle(document.body);
        return overflow === 'visible';
      }),
    ).toBe(false);

    await d.getTrigger().press('Escape');

    expect(
      await page.evaluate(() => {
        const { overflow } = getComputedStyle(document.body);
        return overflow === 'visible';
      }),
    ).toBe(true);
  });

  test(`GIVEN two open modals, one nested inside the other
        WHEN the second modal is opened
        THEN the page's scrollbar shoud remain hidden`, async ({ page }) => {
    const { driver: d } = await setup(page, 'nested');

    await d.openModal();

    await page.getByRole('button', { name: 'Nested Modal Trigger' }).click();
    await expect(page.getByRole('dialog').nth(1)).toBeVisible();
    await expect(page.getByRole('dialog').nth(1)).toHaveText('Nested Modal Content');

    expect(
      await page.evaluate(() => {
        const { overflow } = getComputedStyle(document.body);
        return overflow === 'visible';
      }),
    ).toBe(false);
  });

  test(`GIVEN two open modals, one nested inside the other
        WHEN the nested modal's backdrop is clicked
        THEN the page's scrollbar shoud remain hidden`, async ({ page }) => {
    const { driver: d } = await setup(page, 'nested');

    await d.openModal();

    await page.getByRole('button', { name: 'Nested Modal Trigger' }).click();
    await expect(page.getByRole('dialog').nth(1)).toBeVisible();
    await expect(page.getByRole('dialog').nth(1)).toHaveText('Nested Modal Content');

    await page
      .getByRole('dialog')
      .nth(1)
      .click({ position: { x: 0, y: 0 } });

    expect(
      await page.evaluate(() => {
        const { overflow } = getComputedStyle(document.body);
        return overflow === 'visible';
      }),
    ).toBe(false);
  });
});

test.describe('Focus Trap', () => {
  test(`GIVEN a modal with focusable elements inside
        WHEN the mdoal is opened
        THEN focus should go to the first focusable element`, async ({ page }) => {
    const { driver: d } = await setup(page, 'focus-trap');

    await d.openModal();
    const insideInput = page.getByRole('textbox', { name: 'inside input' });

    await expect(insideInput).toBeFocused();
  });

  test(`GIVEN an open modal with focus trapping and     focusable elements
        WHEN the last focusable element is focused
        AND the tab key is pressed
        THEN focus should loop back to the first focusable element`, async ({ page }) => {
    const { driver: d } = await setup(page, 'focus-trap');

    await d.openModal();
    const insideInput = page.getByRole('textbox', { name: 'inside input' });
    const insideButton = page.getByRole('button', { name: 'inside button' });

    await expect(insideInput).toBeFocused();
    await insideInput.press('Tab');
    await expect(insideButton).toBeFocused();
    await insideButton.press('Tab');
    await expect(insideInput).toBeFocused();
  });
});

test.describe('Nested Modals', () => {
  test(`GIVEN two open modals, one nested inside the other
  WHEN the second modal's backdrop is clicked
  THEN the first modal should remain open`, async ({ page }) => {
    const { driver: d } = await setup(page, 'nested');

    await d.openModal();

    await page.getByRole('button', { name: 'Nested Modal Trigger' }).click();
    await expect(page.getByRole('dialog').nth(1)).toBeVisible();
    await expect(page.getByRole('dialog').nth(1)).toHaveText('Nested Modal Content');

    await page
      .getByRole('dialog')
      .nth(1)
      .click({ position: { x: 0, y: 0 } });

    await expect(page.getByRole('dialog').nth(1)).toBeHidden();
    await expect(d.getModal()).toBeVisible();
  });
});
