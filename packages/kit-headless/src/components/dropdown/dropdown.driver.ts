// import { expect, type Locator, type Page } from '@playwright/test';

// export type DriverLocator = Locator | Page;

// export type PopoverOpenKeys = 'Enter' | 'Space';

// export function createTestDriver<T extends DriverLocator>(rootLocator: T) {
//   const getPopover = () => {
//     return rootLocator.locator('[popover]');
//   };

//   const getPopoverByTextContent = (popoverContent: string) => {
//     return rootLocator.locator('.popover-panel').getByText(popoverContent);
//   };

//   const getTrigger = () => {
//     return rootLocator.locator('[popovertarget]');
//   };

//   const openPopover = async (key: PopoverOpenKeys | 'click', index?: number) => {
//     const action = key === 'click' ? 'click' : 'press';
//     const trigger = index !== undefined ? getTrigger().nth(index) : getTrigger();

//     const popover =
//       index !== undefined
//         ? getPopoverByTextContent(`Popover ${index + 1}`)
//         : getPopover();

//     if (action === 'click') {
//       await trigger.click({ position: { x: 1, y: 1 } }); // Modified line
//     } else {
//       await trigger.press(key);
//     }

//     // Needed because Playwright doesn't wait for the listbox to be visible
//     await expect(popover).toBeVisible();

//     return { trigger, popover };
//   };

//   const getAllPopovers = () => {
//     return getPopover().all();
//   };

//   const getAllTriggers = () => {
//     return getTrigger().all();
//   };

//   const getProgrammaticButtonTrigger = () => {
//     return rootLocator.locator('button');
//   };

//   return {
//     ...rootLocator,
//     locator: rootLocator,
//     getPopover,
//     getAllPopovers,
//     getTrigger,
//     getAllTriggers,
//     openPopover,
//     getProgrammaticButtonTrigger,
//     getPopoverByTextContent,
//   };
// }
