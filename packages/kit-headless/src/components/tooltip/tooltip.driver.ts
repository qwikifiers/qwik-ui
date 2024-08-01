import { expect, type Locator, type Page } from '@playwright/test';

export type DriverLocator = Locator | Page;

export type TooltipOpenKeys = 'Enter' | 'Space';

export function createTooltipDriver<T extends DriverLocator>(rootLocator: T) {
  const getTooltip = () => {
    return rootLocator.locator('[role="tooltip"]');
  };

  const getTooltipByTextContent = (tooltipContent: string) => {
    return rootLocator.locator('.tooltip-panel').getByText(tooltipContent);
  };

  const getTrigger = () => {
    return rootLocator.locator('[aria-describedby]');
  };

  const openTooltip = async (
    key: TooltipOpenKeys | 'hover' | 'click',
    index?: number,
  ) => {
    const action = key === 'click' ? 'click' : key === 'hover' ? 'hover' : 'press';
    const trigger = index !== undefined ? getTrigger().nth(index) : getTrigger();

    const tooltip =
      index !== undefined
        ? getTooltipByTextContent(`Tooltip ${index + 1}`)
        : getTooltip();

    if (action === 'click') {
      await trigger.click({ position: { x: 1, y: 1 } });
    } else if (action === 'hover') {
      await trigger.hover();
    } else {
      await trigger.press(key);
    }

    // Needed because Playwright doesn't wait for the tooltip to be visible
    await expect(tooltip).toBeVisible();

    return { trigger, tooltip };
  };

  const getAllTooltips = () => {
    return getTooltip().all();
  };

  const getAllTriggers = () => {
    return getTrigger().all();
  };

  const getOnChangeVerificationText = (state: 'open' | 'closed') => {
    return rootLocator.getByText(`The tooltip is ${state}`);
  };

  const getProgrammaticButtonTrigger = () => {
    return rootLocator.locator('button');
  };

  return {
    ...rootLocator,
    locator: rootLocator,
    getTooltip,
    getAllTooltips,
    getTrigger,
    getAllTriggers,
    openTooltip,
    getProgrammaticButtonTrigger,
    getTooltipByTextContent,
    getOnChangeVerificationText,
  };
}
