import { test, type Page, expect } from '@playwright/test';
import { createTestDriver } from './driver';
import { AxeBuilder } from '@axe-core/playwright';

async function setup(page: Page, exampleName: string) {
  await page.goto(`headless/carousel/${exampleName}`);

  const driver = createTestDriver(page);

  return {
    driver,
  };
}

test.describe('Mouse Behavior', () => {
  test(`GIVEN a carousel
        WHEN clicking on the next button
        THEN it should move to the next slide
        `, async ({ page }) => {
    /*
      example that gets used goes here. In this case it's hero from:
      apps/website/src/routes/docs/headless/carousel/examples/hero.tsx

      If you type in 'test' in the setup parameter it will look for the test.tsx file
    */
    const { driver: d } = await setup(page, 'hero');

    await d.getNextButton().click();

    // every slide might be "visible" in the case of scroller carousels. It might be easier to check if the slide has the data-active attribute.
    await expect(d.getSlideAt(1)).toBeVisible();
  });

  test(`GIVEN a carousel
        WHEN clicking on the previous button
        THEN it should move to the previous slide
  `, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // initial setup (if this gets used often we can make it a function in dthe drriver)
    await d.getNextButton().click();
    await expect(d.getSlideAt(1)).toBeVisible();

    // test previous work
  });

  test(`GIVEN a carousel with dragging enabled
        WHEN using a pointer device and dragging to the left
        THEN it should move to the next slide
  `, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });

  test(`GIVEN a carousel with dragging enabled
        WHEN using a pointer device and dragging to the right
        THEN it should move to the previous slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });

  test(`GIVEN a carousel with a pagination control
        WHEN clicking on the pagination bullets
        THEN it should move to the corresponding slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });

  test(`GIVEN a carousel with dragging enabled
        WHEN on the first slide and the mouse is moved far right
        THEN it should stay snapped on the first slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });

  test(`GIVEN a carousel with dragging enabled
        WHEN on the last slide and the mouse is moved far left
        THEN it should stay snapped on the last slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });
});

test.describe('Keyboard Behavior', () => {
  test(`GIVEN a carousel
        WHEN the enter key is pressed on the focused next button
        THEN it should move to the next slide
        `, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    await d.getNextButton().press('Enter');

    await expect(d.getSlideAt(1)).toBeVisible();
  });

  test(`GIVEN a carousel
        WHEN the enter key is pressed on the focused previous button
        THEN it should move to the previous slide
  `, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });

  test(`GIVEN a carousel with a pagination control
        WHEN the first bullet is focused and the right arrow key is pressed
        THEN focus should move to the next bullet
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });

  test(`GIVEN a carousel with a pagination control
        WHEN the 2nd bullet is focused and the left arrow key is pressed
        THEN focus should move to the previous bullet
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });

  test(`GIVEN a carousel with a pagination control
    WHEN the first bullet is focused and the right arrow key is pressed
    THEN focus should move to the 2nd slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });

  test(`GIVEN a carousel with a pagination control
    WHEN the 2nd bullet is focused and the left arrow key is pressed
    THEN it should move to the 1st slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });

  test(`GIVEN a carousel with a pagination control
        WHEN the 1st bullet is focused and the end key is pressed
        THEN it should move to the last slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });

  test(`GIVEN a carousel with a pagination control
        WHEN the last bullet is focused and the home key is pressed
        THEN it should move to the first slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });
});

test.describe('Mobile / Touch Behavior', () => {
  test(`GIVEN a carousel with dragging enabled
        WHEN swiping to the left
        THEN it should move to the next slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });

  test(`GIVEN a carousel with dragging enabled
        WHEN swiping to the right
        THEN it should move to the previous slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });

  test(`GIVEN a carousel with a pagination control
        WHEN tapping on the pagination bullets
        THEN it should move to the corresponding slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });

  test(`GIVEN a carousel with dragging enabled
        WHEN on the first slide and is mobile swiped far left
        THEN it should stay snapped on the last slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });

  test(`GIVEN a carousel with dragging enabled
        WHEN on the last slide and is mobile swiped far right
        THEN it should stay snapped on the first slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });
});

test.describe('Accessibility', () => {
  test('Axe Validation Test', async ({ page }) => {
    await setup(page, 'hero');

    const initialResults = await new AxeBuilder({ page })
      .include('[data-qui-carousel]')
      .analyze();

    expect(initialResults.violations).toEqual([]);
  });

  test(`GIVEN a carousel
        WHEN it is rendered
        THEN it should have an accessible name
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // remove this (there so that TS doesn't complain)
    d;

    await expect(d.getRoot()).toBeVisible();
    await expect(d.getRoot()).toHaveAttribute('aria-label', 'content slideshow');
  });

  test(`GIVEN a carousel with a title
        WHEN it is rendered
        THEN the carousel container should have the role of group
        AND the title should be the accessible name`, async ({ page }) => {
    const { driver: d } = await setup(page, 'title');

    await expect(d.getRoot()).toBeVisible();
    await expect(d.getRoot()).toHaveAttribute('aria-labelledby', 'Favorite Colors');
  });

  test(`GIVEN a carousel
        WHEN it is rendered
        THEN the carousel container should have the role of group
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });

  test(`GIVEN a carousel
        WHEN it is rendered
        THEN the items should have a posinset of its current index
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });

  test(`GIVEN a carousel with a pagination control
        WHEN it is rendered
        THEN the parent of the slide tabs should have the role of tablist
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });

  test(`GIVEN a carousel with a pagination control
        WHEN it is rendered
        THEN each bullet should have the role of tab
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });

  // it should also have aria-live polite and announce the current slide

  test(`GIVEN a carousel
        WHEN a slide is not the current slide
        THEN it should be inert
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });

  test(`GIVEN a carousel
        WHEN on the current slide
        THEN items inside the slide should be the only focusable items
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });

  test(`GIVEN a carousel with loop disabled
        WHEN on the last slide
        THEN the previous button should be focused
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });

  test(`GIVEN a carousel with loop disabled
        WHEN on the first slide
        THEN the next button should be focused
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });
});

test.describe('Props', () => {
  test.describe('loop', () => {
    test(`GIVEN a carousel with loop disabled
          WHEN on the last slide
          THEN the next button should be disabled
`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      // remove this (there so that TS doesn't complain)
      d;

      // TODO
    });

    test(`GIVEN a carousel with loop disabled
          WHEN on the first slide
          THEN the previous button should be disabled
`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      // remove this (there so that TS doesn't complain)
      d;

      // TODO
    });

    test(`GIVEN a carousel with loop enabled
          WHEN on the last slide and the next button is clicked
          THEN it should move to the first slide
`, async ({ page }) => {
      // JACK HASNT DONE THIS YET
      const { driver: d } = await setup(page, 'loop');

      // remove this (there so that TS doesn't complain)
      d;

      // TODO
    });

    test(`GIVEN a carousel with loop enabled
          WHEN on the first slide and the previous button is clicked
          THEN it should move to the first slide
`, async ({ page }) => {
      const { driver: d } = await setup(page, 'loop');

      // remove this (there so that TS doesn't complain)
      d;

      // TODO
    });
  });

  test(`GIVEN a carousel with a prop changing its initial index
        WHEN rendered
        THEN its scroll position should be at the initial index slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'initial');

    // remove this (there so that TS doesn't complain)
    d;

    // TODO
  });

  test.describe('reactive', () => {
    test(`GIVEN a carousel with a bind prop
          WHEN rendered
          THEN the selected slide should be at the initial index slide
`, async ({ page }) => {
      const { driver: d } = await setup(page, 'reactive');

      // remove this (there so that TS doesn't complain)
      d;

      // TODO
    });

    test(`GIVEN a carousel with a bind prop
          WHEN the signal passed to bind changes
          THEN the selected slide should be at the new signal value
`, async ({ page }) => {
      const { driver: d } = await setup(page, 'reactive');

      // remove this (there so that TS doesn't complain)
      d;

      // TODO
    });
  });
});

// TODO: finish test cases, create new ones based on the expected behavior in Figma.

// Getting a failing test when the test is expected to work helps us find bugs.

// https://www.w3.org/WAI/ARIA/apg/patterns/carousel/ <-- another good resource for what functionality is expected

/**
 *
 * When there is a use case that the default hero.tsx example doesn't cover, add a new test file in the docs headless/carousel/examples folder.
 *
 *
 */

/**
 * Future possible tests:
 * Autoplay
 *
 * Snapping between center and end of slides
 *
 * Non-scroller or "conditional" carousels
 *
 * Multiple slides per view (2-n slides at a time)
 *
 * Multiple slider per move (+n slides per navigation)
 *
 */
