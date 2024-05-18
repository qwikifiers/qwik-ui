import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './accordion.driver';

async function setup(page: Page, exampleName: string) {
  await page.goto(`headless/accordion/${exampleName}`);

  const driver = createTestDriver(page);

  return {
    driver,
  };
}

async function collapsibleSetup(page: Page, exampleName: string) {
  const { driver: d } = await setup(page, exampleName);

  const firstItem = d.getItemAt(0);
  const firstTrigger = d.getTriggerAt(0);
  const firstContent = d.getContentAt(0);

  return {
    firstItem,
    firstTrigger,
    firstContent,
    d,
  };
}

test.describe('Mouse Behavior', () => {
  test(`GIVEN a collapsible
        WHEN clicking on the trigger
        THEN the content should be visible
        AND aria-expanded is true`, async ({ page }) => {
    const { firstContent, firstTrigger } = await collapsibleSetup(page, 'hero');

    await firstTrigger.click();

    await expect(firstContent).toBeVisible();
    await expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');
  });

  test(`GIVEN an open collapsible
        WHEN clicking on the trigger
        THEN the content should be hidden
        AND aria-expanded is false`, async ({ page }) => {
    const { firstContent, firstTrigger } = await collapsibleSetup(page, 'open');

    await expect(firstContent).toBeVisible();

    await firstTrigger.click();

    await expect(firstContent).toBeHidden();
    await expect(firstTrigger).toHaveAttribute('aria-expanded', 'false');
  });
});

test.describe('Keyboard Behavior', () => {
  test(`GIVEN a hero collapsible
        WHEN pressing the space key
        THEN the content should be visible
        AND aria-expanded is true`, async ({ page }) => {
    const { firstContent, firstTrigger } = await collapsibleSetup(page, 'hero');

    await firstTrigger.press('Space');

    await expect(firstContent).toBeVisible();
    await expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');
  });

  test(`GIVEN an open hero collapsible
        WHEN pressing the space key
        THEN the content should be hidden
        AND aria-expanded is false`, async ({ page }) => {
    const { firstContent, firstTrigger } = await collapsibleSetup(page, 'open');
    await firstTrigger.press('Space');

    await expect(firstContent).toBeHidden();
    await expect(firstTrigger).toHaveAttribute('aria-expanded', 'false');
  });

  test(`GIVEN a hero collapsible
        WHEN pressing the enter key
        THEN the content should be visible
        AND aria-expanded is true`, async ({ page }) => {
    const { firstContent, firstTrigger } = await collapsibleSetup(page, 'hero');

    await firstTrigger.press('Enter');

    await expect(firstContent).toBeVisible();
    await expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');
  });

  test(`GIVEN an open hero collapsible
        WHEN pressing the enter key
        THEN the content should be hidden
        AND aria-expanded is false`, async ({ page }) => {
    const { firstContent, firstTrigger } = await collapsibleSetup(page, 'open');
    await firstTrigger.press('Enter');

    await expect(firstContent).toBeHidden();
    await expect(firstTrigger).toHaveAttribute('aria-expanded', 'false');
  });
});

test.describe('Aria', () => {
  test(`GIVEN a collapsible with aria-controls
        WHEN a collapsible is rendered
        THEN the trigger's aria-controls should equal the content's id`, async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'hero');
    await d.openCollapsible('Enter', 0);

    const contentId = await d.getContentAt(0).getAttribute('id');

    await expect(d.getTriggerAt(0)).toHaveAttribute('aria-controls', `${contentId}`);
  });
});

// test.describe('Reactive values', () => {
//   test(`GIVEN a collapsible with a bind:open prop
//         WHEN the signal value changes to true
//         THEN the content should be visible
//   `, async ({ page }) => {
//     const { driver: d } = await setup(page, 'programmatic');

//     // our example uses bind:checked on the checkbox with our same signal.

//     await d.locator.getByRole('checkbox').check();
//     await expect(d.getContent()).toBeVisible();
//   });

//   test(`GIVEN a collapsible with a bind:open prop
//         WHEN the signal value changes to false
//         THEN the content should be hidden
//   `, async ({ page }) => {
//     const { driver: d } = await setup(page, 'programmatic');

//     await d.locator.getByRole('checkbox').uncheck();
//     await expect(d.getContent()).toBeHidden();
//   });
// });

// test.describe('Handlers', () => {
//   test(`GIVEN a collapsible with an onOpenChange$ prop
//         WHEN the content is opened
//         THEN the handler should be called
//   `, async ({ page }) => {
//     const { driver: d } = await setup(page, 'open-change');

//     const countText = d.locator.getByRole('paragraph');
//     await expect(countText).toHaveText('count: 0');
//     await d.openCollapsible('click', 0);

//     await expect(countText).toHaveText('count: 1');
//   });

//   test(`GIVEN a collapsible with an onOpenChange$ prop
//         WHEN the content is closed
//         THEN the handler should be called
//   `, async ({ page }) => {
//     const { driver: d } = await setup(page, 'open-change');

//     const countText = d.locator.getByRole('paragraph');
//     await d.openCollapsible('click', 0);
//     await expect(countText).toHaveText('count: 1');
//     await d.getTriggerAt(0).click();

//     await expect(countText).toHaveText('count: 2');
//   });
// });

// test.describe('Disabled', () => {
//   test(`GIVEN a collapsible with a disabled prop
//         WHEN the trigger is clicked
//         THEN the content should remain closed
//   `, async ({ page }) => {
//     const { driver: d } = await setup(page, 'disabled');

//     await expect(d.getTriggerAt(0)).toBeDisabled();

//     // actionability checks are only for enabled elements
//     await d.getTriggerAt(0).click({ force: true });
//     await expect(d.getContentAt(0)).toBeHidden();
//   });
// });

// test.describe('CSR', () => {
//   test(`GIVEN a collapsible
//         WHEN it is client-side rendered
//         THEN the collapsible trigger should be visible
//   `, async ({ page }) => {
//     const { driver: d } = await setup(page, 'csr');

//     await d.locator.getByRole('button', { name: 'Render Collapsible' }).click();
//     await expect(d.getTriggerAt(0)).toBeVisible();
//   });

//   test(`GIVEN a CSR collapsible
//         WHEN the trigger is clicked
//         THEN the collapsible should be opened
// `, async ({ page }) => {
//     const { driver: d } = await setup(page, 'csr');

//     await d.locator.getByRole('button', { name: 'Render Collapsible' }).click();
//     await expect(d.getTriggerAt(0)).toBeVisible();

//     await d.getTriggerAt(0).click();
//     await expect(d.getContentAt(0)).toBeVisible();
//   });

//   test(`GIVEN an open CSR collapsible
//         WHEN the trigger is clicked
//         THEN the collapsible should be closed
// `, async ({ page }) => {
//     const { driver: d } = await setup(page, 'csr');

//     await d.locator.getByRole('button', { name: 'Render Collapsible' }).click();
//     await expect(d.getTriggerAt(0)).toBeVisible();

//     await d.openCollapsible('click', 0);
//     await d.getTriggerAt(0).click();

//     await expect(d.getContentAt(0)).toBeHidden();
//   });
// });
