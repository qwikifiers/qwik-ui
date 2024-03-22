import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { createTestDriver } from './checkbox.driver';

async function setup(page: Page, exampleName: string) {
  await page.goto(`/headless/checkbox/${exampleName}`);

  const driver = createTestDriver(page.getByRole('combobox'));

  const { getRoot } = driver;

  return {
    driver,
    getRoot,
  };
}
