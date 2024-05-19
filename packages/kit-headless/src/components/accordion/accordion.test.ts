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
  test(`GIVEN a collapsible in an accordion
        WHEN clicking on the trigger
        THEN the content should be visible
        AND aria-expanded is true`, async ({ page }) => {
    const { firstContent, firstTrigger } = await collapsibleSetup(page, 'hero');

    await firstTrigger.click();

    await expect(firstContent).toBeVisible();
    await expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');
  });

  test(`GIVEN an open collapsible in an accordion
        WHEN clicking on the trigger
        THEN the content should be hidden
        AND aria-expanded is false`, async ({ page }) => {
    const { firstContent, firstTrigger, d } = await collapsibleSetup(page, 'hero');

    await d.openCollapsible('click', 0);
    await expect(firstContent).toBeVisible();

    await firstTrigger.click();

    await expect(firstContent).toBeHidden();
    await expect(firstTrigger).toHaveAttribute('aria-expanded', 'false');
  });
});

test.describe('Keyboard Behavior', () => {
  test(`GIVEN a collapsible in an accordion
        WHEN pressing the space key
        THEN the content should be visible
        AND aria-expanded is true`, async ({ page }) => {
    const { firstContent, firstTrigger } = await collapsibleSetup(page, 'hero');

    await firstTrigger.press('Space');

    await expect(firstContent).toBeVisible();
    await expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');
  });

  test(`GIVEN an open collapsible in an accordion
        WHEN pressing the space key
        THEN the content should be hidden
        AND aria-expanded is false`, async ({ page }) => {
    const { firstContent, firstTrigger, d } = await collapsibleSetup(page, 'hero');
    await d.openCollapsible('Space', 0);
    await firstTrigger.press('Space');

    await expect(firstContent).toBeHidden();
    await expect(firstTrigger).toHaveAttribute('aria-expanded', 'false');
  });

  test(`GIVEN a collapsible in an accordion
        WHEN pressing the enter key
        THEN the content should be visible
        AND aria-expanded is true`, async ({ page }) => {
    const { firstContent, firstTrigger } = await collapsibleSetup(page, 'hero');

    await firstTrigger.press('Enter');

    await expect(firstContent).toBeVisible();
    await expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');
  });

  test(`GIVEN an open collapsible in an accordion
        WHEN pressing the enter key
        THEN the content should be hidden
        AND aria-expanded is false`, async ({ page }) => {
    const { firstContent, firstTrigger, d } = await collapsibleSetup(page, 'hero');
    await d.openCollapsible('Enter', 0);
    await firstTrigger.press('Enter');

    await expect(firstContent).toBeHidden();
    await expect(firstTrigger).toHaveAttribute('aria-expanded', 'false');
  });
});

test.describe('Aria', () => {
  test(`GIVEN a collapsible in an accordion with aria-controls
        WHEN a collapsible is rendered
        THEN the trigger's aria-controls should equal the content's id`, async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'hero');
    await d.openCollapsible('Enter', 0);

    const contentId = await d.getContentAt(0).getAttribute('id');

    await expect(d.getTriggerAt(0)).toHaveAttribute('aria-controls', `${contentId}`);
  });

  test(`GIVEN an item in an accordion
        WHEN an item is rendered
        THEN the item should have a role of region (not the collapsible itself)`, async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'hero');
    await d.openCollapsible('Enter', 0);

    await expect(d.getContentAt(0)).toHaveAttribute('role', 'region');
  });
});

test.describe('Multiple Accordion', () => {
  test(`GIVEN an Accordion with multiple collapsibles
        WHEN the first and second collapsibles are opened
        THEN both items should be visible
    `, async ({ page }) => {
    const { driver: d } = await setup(page, 'multiple');

    await d.openCollapsible('click', 0);
    await d.openCollapsible('click', 1);

    await expect(d.getContentAt(0)).toBeVisible();
    await expect(d.getContentAt(1)).toBeVisible();
  });
});

test.describe('Initial values', () => {
  test(`GIVEN an Accordion with a value prop
  WHEN the value data matches opening the second item
  THEN the second collapsible content should be open on initial load
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'initial');

    await expect(d.getContentAt(1)).toBeVisible();
  });
});

test.describe('Reactive values', () => {
  test(`GIVEN an Accordion with a bind:value prop
        WHEN selecting the third item
        THEN the bind:value signal should update to the third item
  `, async ({ page }) => {
    const { driver: d } = await setup(page, 'reactive');

    await expect(page.getByRole('paragraph')).toHaveText(
      'Current open item: Not selected',
    );

    await d.getTriggerAt(2).click();

    await expect(page.getByRole('paragraph')).toHaveText('Current open item: item-3');
  });

  test(`GIVEN an Accordion with a bind:value prop
        WHEN selecting the third item
        THEN updating the bind:value signal to the first item
        THEN selecting the third item
        THEN only the third item should be open
  `, async ({ page }) => {
    const { driver: d } = await setup(page, 'programmatic');

    // this tests whether the bind:value signal is in sync with the selected index
    await d.getTriggerAt(2).click();
    await expect(d.getContentAt(2)).toBeVisible();

    await page.getByRole('button', { name: 'Toggle first item' }).click();

    await expect(d.getContentAt(0)).toBeVisible();
    await expect(d.getContentAt(0)).toBeVisible();

    await d.getTriggerAt(2).click();
    await expect(d.getContentAt(2)).toBeVisible();
    await expect(d.getContentAt(0)).toBeHidden();
  });

  test(`GIVEN an Accordion with a bind:value prop
        WHEN the signal data matches opening the first item
        THEN the first collapsible content should be visible
  `, async ({ page }) => {
    const { driver: d } = await setup(page, 'programmatic');

    await d.locator.getByRole('button', { name: 'Toggle first item' }).click();

    await expect(d.getContentAt(0)).toBeVisible();
  });

  test(`GIVEN an open Accordion with a bind:value prop
        WHEN the signal changes to null
        THEN the first item content should be collapsed
  `, async ({ page }) => {
    const { driver: d } = await setup(page, 'programmatic');

    await d.locator.getByRole('button', { name: 'Toggle first item' }).click();

    await expect(d.getContentAt(0)).toBeVisible();

    await d.locator.getByRole('button', { name: 'Toggle first item' }).click();

    await expect(d.getContentAt(0)).toBeHidden();
  });
});

test.describe('Handlers', () => {
  test(`GIVEN a collapsible with an onChange$ prop
        WHEN the content is opened
        THEN the handler should be called
  `, async ({ page }) => {
    const { driver: d } = await setup(page, 'on-change');

    const countText = d.locator.getByRole('paragraph').first();
    await expect(countText).toHaveText('Called change count: 0');
    await d.openCollapsible('click', 0);

    await expect(countText).toHaveText('Called change count: 1');
  });

  test(`GIVEN a collapsible with an onChange$ prop
        WHEN selecting the third item
        THEN the value from the handler should be the latest selected value
  `, async ({ page }) => {
    const { driver: d } = await setup(page, 'on-change');

    const countText = d.locator.getByRole('paragraph').last();
    await d.openCollapsible('click', 2);
    await expect(countText).toHaveText('Changed to: item-3');
  });
});

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
