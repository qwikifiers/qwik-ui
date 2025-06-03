import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { createTabsTestDriver } from './tabs.driver';

async function setup(page: Page, exampleName: string) {
  await page.goto(`/headless/tabs/${exampleName}`);

  const driver = createTabsTestDriver(page.locator('[data-qui-tabs-root]'));

  return {
    driver,
  };
}

test.describe.only('Tabs', () => {
  test('INIT', async ({ page }) => {
    const { driver: d } = await setup(page, 'first');
    await expect(d.getTabsRoot()).toBeVisible();
    const axeResults = await new AxeBuilder({ page })
      .include('[data-qui-tabs-root]')
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });

  test(`GIVEN 3 tabs
        WHEN clicking the middle one
        THEN render the middle panel`, async ({ page }) => {
    const { driver: d } = await setup(page, 'first');

    await d.getTab(1).click();
    await expect(d.getTab(0)).toHaveAttribute('aria-selected', 'false');
    await expect(d.getTab(1)).toHaveAttribute('aria-selected', 'true');
    await expect(d.getTab(2)).toHaveAttribute('aria-selected', 'false');
    await expect(d.getTabPanel()).toBeVisible();
    await expect(d.getTabPanel()).toHaveId(/_1/);
  });

  test(`GIVEN 3 tabs
      WHEN changing the selected index programmatically to the middle
      THEN render the middle panel`, async ({ page }) => {
    const { driver: d } = await setup(page, 'programmatic');

    await expect(d.getTabPanel()).toHaveId(/_0/);
    await page.getByRole('button', { name: /Select Tab 1/i }).click();
    await expect(d.getTabPanel()).toHaveId(/_1/);
  });

  test(`GIVEN 3 tabs
        WHEN clicking the middle one
        THEN onSelectedIndexChange should be called`, async ({ page }) => {
    const { driver: d } = await setup(page, 'on-selected-index-change');

    await expect(page.getByText(/Selected Index/i)).toContainText('0');
    await d.getTab(1).click();
    await expect(page.getByText(/Selected Index/i)).toContainText('1');
  });

  test(`GIVEN a tab with a custom onClick$ handler
    WHEN tab is clicked on
    THEN the handler should be called`, async ({ page }) => {
    const { driver: d } = await setup(page, 'on-click');

    await expect(d.getTab(0)).toContainText('Maria');
    await d.getTab(0).click();
    await expect(d.getTab(0)).toContainText('Jack');
  });

  test.describe('Dynamic Tabs', () => {
    test(`GIVEN 3 tabs,
          WHEN removing the last one dynamically
          THEN only 2 should remain`, async ({ page }) => {
      const { driver: d } = await setup(page, 'dynamic');

      await d.getTab(2).getByText('x').click();
      await expect(d.getAllTabs()).toHaveCount(2);
    });

    test(`GIVEN 3 tabs,
          WHEN selecting 3rd
          AND removing 1st dynamically
          AND clicking 2nd (now 1st)
          THEN the correct tab should be displayed`, async ({ page }) => {
      const { driver: d } = await setup(page, 'dynamic');

      await d.getTab(2).click();
      await expect(d.getTabPanel()).toHaveId(/_2/);

      await d.getTab(0).getByText('x').click();
      await expect(d.getAllTabs()).toHaveCount(2);

      await d.getTab(0).click();
      await expect(d.getTabPanel()).toHaveId(/_0/);
    });

    test(`GIVEN 3 tabs
          WHEN clicking on the last one and then removing it
          THEN the second tab should be shown`, async ({ page }) => {
      const { driver: d } = await setup(page, 'dynamic');

      await d.getTab(2).click();
      await expect(d.getTabPanel()).toHaveId(/_2/);

      await d.getTab(2).getByText('x').click();
      await expect(d.getTabPanel()).toHaveId(/_1/);
      await expect(d.getTabPanel()).toHaveText(/Tab 2/);
    });

    test(`GIVEN 3 tabs
          WHEN clicking on the 3rd one and then removing the 2nd
          THEN the third tab should be shown`, async ({ page }) => {
      const { driver: d } = await setup(page, 'dynamic');

      await d.getTab(2).click();
      await d.getTab(1).getByText('x').click();
      await expect(d.getTabPanel()).toHaveText(/Tab 3/);
      await expect(d.getTabPanel()).toHaveId(/_1/);
    });

    // TODO: doesn't work atm, needs to be fixed
    test.skip(`GIVEN 3 tabs
          WHEN adding 1 tab before
          the 2nd tab should remain selected
          `, async () => {
      // const { driver: d } = await setup(page, 'dynamic');
      // TODO: add logic
    });
  });

  test.describe('Manual Tab Ids', () => {
    test(`GIVEN 2 tabs with custom tab ids
          WHEN clicking on the second tab
          THEN the second panel should be displayed 
          AND the selectedTabId should match the second tab id`, async ({ page }) => {
      const { driver: d } = await setup(page, 'selected-tab-id');

      await d.getTab(1).click();
      await expect(d.getTabPanel()).toHaveId(/id-1/i);
    });
  });
  // TODO: Needs fix -> QWIK ERROR Code(3): Only primitive and object literals can be serialized [Function: HTabs] Error: Code(3): Only primitive and object literals can be serialized
  test.describe.skip('Tabs inside of tabs', () => {
    test(`GIVEN tabs inside of tabs
            WHEN clicking on the root second tab
            THEN it should show only the selected root panel`, async ({ page }) => {
      const { driver: d } = await setup(page, 'test-tabs-inside-of-tabs');

      await d.getAllTabs().nth(1).click();
      await expect(d.getTabPanel()).toBeVisible();
      await expect(d.getTabPanel()).toContainText(/Carl Joachim Andersen/i);
    });

    test(`GIVEN tabs inside of tabs
            WHEN clicking on the child second tab
            THEN it should show only the selected child panel`, async ({ page }) => {
      const { driver: d } = await setup(page, 'test-tabs-inside-of-tabs');

      await d.getAllTabs().nth(4).click(); // Click the child tab
      await expect(d.getAllTabPanels().nth(1)).toContainText('Child Panel 2');
    });
  });
});

test.describe('Orientation: Horizontal', () => {
  test.describe('RIGHT key handling', () => {
    test(`GIVEN 3 tabs and the focus is on the first,
            WHEN triggering the right arrow key
            THEN the focus should be on the next tab`, async ({ page }) => {
      const { driver: d } = await setup(page, 'first');

      await d.getTab(0).focus();
      await d.getTab(0).press('ArrowRight');
      await expect(d.getTab(1)).toBeFocused();
    });

    test(`GIVEN 3 tabs and the focus is on the last,
            WHEN triggering the right arrow key
            THEN the focus should be on the first tab`, async ({ page }) => {
      const { driver: d } = await setup(page, 'first');

      await d.getTab(2).focus();
      await d.getTab(2).press('ArrowRight');
      await expect(d.getTab(0)).toBeFocused();
    });
  });

  test.describe('LEFT key handling', () => {
    test(`GIVEN 3 tabs and the focus is on the second,
            WHEN triggering the left arrow key
            THEN the focus should be on the first tab`, async ({ page }) => {
      const { driver: d } = await setup(page, 'first');

      await d.getTab(1).focus();
      await d.getTab(1).press('ArrowLeft');
      await expect(d.getTab(0)).toBeFocused();
    });

    test(`GIVEN 3 tabs and the focus is on the first,
            WHEN triggering the left arrow key
            THEN the focus should be on the last tab`, async ({ page }) => {
      const { driver: d } = await setup(page, 'first');

      await d.getTab(0).focus();
      await d.getTab(0).press('ArrowLeft');
      await expect(d.getTab(2)).toBeFocused();
    });
  });

  test.describe('Manual behavior', () => {
    test(`GIVEN 3 tabs
            WHEN clicking the first one and triggering the right arrow key and then "enter"
            THEN the middle panel should be selected`, async ({ page }) => {
      const { driver: d } = await setup(page, 'manual');

      await d.getTab(0).click();
      await d.getTab(0).press('ArrowRight');
      await expect(d.getTabPanel()).toHaveId(/_0/);
      await d.getTab(1).press('Enter');
      await expect(d.getTabPanel()).toHaveId(/_1/);
    });
  });
});

test.describe('Orientation: Vertical', () => {
  test.describe('DOWN key handling', () => {
    test(`GIVEN 3 vertical tabs and the focus is on the first,
        WHEN triggering the down arrow key
        THEN the focus should be on the next tab`, async ({ page }) => {
      const { driver: d } = await setup(page, 'vertical');

      await d.getTab(0).focus();
      await d.getTab(0).press('ArrowDown');
      await expect(d.getTab(1)).toBeFocused();
    });

    test(`GIVEN 3 vertical tabs and the focus is on the last,
        WHEN triggering the down arrow key
        THEN the focus should be on the first tab`, async ({ page }) => {
      const { driver: d } = await setup(page, 'vertical');

      await d.getTab(2).focus();
      await d.getTab(2).press('ArrowDown');
      await expect(d.getTab(0)).toBeFocused();
    });

    test(`GIVEN 3 vertical tabs and the focus is on the first,
        WHEN triggering the right arrow key or left arrow key
        THEN the focus should stay on the first tab`, async ({ page }) => {
      const { driver: d } = await setup(page, 'vertical');

      await d.getTab(0).focus();
      await d.getTab(0).press('ArrowRight');
      await expect(d.getTab(0)).toBeFocused();

      await d.getTab(0).press('ArrowLeft');
      await expect(d.getTab(0)).toBeFocused();
    });
  });

  test.describe('UP key handling', () => {
    test(`GIVEN 3 vertical tabs and the focus is on the second,
        WHEN triggering the up arrow key
        THEN the focus should be on the first tab`, async ({ page }) => {
      const { driver: d } = await setup(page, 'vertical');

      await d.getTab(1).focus();
      await d.getTab(1).press('ArrowUp');
      await expect(d.getTab(0)).toBeFocused();
    });

    test(`GIVEN 3 vertical tabs and the focus is on the first,
        WHEN triggering the up arrow key
        THEN the focus should be on the last tab`, async ({ page }) => {
      const { driver: d } = await setup(page, 'vertical');

      await d.getTab(0).focus();
      await d.getTab(0).press('ArrowUp');
      await expect(d.getTab(2)).toBeFocused();
    });
  });
});

test.describe('Home, End, PageUp and PageDown keys handling', () => {
  test(`GIVEN 3 tabs and the focus is on the third,
      WHEN triggering the 'home' key
      THEN the focus should be on the first tab`, async ({ page }) => {
    const { driver: d } = await setup(page, 'first');

    await d.getTab(2).focus();
    await d.getTab(2).press('Home');
    await expect(d.getTab(0)).toBeFocused();
  });

  test(`GIVEN 3 vertical tabs and the focus is on the third,
      WHEN triggering the 'home' key
      THEN the focus should be on the first tab`, async ({ page }) => {
    const { driver: d } = await setup(page, 'vertical');

    await d.getTab(2).focus();
    await d.getTab(2).press('Home');
    await expect(d.getTab(0)).toBeFocused();
  });

  test(`GIVEN 3 tabs and the focus is on the third,
      WHEN triggering the 'pageUp' key
      THEN the focus should be on the first tab`, async ({ page }) => {
    const { driver: d } = await setup(page, 'first');

    await d.getTab(2).focus();
    await d.getTab(2).press('PageUp');
    await expect(d.getTab(0)).toBeFocused();
  });

  test(`GIVEN 3 tabs and the focus is on the first,
      WHEN triggering the 'end' key
      THEN the focus should be on the last tab`, async ({ page }) => {
    const { driver: d } = await setup(page, 'first');

    await d.getTab(0).focus();
    await d.getTab(0).press('End');
    await expect(d.getTab(2)).toBeFocused();
  });

  test(`GIVEN 3 tabs on a long page and the focus is on the third,
    WHEN triggering the 'pageDown' key
    THEN the focus should be on the last tab and the page should not scroll`, async ({
    page,
  }) => {
    const { driver: d } = await setup(page, 'first');

    await d.getTab(0).focus();
    await d.getTab(0).press('PageDown');
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBe(0);
  });

  test(`GIVEN 3 tabs and the focus is on the first,
      WHEN triggering the 'pageDown' key
      THEN the focus should be on the last tab`, async ({ page }) => {
    const { driver: d } = await setup(page, 'first');

    await d.getTab(0).focus();
    await d.getTab(0).press('PageDown');
    await expect(d.getTab(2)).toBeFocused();
  });
});

test.describe('Disabled tabs', () => {
  test(`GIVEN 4 tabs and the first one is disabled
      WHEN loading the component
      THEN the selected tab be the second`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    await expect(d.getTab(0)).toBeDisabled();
    await expect(d.getTabPanel()).toHaveId(/_1/);
  });

  // TODO: ask jack -> what is the purpose of this test? how can we have 4 tabs and 3-5 disabled 😅?
  test.skip(`GIVEN 4 tabs with tab 3 selected and tabs 3-5 are disabled
      WHEN loading the component
      THEN the selected tab should be the second tab`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    await expect(d.getTabPanel()).toContainText('Panel 2');
    await expect(d.getTab(2)).toBeDisabled();
    await expect(d.getTab(3)).toBeDisabled();
    await expect(d.getTab(4)).toBeDisabled();
  });

  // skipping short version for now
  test.skip(`GIVEN 4 tabs written with the short version and the middle TabPanel has a disabled prop
      WHEN focusing on first component and hitting the right key
      THEN the selected tab should be the third one`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    await d.getTab(0).focus();
    await d.getTab(0).press('ArrowRight');
    await expect(d.getTab(2)).toBeFocused();
  });

  // TODO: requires playwright component testing or a separete test-example file
  test.skip(`GIVEN 4 disabled tabs
      WHEN loading the component
      THEN no panel or tab should be selected`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    await expect(d.getTabPanel()).not.toBeVisible();
  });

  test(`GIVEN 4 horizontal tabs and the first and third tabs are disabled and focus is on the second,
      WHEN triggering the right arrow key
      THEN the focus should be on the fourth tab`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    await d.getTab(1).focus();
    await d.getTab(1).press('ArrowRight');
    await expect(d.getTab(3)).toBeFocused();
  });

  test(`GIVEN 4 horizontal tabs with the first one disabled and last one is focused
      WHEN triggering the right arrow key
      THEN the focus should be on the second tab`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    await d.getTab(3).focus();
    await d.getTab(3).press('ArrowRight');
    await expect(d.getTab(1)).toBeFocused();
  });

  test(`GIVEN 4 tabs and the first and third are disabled and the focus is on the second,
      WHEN triggering the 'end' key
      THEN the focus should be on the fourth tab`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    await d.getTab(1).focus();
    await d.getTab(1).press('End');
    await expect(d.getTab(3)).toBeFocused();
  });

  test(`GIVEN 4 tabs and the first is disabled and the focus is on the fourth,
      WHEN triggering the 'home' key
      THEN the focus should be on the second tab`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    await d.getTab(3).focus();
    await d.getTab(3).press('Home');
    await expect(d.getTab(1)).toBeFocused();
  });

  test(`GIVEN 4 tabs and the first and thrid are disabled and the focus is on the second,
      WHEN triggering the right arrow key
      THEN the focus should be on the fourth tab`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    await d.getTab(1).focus();
    await d.getTab(1).press('ArrowRight');
    await expect(d.getTab(3)).toBeFocused();
  });

  // TODO: should this be the case? If so, it doesn't work.
  test.skip(`GIVEN 4 tabs and the first and third are disabled and the focus is on the second,
      WHEN triggering the down arrow key
      THEN the focus should be on the fourth tab`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    await d.getTab(1).focus();
    await d.getTab(1).press('ArrowDown');
    await expect(d.getTab(3)).toBeFocused();
  });

  test(`GIVEN 4 tabs and the first and third are disabled and the focus is on the fourth,
      WHEN triggering the left arrow key
      THEN the focus should be on the second tab`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    await d.getTab(3).focus();
    await d.getTab(3).press('ArrowLeft');
    await expect(d.getTab(1)).toBeFocused();
  });

  // TODO: requires playwright component testing or a separete test-example file
  test.skip(`GIVEN 3 vertical tabs and the second is disabled and the focus is on the first,
      WHEN triggering the down arrow key
      THEN the focus should be on the third tab`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    await d.getTab(0).focus();
    await d.getTab(0).press('ArrowDown');
    await expect(d.getTab(2)).toBeFocused();
  });

  // TODO: requires playwright component testing or a separete test-example file
  test.skip(`GIVEN 3 vertical tabs and the second is disabled and the focus is on the third,
      WHEN triggering the up arrow key
      THEN the focus should be on the first tab`, async ({ page }) => {
    const { driver: d } = await setup(page, 'disabled');

    await d.getTab(2).focus();
    await d.getTab(2).press('ArrowUp');
    await expect(d.getTab(0)).toBeFocused();
  });
});

test.describe.skip('User-defined reusable TabList/Tab/TabPanel components', () => {
  test(`GIVEN a user-defined TabList to Tabs
      WHEN clicking the middle Tab
      THEN render the middle panel`, async ({ page }) => {
    const { driver: d } = await setup(page, 'reusable');

    await expect(d.getAllTabs()).toHaveCount(3);

    await expect(d.getTabPanel()).toContainText('Panel 1');
    await d.getTab(1).click();
    await expect(d.getTabPanel()).toContainText('Panel 2');
    await expect(d.getTabList()).toBeVisible();
  });
});
