import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './collapsible.driver';
async function setup(page: Page, selector: string) {
  await page.goto('/docs/headless/collapsible');

  const driver = createTestDriver(page.getByTestId(selector));

  const { getRoot, getTrigger, getContent, openCollapsible } = driver;

  return {
    driver,
    getRoot,
    getTrigger,
    getContent,
    openCollapsible,
  };
}

test.describe('Mouse Behavior', () => {
  test(`GIVEN a hero collapsible
        WHEN clicking on the trigger
        THEN the content should be visible
        AND aria-expanded is true`, async ({ page }) => {
    const { getTrigger, getContent } = await setup(page, 'collapsible-hero-test');

    await getTrigger().click();

    await expect(getContent()).toBeVisible();
    await expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
  });

  test(`GIVEN an open hero collapsible
        WHEN clicking on the trigger
        THEN the content should be hidden
        AND aria-expanded is false`, async ({ page }) => {
    const { getTrigger, getContent, openCollapsible } = await setup(
      page,
      'collapsible-hero-test',
    );
    await openCollapsible('click');

    await getTrigger().click();

    await expect(getContent()).toBeHidden();
    await expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
  });
});

test.describe('Keyboard Behavior', () => {
  test(`GIVEN a hero collapsible
        WHEN pressing the space key
        THEN the content should be visible
        AND aria-expanded is true`, async ({ page }) => {
    const { getTrigger, getContent } = await setup(page, 'collapsible-hero-test');

    await getTrigger().press('Space');

    await expect(getContent()).toBeVisible();
    await expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
  });

  test(`GIVEN an open hero collapsible
        WHEN pressing the space key
        THEN the content should be hidden
        AND aria-expanded is false`, async ({ page }) => {
    const { getTrigger, getContent, openCollapsible } = await setup(
      page,
      'collapsible-hero-test',
    );
    await openCollapsible('Space');

    await getTrigger().press('Space');

    await expect(getContent()).toBeHidden();
    await expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
  });

  test(`GIVEN a hero collapsible
        WHEN pressing the enter key
        THEN the content should be visible
        AND aria-expanded is true`, async ({ page }) => {
    const { getTrigger, getContent } = await setup(page, 'collapsible-hero-test');

    await getTrigger().press('Enter');

    await expect(getContent()).toBeVisible();
    await expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
  });

  test(`GIVEN an open hero collapsible
        WHEN pressing the enter key
        THEN the content should be hidden
        AND aria-expanded is false`, async ({ page }) => {
    const { getTrigger, getContent, openCollapsible } = await setup(
      page,
      'collapsible-hero-test',
    );
    await openCollapsible('Enter');

    await getTrigger().press('Enter');

    await expect(getContent()).toBeHidden();
    await expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
  });
});

test.describe('Aria', () => {
  test(`GIVEN a collapsible with aria-controls
        WHEN a collapsible is rendered
        THEN the trigger's aria-controls should equal the content's id`, async ({
    page,
  }) => {
    const { getTrigger, getContent, openCollapsible } = await setup(
      page,
      'collapsible-hero-test',
    );
    await openCollapsible('Enter');

    const contentId = await getContent().getAttribute('id');

    await expect(getTrigger()).toHaveAttribute('aria-controls', `${contentId}`);
  });
});
