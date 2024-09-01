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
  test(`1. GIVEN a carousel
        WHEN clicking on the next button
        THEN it should move to the next slide
        `, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.getNextButton().click();
    await expect(d.getSlideAt(1)).toHaveAttribute('data-active');
  });

  test(`2. GIVEN a carousel
        WHEN clicking on the previous button
        THEN it should move to the previous slide
  `, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // initial setup
    await d.getNextButton().click();
    await expect(d.getSlideAt(1)).toHaveAttribute('data-active');

    // testing clicking the "previous" button
    await d.getPrevButton().click();
    await expect(d.getSlideAt(0)).toHaveAttribute('data-active');
  });

  test(`3. GIVEN a carousel with dragging enabled
        WHEN using a pointer device and dragging to the left
        THEN it should move to the next slide
  `, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // Ensure the first slide is active
    const firstSlide = d.getSlideAt(0);
    await expect(firstSlide).toHaveAttribute('data-active');

    // grab first slide dimensions
    const boundingBox = await d.getSlideBoundingBoxAt(0);

    const startX = boundingBox.x + boundingBox.width * 0.8; // near right edge
    const endX = boundingBox.x + boundingBox.width * 0.2; // near left edge
    const y = boundingBox.y + boundingBox.height / 2; // swipe height

    // perform the drag action
    await firstSlide.hover({ position: { x: 5, y: 5 } });
    await page.mouse.move(startX, y);
    await page.mouse.down();
    await page.mouse.move(endX, y, { steps: 10 });
    await page.mouse.up();

    // second slide should be active
    await expect(d.getSlideAt(1)).toHaveAttribute('data-active');
  });

  test(`4. GIVEN a carousel with dragging enabled
    WHEN using a pointer device and dragging to the right
    THEN it should move to the previous slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // initial setup
    await d.getNextButton().click();
    await expect(d.getSlideAt(1)).toHaveAttribute('data-active');

    const boundingBox = await d.getSlideBoundingBoxAt(1);

    const endX = boundingBox.x + boundingBox.width * 0.9; // End closer to the right edge
    const y = 5;

    // dragging
    const slide = d.getSlideAt(1);
    await slide.hover({ position: { x: 5, y: 5 } });
    await page.mouse.down();
    await page.mouse.move(endX, y, { steps: 5 });
    await page.mouse.up();

    await expect(d.getSlideAt(0)).toHaveAttribute('data-active');
  });

  test(`5. GIVEN a carousel with a pagination control
        WHEN clicking on the pagination bullets
        THEN it should move to the corresponding slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    await d.getPaginationBullet(6).click();
    await expect(d.getSlideAt(6)).toHaveAttribute('data-active');
    await expect(d.getSlideAt(2)).not.toHaveAttribute('data-active');

    await d.getPaginationBullet(1).click();
    await expect(d.getSlideAt(1)).toHaveAttribute('data-active');
    await expect(d.getSlideAt(6)).not.toHaveAttribute('data-active');
  });
});

test.describe('Keyboard Behavior', () => {
  test(`6. GIVEN a carousel
        WHEN the enter key is pressed on the focused next button
        THEN it should move to the next slide
        `, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    await d.getNextButton().focus();
    await d.getNextButton().press('Enter');

    await expect(d.getSlideAt(1)).toHaveAttribute('data-active');

    await d.getNextButton().focus();
    await d.getNextButton().press('Enter');

    await expect(d.getSlideAt(2)).toHaveAttribute('data-active');
  });

  test(`7. GIVEN a carousel
        WHEN the enter key is pressed on the focused previous button
        THEN it should move to the previous slide
  `, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    await expect(d.getPrevButton()).toBeDisabled();
    await expect(d.getSlideAt(0)).toHaveAttribute('data-active');

    await d.getPaginationBullet(6).click();
    await expect(d.getSlideAt(6)).toHaveAttribute('data-active');

    await d.getPrevButton().press('Enter');
    await expect(d.getSlideAt(5)).toHaveAttribute('data-active');
  });

  test(`8. GIVEN a carousel with a pagination control
        WHEN the first bullet is focused and the right arrow key is pressed
        THEN focus should move to the next bullet
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    // Focus the first pagination bullet
    const firstBullet = await d.getPaginationBullet(0);
    await d.getPaginationBullet(0).focus();

    await expect(firstBullet).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('ArrowRight');

    await expect(d.getPaginationBullet(1)).toHaveAttribute('aria-selected', 'true');
  });

  test(`9. GIVEN a carousel with a pagination control
        WHEN the 2nd bullet is focused and the left arrow key is pressed
        THEN focus should move to the previous bullet
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');
    const secondBullet = d.getPaginationBullet(1);
    await secondBullet.focus();

    await expect(secondBullet).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('ArrowLeft');

    await expect(d.getPaginationBullet(0)).toHaveAttribute('aria-selected', 'true');
  });

  test(`10. GIVEN a carousel with a pagination control
    WHEN the first bullet is focused and the right arrow key is pressed
    THEN focus should move to the 2nd slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    // Focus on the first pagination bullet
    const firstBullet = d.getPaginationBullet(0);
    await firstBullet.focus();

    await page.keyboard.press('ArrowRight');
    await expect(d.getSlideAt(1)).toHaveAttribute('data-active');
  });

  test(`11. GIVEN a carousel with a pagination control
    WHEN the 2nd bullet is focused and the left arrow key is pressed
    THEN focus should move to the 1st slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    // initial
    const secondBullet = d.getPaginationBullet(1);
    await secondBullet.focus();
    await expect(d.getSlideAt(1)).toHaveAttribute('data-active');

    await page.keyboard.press('ArrowLeft');
    await expect(d.getSlideAt(0)).toHaveAttribute('data-active');
  });

  test(`12. GIVEN a carousel with a pagination control
        WHEN the 1st bullet is focused and the END key is pressed
        THEN it should move to the last slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    await d.getPaginationBullet(0).focus();

    await page.keyboard.press('End');
    const totalSlides = await d.getTotalSlides();
    await expect(d.getSlideAt(totalSlides - 1)).toHaveAttribute('data-active');
  });

  //13. WHEN the last bullet is focused and the HOME key is pressed
  test(`13. GIVEN a carousel with a pagination control
        WHEN the last bullet is focused and the HOME key is pressed
        THEN it should move to the first slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');
    const totalSlides = await d.getTotalSlides();
    const lastBullet = d.getPaginationBullet(totalSlides - 1);
    await lastBullet.focus();
    await expect(lastBullet).toHaveAttribute('aria-selected', 'true');

    await page.keyboard.press('Home');
    await expect(d.getSlideAt(0)).toHaveAttribute('data-active');
  });
});

// TODO: Mobile / Touch Behavior
// Swipe not supported in PW: https://github.com/microsoft/playwright/issues/2903
// Help question: https://discordapp.com/channels/807756831384403968/1279663419494109195/1279663419494109195
test.describe('Mobile / Touch Behavior', () => {
  test(`14. GIVEN a carousel with dragging enabled
        WHEN swiping to the left
        THEN it should move to the next slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    d;
  });

  //15. WHEN swiping to the right
  test(`15. GIVEN a carousel with dragging enabled
        WHEN swiping to the right
        THEN it should move to the previous slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    d;
  });

  //16. WHEN tapping on the pagination bullets
  test(`16. GIVEN a carousel with a pagination control
        WHEN tapping on the pagination bullets
        THEN it should move to the corresponding slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    d;
  });
});

test.describe('Accessibility', () => {
  test('17. Axe Validation Test', async ({ page }) => {
    await setup(page, 'hero');

    const initialResults = await new AxeBuilder({ page })
      .include('[data-qui-carousel]')
      .analyze();

    expect(initialResults.violations).toEqual([]);
  });

  test(`18. GIVEN a carousel
        WHEN it is rendered
        THEN it should have an accessible name
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // remove this (there so that TS doesn't complain)
    d;

    await expect(d.getRoot()).toBeVisible();
    await expect(d.getRoot()).toHaveAttribute('aria-label', 'content slideshow');
  });

  test(`19. GIVEN a carousel with a title
        WHEN it is rendered
        THEN the title should be the accessible name
        `, async ({ page }) => {
    const { driver: d } = await setup(page, 'title');

    await expect(d.getRoot()).toBeVisible();
    await expect(d.getRoot()).toHaveAttribute('aria-labelledby');
  });

  test(`20. GIVEN a carousel
        WHEN it is rendered
        THEN the carousel container should have the role of group
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await expect(d.getRoot()).toBeVisible();
    await expect(d.getRoot()).toHaveRole('group');
  });

  test(`21. GIVEN a carousel
        WHEN it is rendered
        THEN the slide should have the accessible as its index out of the total slides
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await expect(d.getRoot()).toBeVisible();

    await expect(d.getSlideAt(1)).toHaveAccessibleName('2 of 7');
    await expect(d.getSlideAt(2)).toHaveAccessibleName('3 of 7');
  });

  test(`22. GIVEN a carousel with a pagination control
        WHEN it is rendered
        THEN the parent of the slide tabs should have the role of tablist
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    // Verify the parent element has the role of 'tablist'
    await expect(d.getSlideTabsParent()).toHaveRole('tablist');
  });

  test(`23. GIVEN a carousel with a pagination control
        WHEN it is rendered
        THEN each bullet should have the role of tab
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    const bulletCount = await d.getTotalSlides();

    // Verify each bullet has the role of 'tab'
    for (let i = 0; i < bulletCount; i++) {
      const bullet = await d.getPaginationBullet(i);
      await expect(bullet).toHaveRole('tab');
    }
  });

  // it should also have aria-live polite and announce the current slide

  test(`24. GIVEN a carousel
        WHEN a slide is not the current slide
        THEN it should be inert
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');
    await expect(d.getSlideAt(0)).toHaveAttribute('data-active');
    await expect(d.getSlideAt(1)).toHaveAttribute('inert');

    await d.getNextButton().click();

    await expect(d.getSlideAt(1)).toHaveAttribute('data-active');
    await expect(d.getSlideAt(0)).toHaveAttribute('inert');
  });
});

test.describe('Looping', () => {
  // focus change happens when in two seconds a focus change did not occur
  test(`25. GIVEN a carousel with loop disabled
      WHEN navigating via keyboard to the last slide
      THEN the previous button should be focused after 2 seconds
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    const totalSlides = await d.getTotalSlides();

    for (let i = 0; i < totalSlides - 1; i++) {
      await d.getNextButton().press('Enter');
    }

    await expect(d.getSlideAt(totalSlides - 1)).toHaveAttribute('data-active');

    // if focus doesn't change in 2 seconds in next impl, then it focuses prev
    await page.waitForTimeout(2000);
    await expect(d.getPrevButton()).toBeFocused();
  });

  test(`26. GIVEN a carousel with loop disabled
      WHEN navigating via keyboard to the first slide
      THEN the next button should be focused after 2 seconds
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await d.getNextButton().press('Enter');
    await d.getPrevButton().press('Enter');

    await page.waitForTimeout(2000);
    await expect(d.getNextButton()).toBeFocused();
  });

  test(`28. GIVEN a carousel with loop disabled
        WHEN on the last slide
        THEN the next button should be disabled
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    const totalSlides = await d.getTotalSlides();

    for (let i = 0; i < totalSlides - 1; i++) {
      await d.getNextButton().click();
    }

    await expect(d.getNextButton()).toBeDisabled();
  });

  test(`29. GIVEN a carousel with loop disabled
        WHEN on the first slide
        THEN the previous button should be disabled
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await expect(d.getSlideAt(0)).toHaveAttribute('data-active');
    await expect(d.getPrevButton()).toHaveAttribute('disabled'); //
  });

  test(`30. GIVEN a carousel with loop enabled
        WHEN on the last slide and the next button is clicked
        THEN it should move to the first slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'loop');

    const totalSlides = await d.getTotalSlides();
    for (let i = 0; i < totalSlides - 1; i++) {
      await d.getNextButton().click();
    }

    const lastSlide = d.getSlideAt(totalSlides - 1);

    await expect(lastSlide).toHaveAttribute('data-active');

    await expect(d.getNextButton()).toBeVisible();
    await expect(d.getNextButton()).toBeEnabled();
    await d.getNextButton().click();

    await expect(d.getSlideAt(0)).toHaveAttribute('data-active');
  });

  test(`31. GIVEN a carousel with loop enabled
        WHEN on the first slide and the previous button is clicked
        THEN it should move to the last slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'loop');
    await expect(d.getSlideAt(0)).toHaveAttribute('data-active');
    await d.getPrevButton().click();

    const totalSlides = await d.getTotalSlides();
    await expect(d.getSlideAt(totalSlides - 1)).toHaveAttribute('data-active');
  });
});
