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
