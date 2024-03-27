import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './progress.driver';

async function setup(page: Page, exampleName: string) {
  await page.goto(`/headless/progress/${exampleName}`);

  const driver = createTestDriver(page.getByRole('progressbar'));
  const { getRoot, getProgressState, getProgressValue, getProgressIndicator } = driver;

  return { driver, getRoot, getProgressState, getProgressValue, getProgressIndicator };
}

test.describe('Progress Bar usaged', () => {
  test(`should have root and indicator`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await expect(d.getRoot()).toBeVisible();
    await expect(d.getProgressIndicator()).toBeVisible();
  });

  test(`should have progress state loading if is not completed`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    expect(d.getProgressIndicator()).toBeVisible();
    expect(await d.getProgressState()).toBe('loading');
    expect(await d.getProgressValue()).toBe('30');
  });

  test(`should have aria attributes`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    await expect(d.getRoot()).toHaveAttribute('aria-valuemin', '0');
    await expect(d.getRoot()).toHaveAttribute('aria-valuemax', '100');
    await expect(d.getRoot()).toHaveAttribute('aria-valuenow', '30');
    await expect(d.getRoot()).toHaveAttribute('aria-valuetext', '30%');
  });
});
