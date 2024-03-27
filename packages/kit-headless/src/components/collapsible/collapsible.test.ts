import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './collapsible.driver';

async function setup(page: Page, exampleName: string) {
  await page.goto(`headless/collapsible/${exampleName}`);

  const driver = createTestDriver(page);

  return {
    driver,
  };
}

test.describe('Mouse Behavior', () => {
  test(`GIVEN a hero collapsible
        WHEN clicking on the trigger
        THEN the content should be visible
        AND aria-expanded is true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.getTrigger().click();

    await expect(d.getContent()).toBeVisible();
    await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'true');
  });

  test(`GIVEN an open hero collapsible
        WHEN clicking on the trigger
        THEN the content should be hidden
        AND aria-expanded is false`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    await d.openCollapsible('click');

    await d.getTrigger().click();

    await expect(d.getContent()).toBeHidden();
    await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'false');
  });
});

test.describe('Keyboard Behavior', () => {
  test(`GIVEN a hero collapsible
        WHEN pressing the space key
        THEN the content should be visible
        AND aria-expanded is true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.getTrigger().press('Space');

    await expect(d.getContent()).toBeVisible();
    await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'true');
  });

  test(`GIVEN an open hero collapsible
        WHEN pressing the space key
        THEN the content should be hidden
        AND aria-expanded is false`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    await d.openCollapsible('Space');

    await d.getTrigger().press('Space');

    await expect(d.getContent()).toBeHidden();
    await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'false');
  });

  test(`GIVEN a hero collapsible
        WHEN pressing the enter key
        THEN the content should be visible
        AND aria-expanded is true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.getTrigger().press('Enter');

    await expect(d.getContent()).toBeVisible();
    await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'true');
  });

  test(`GIVEN an open hero collapsible
        WHEN pressing the enter key
        THEN the content should be hidden
        AND aria-expanded is false`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    await d.openCollapsible('Enter');

    await d.getTrigger().press('Enter');

    await expect(d.getContent()).toBeHidden();
    await expect(d.getTrigger()).toHaveAttribute('aria-expanded', 'false');
  });
});

test.describe('Aria', () => {
  test(`GIVEN a collapsible with aria-controls
        WHEN a collapsible is rendered
        THEN the trigger's aria-controls should equal the content's id`, async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'hero');
    await d.openCollapsible('Enter');

    const contentId = await d.getContent().getAttribute('id');

    await expect(d.getTrigger()).toHaveAttribute('aria-controls', `${contentId}`);
  });
});
