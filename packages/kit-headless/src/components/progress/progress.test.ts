import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './progress.driver';

async function setup(page: Page, exampleName: string) {
  await page.goto(`/headless/progress/${exampleName}`);

  const driver = createTestDriver(page.getByRole('progressbar'));
  const { getRoot, getProgressState, getProgressValue, getProgressIndicator } = driver;

  return { driver, getRoot, getProgressState, getProgressValue, getProgressIndicator };
}

test.describe('Critical functionality', () => {
  test(`GIVEN a progress
        WHEN the progress is rendered
        THEN it should have root and indicator`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await expect(d.getRoot()).toBeVisible();
    await expect(d.getProgressIndicator()).toBeVisible();
  });

  test(`GIVEN a progress
        WHEN progress is not completed
        THEN it should have progress state loading`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await expect(d.getProgressIndicator()).toBeVisible();
    expect(await d.getProgressState()).toBe('loading');
    expect(await d.getProgressValue()).toBe('30');
  });

  test(`GIVEN a progress
        WHEN progress is null
        THEN it should have progress state indeterminate`, async ({ page }) => {
    const { driver: d } = await setup(page, 'indeterminate');

    await expect(d.getProgressIndicator()).toBeVisible();
    expect(await d.getProgressState()).toBe('indeterminate');
  });

  test(`GIVEN a progress
        WHEN progress is 100%
        THEN it should have progress state complete`, async ({ page }) => {
    const { driver: d } = await setup(page, 'complete');

    await expect(d.getProgressIndicator()).toBeVisible();
    expect(await d.getProgressState()).toBe('complete');
  });
});

test.describe('State', () => {
  test(`GIVEN a progress
        WHEN the value is 30
        THEN it should be 30% complete`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await expect(d.getRoot()).toBeVisible();
    await expect(d.getRoot()).toHaveAttribute('aria-valuetext', '30%');
  });

  test(`GIVEN a progress
        WHEN the value is 20 and the max is 25
        THEN it should be 80% complete`, async ({ page }) => {
    const { driver: d } = await setup(page, 'max');

    await expect(d.getRoot()).toBeVisible();
    await expect(d.getRoot()).toHaveAttribute('aria-valuetext', '80%');
  });

  test(`GIVEN a progress with the value of 5000
        WHEN the min is 2000 and the max is 10000
        THEN it should be 38% complete`, async ({ page }) => {
    const { driver: d } = await setup(page, 'min');

    await expect(d.getRoot()).toBeVisible();
    await expect(d.getRoot()).toHaveAttribute('aria-valuetext', '38%');
  });

  test(`GIVEN a progress with the value of 30
        WHEN the value is reactively changed to 70
        THEN it should be 70% complete`, async ({ page }) => {
    const { driver: d } = await setup(page, 'reactive');

    await expect(d.getRoot()).toHaveAttribute('aria-valuetext', '30%');

    await page.locator('button').click();

    await expect(d.getRoot()).toBeVisible();
    await expect(d.getRoot()).toHaveAttribute('aria-valuetext', '70%');
  });
});

test.describe('A11y', () => {
  test(`GIVEN a progress
        WHEN the progress is rendered
        THEN it should have aria-valuemin attribute`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    await expect(d.getRoot()).toHaveAttribute('aria-valuemin', '0');
  });

  test(`GIVEN a progress
        WHEN the progress is rendered
        THEN it should have aria-valuemax attribute`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    await expect(d.getRoot()).toHaveAttribute('aria-valuemax', '100');
  });

  test(`GIVEN a progress
        WHEN the progress is rendered
        THEN it should have aria-valuenow attribute`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    await expect(d.getRoot()).toHaveAttribute('aria-valuenow', '30');
  });

  test(`GIVEN a progress
        WHEN the progress is rendered
        THEN it should have aria-valuetext attribute`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    await expect(d.getRoot()).toHaveAttribute('aria-valuetext', '30%');
  });
});
