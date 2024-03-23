import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './checkbox.driver';
import { renderToStream } from '@builder.io/qwik/server';

async function setup(page: Page, exampleName: string) {
  await page.goto(`/headless/checkbox/${exampleName}`);

  const driver = createTestDriver(page.getByRole('checkbox'));

  const { getRoot } = driver;

  return {
    driver,
    getRoot,
  };
}

test.describe.only('initial render', () => {
  test(`GIVEN a checkbox with a user sig value of true
        WHEN the checkbox renders
        It should have the value of true`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    console.log('hell');
    await expect(d.getRoot()).toBeVisible();
  });
});
