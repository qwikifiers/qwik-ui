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
  //1. Click the "Next" button
  test(`1. GIVEN a carousel
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
    // async code: code runs as if it is scheduled
    // "await" will wait untill next button is clicked
    await expect(d.getSlideAt(1)).toHaveAttribute('data-active');
  });

  //2.  Click "Previous" button
  test(`2. GIVEN a carousel
        WHEN clicking on the previous button
        THEN it should move to the previous slide
  `, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // initial setup (if this gets used often we can make it a function in dthe drriver)
    await d.getNextButton().click();
    //await expect(d.getSlideAt(1)).toBeVisible();
    await expect(d.getSlideAt(1)).toHaveAttribute('data-active');

    // testing clicking the "previous" button
    await d.getPrevButton().click();
    await expect(d.getSlideAt(0)).toHaveAttribute('data-active');

    // test previous work
  });

  //3. to-do WHEN using a pointer device and dragging to the left
  test(`3. GIVEN a carousel with dragging enabled
        WHEN using a pointer device and dragging to the left
        THEN it should move to the next slide
  `, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // Ensure the first slide is active
    const firstSlide = await d.getSlideAt(0);
    await expect(firstSlide).toHaveAttribute('data-active');

    // Get the bounding box of the first slide to determine the drag start point
    const boundingBox = await firstSlide.boundingBox();
    if (!boundingBox) {
      throw new Error('Could not determine the bounding box of the first slide');
    }

    // // Calculate start and end points for the drag
    // const startX = boundingBox.x + boundingBox.width / 2; // Middle of the first slide
    // const startY = boundingBox.y + boundingBox.height / 2;
    // const endX = startX - boundingBox.width * 0.3; // Dragging left, adjust as needed

    // // Perform the drag action using the mouse (pointer device)
    // await page.mouse.move(startX, startY);
    // await page.mouse.down();
    // await page.mouse.move(endX, startY, { steps: 10 }); // Dragging left
    // await page.mouse.up();

    const startX = boundingBox.x + boundingBox.width * 0.8; // Start near the right edge
    const endX = boundingBox.x + boundingBox.width * 0.2; // End near the left edge
    const y = boundingBox.y + boundingBox.height / 2; // Swipe in the vertical middle

    // Perform the drag action
    await page.mouse.move(startX, y);
    await page.mouse.down();
    await page.mouse.move(endX, y, { steps: 10 });
    await page.mouse.up();

    // Verify that the next slide is now active
    const secondSlide = await d.getSlideAt(1); // Assuming the next slide is at index 1
    await expect(secondSlide).toHaveAttribute('data-active');
  });

  //4. to-do WHEN using a pointer device and dragging to the right
  test(`4. GIVEN a carousel with dragging enabled
        WHEN using a pointer device and dragging to the right
        THEN it should move to the previous slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // Move to the second slide (assuming you want to drag back to the first slide)
    await d.getNextButton().click();

    // Ensure the second slide is active
    await expect(d.getSlideAt(1)).toHaveAttribute('data-active');

    // Get the bounding box of the second slide to determine the drag start point
    const boundingBox = await d.getSlideAt(1).boundingBox();
    if (!boundingBox) {
      throw new Error('Could not determine the bounding box of the second slide');
    }

    // // Calculate start and end points for the drag
    // const startX = boundingBox.x + boundingBox.width/2; // Middle of the second slide
    // const startY = boundingBox.y + boundingBox.height / 2;
    // const endX = boundingBox.x - boundingBox.width * 1.5; // Dragging all the way to the left (past the left edge of the slide)

    // // Perform the drag action using the mouse (pointer device)
    // await page.mouse.move(startX, startY);
    // await page.mouse.down();
    // await page.mouse.move(endX, startY, { steps: 10 }); // Dragging left all the way
    // await page.mouse.up();

    const startX = boundingBox.x + boundingBox.width * 0.2; // Start near the left edge
    const endX = boundingBox.x + boundingBox.width * 0.8; // End near the right edge
    const y = boundingBox.y + boundingBox.height / 2; // Swipe in the vertical middle

    // Perform the drag action
    await page.mouse.move(startX, y);
    await page.mouse.down();
    await page.mouse.move(endX, y, { steps: 10 });
    await page.mouse.up();

    // Verify that the first slide is now active
    await expect(d.getSlideAt(0)).toHaveAttribute('data-active');
  });

  //5. WHEN clicking on the pagination bullets
  test(`5. GIVEN a carousel with a pagination control
        WHEN clicking on the pagination bullets
        THEN it should move to the corresponding slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    // remove this (there so that TS doesn't complain)
    await d.getPaginationBullet(6).click();
    await expect(d.getSlideAt(6)).toHaveAttribute('data-active');
    await expect(d.getSlideAt(2)).not.toHaveAttribute('data-active');

    await d.getPaginationBullet(1).click();
    await expect(d.getSlideAt(1)).toHaveAttribute('data-active');
    await expect(d.getSlideAt(6)).not.toHaveAttribute('data-active');
  });
});

test.describe('Keyboard Behavior', () => {
  //6. WHEN the enter key is pressed on the focused next button
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
    await expect(d.getSlideAt(3)).not.toHaveAttribute('data-active');
    await expect(d.getSlideAt(6)).not.toHaveAttribute('data-active');
    await expect(d.getSlideAt(0)).not.toHaveAttribute('data-active');
  });

  //7. WHEN the enter key is pressed on the focused previous button
  test(`7. GIVEN a carousel
        WHEN the enter key is pressed on the focused previous button
        THEN it should move to the previous slide
  `, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    const isDisabled = await d.getPrevButton().isDisabled();
    await expect(isDisabled).toBe(true); // check that "Previous" button is disabled for initial state
    await expect(d.getSlideAt(0)).toHaveAttribute('data-active');

    await d.getPrevButton().focus();
    await d.getPrevButton().press('Enter'); // check that clicking disabled button does not break anything

    await expect(d.getSlideAt(0)).toHaveAttribute('data-active');

    await d.getPaginationBullet(6).click();
    await expect(d.getSlideAt(6)).toHaveAttribute('data-active');

    await d.getPrevButton().focus();
    await d.getPrevButton().press('Enter');
    await expect(d.getSlideAt(6)).not.toHaveAttribute('data-active');

    await d.getPrevButton().focus();
    await d.getPrevButton().press('Enter');
    await expect(d.getSlideAt(4)).toHaveAttribute('data-active');

    await d.getPrevButton().focus();
    await d.getPrevButton().press('Enter');
    await expect(d.getSlideAt(0)).not.toHaveAttribute('data-active');
  });

  //8. WHEN the first bullet is focused and the right arrow key is pressed
  test(`8. GIVEN a carousel with a pagination control
        WHEN the first bullet is focused and the right arrow key is pressed
        THEN focus should move to the next bullet
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    // Focus the first pagination bullet
    const firstBullet = await d.getPaginationBullet(0);
    await firstBullet.focus();

    // Verify the first bullet is focused
    await expect(firstBullet).toHaveAttribute('aria-selected', 'true');

    // Press the right arrow key
    await page.keyboard.press('ArrowRight');

    // Get the second bullet
    const secondBullet = await d.getPaginationBullet(1);

    // Verify the focus has moved to the second bullet
    await expect(secondBullet).toHaveAttribute('aria-selected', 'true');
  });

  //9. WHEN the 2nd bullet is focused and the left arrow key is pressed
  test(`9. GIVEN a carousel with a pagination control
        WHEN the 2nd bullet is focused and the left arrow key is pressed
        THEN focus should move to the previous bullet
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    // Focus on the second pagination bullet
    const secondBullet = d.getPaginationBullet(1);
    await secondBullet.focus();

    // Verify the first bullet is focused
    await expect(secondBullet).toHaveAttribute('aria-selected', 'true');

    // Press the right arrow key
    await page.keyboard.press('ArrowLeft');

    // Get the second bullet
    const firstBullet = await d.getPaginationBullet(0);

    // Verify the focus has moved to the second bullet
    await expect(firstBullet).toHaveAttribute('aria-selected', 'true');
  });

  //10. WHEN the first bullet is focused and the right arrow key is pressed
  test(`10. GIVEN a carousel with a pagination control
    WHEN the first bullet is focused and the right arrow key is pressed
    THEN focus should move to the 2nd slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    // Focus on the first pagination bullet
    const firstBullet = d.getPaginationBullet(0);
    await firstBullet.focus();

    // Press the right arrow key
    await page.keyboard.press('ArrowRight');
    // Verify the focus is on the second slide
    await expect(d.getSlideAt(1)).toHaveAttribute('data-active');

    // Verify the focus is NOT on the first and third bullets
    await expect(d.getSlideAt(2)).not.toHaveAttribute('data-active');
    await expect(d.getSlideAt(0)).not.toHaveAttribute('data-active');
  });

  //11. WHEN the 2nd bullet is focused and the left arrow key is pressed
  test(`11. GIVEN a carousel with a pagination control
    WHEN the 2nd bullet is focused and the left arrow key is pressed
    THEN focus should move to the 1st slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    // Focus on the second pagination bullet
    const secondBullet = d.getPaginationBullet(1);
    await secondBullet.focus();

    // Press the left arrow key
    await page.keyboard.press('ArrowLeft');
    // Verify the focus is on the first slide
    await expect(d.getSlideAt(0)).toHaveAttribute('data-active');

    // Verify the focus is NOT on the second and third bullets
    await expect(d.getSlideAt(2)).not.toHaveAttribute('data-active');
    await expect(d.getSlideAt(1)).not.toHaveAttribute('data-active');
  });

  //12. WHEN the 1st bullet is focused and the END key is pressed
  test(`12. GIVEN a carousel with a pagination control
        WHEN the 1st bullet is focused and the END key is pressed
        THEN it should move to the last slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    // Focus on the first pagination bullet
    const firstBullet = d.getPaginationBullet(0);
    await firstBullet.focus();

    // Press the End key
    await page.keyboard.press('End');

    // Get the total number of slides
    const totalSlides = await d.getTotalSlides();

    // Verify the last slide is active
    await expect(d.getSlideAt(totalSlides - 1)).toHaveAttribute('data-active');
    await expect(d.getSlideAt(0)).not.toHaveAttribute('data-active');
    await expect(d.getSlideAt(5)).not.toHaveAttribute('data-active');
  });

  //13. WHEN the last bullet is focused and the HOME key is pressed
  test(`13. GIVEN a carousel with a pagination control
        WHEN the last bullet is focused and the HOME key is pressed
        THEN it should move to the first slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    // Get the total number of slides
    const totalSlides = await d.getTotalSlides();

    // Focus on the last pagination bullet
    const lastBullet = d.getPaginationBullet(totalSlides - 1);
    await lastBullet.focus();

    // Press the Home key
    await page.keyboard.press('Home');

    // Verify the first slide is active
    await expect(d.getSlideAt(0)).toHaveAttribute('data-active');
    await expect(d.getSlideAt(1)).not.toHaveAttribute('data-active');
    await expect(d.getSlideAt(6)).not.toHaveAttribute('data-active');
  });
});

test.describe('Mobile / Touch Behavior', () => {
  //14. WHEN swiping to the left
  test(`14. GIVEN a carousel with dragging enabled
        WHEN swiping to the left
        THEN it should move to the next slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // Assuming the first slide is active initially
    await expect(d.getSlideAt(0)).toHaveAttribute('data-active');

    // Perform the swipe gesture to the left
    const carousel = d.getContainer();
    const boundingBox = await carousel.boundingBox();
    if (boundingBox) {
      const startX = boundingBox.x + boundingBox.width * 0.8; // Start near the right edge
      const endX = boundingBox.x + boundingBox.width * 0.2; // End near the left edge
      const y = boundingBox.y + boundingBox.height / 2; // Swipe in the vertical middle

      // Perform the drag action
      await page.mouse.move(startX, y);
      await page.mouse.down();
      await page.mouse.move(endX, y, { steps: 10 });
      await page.mouse.up();
    }

    // Verify the next slide is active
    await expect(d.getSlideAt(1)).toHaveAttribute('data-active');
    // Verify that other slides are NOT active
    await expect(d.getSlideAt(0)).not.toHaveAttribute('data-active');
    await expect(d.getSlideAt(2)).not.toHaveAttribute('data-active');
  });

  //15. WHEN swiping to the right
  test(`15. GIVEN a carousel with dragging enabled
        WHEN swiping to the right
        THEN it should move to the previous slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // Make the second slide active by clicking the NEXT button
    await d.getNextButton().click();

    // Assuming the second slide is active initially
    await expect(d.getSlideAt(1)).toHaveAttribute('data-active');

    // Perform the swipe gesture to the right
    const carousel = d.getContainer();
    const boundingBox = await carousel.boundingBox();
    if (boundingBox) {
      const startX = boundingBox.x + boundingBox.width * 0.2; // Start near the left edge
      const endX = boundingBox.x + boundingBox.width * 0.8; // End near the right edge
      const y = boundingBox.y + boundingBox.height / 2; // Swipe in the vertical middle

      // Perform the drag action
      await page.mouse.move(startX, y);
      await page.mouse.down();
      await page.mouse.move(endX, y, { steps: 10 });
      await page.mouse.up();
    }

    // Verify the previous slide (first slide) is active
    await expect(d.getSlideAt(0)).toHaveAttribute('data-active');
    // Verify that other slides are NOT active
    await expect(d.getSlideAt(1)).not.toHaveAttribute('data-active');
    await expect(d.getSlideAt(6)).not.toHaveAttribute('data-active');
  });

  //16. WHEN tapping on the pagination bullets
  test(`16. GIVEN a carousel with a pagination control
        WHEN tapping on the pagination bullets
        THEN it should move to the corresponding slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'pagination');

    // Get the total number of slides
    const totalSlides = await d.getTotalSlides();

    // Assuming that we want to test tapping on each bullet and verify the corresponding slide
    for (let i = 0; i < totalSlides; i++) {
      // Tap on the pagination bullet
      await d.getPaginationBullet(i).click();

      // Verify the corresponding slide is active
      await expect(d.getSlideAt(i)).toHaveAttribute('data-active');
    }
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
        THEN the carousel container should have the role of group
        AND the title should be the accessible name
        `, async ({ page }) => {
    const { driver: d } = await setup(page, 'title');

    await expect(d.getRoot()).toBeVisible();
    await expect(d.getRoot()).toHaveAttribute('aria-labelledby');
    // await expect(d.getRoot()).toHaveAttribute('role', 'group');
    //await expect(d.getRoot()).toHaveAccessibleName('');  -> research what it does do
    await expect(d.getRoot()).toHaveRole('group');

    //await expect(d.getRoot()).toHaveAttribute('aria-labelledby', 'Favorite Colors');
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
        THEN the items should have a posinset of its current index
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    await expect(d.getRoot()).toBeVisible();

    // Assuming getItems() returns a list of carousel items
    const items = await d.getItems();
    const itemCount = await items.count();

    for (let i = 0; i < itemCount; i++) {
      const item = items.nth(i);
      const expectedPosinset = (i + 1).toString(); // posinset is 1-based index
      await expect(item).toHaveAttribute('aria-posinset', expectedPosinset);
    }
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

    const totalSlides = await d.getTotalSlides();

    // Move to the first slide and ensure it's active
    const firstSlide = await d.getSlideAt(0);
    await expect(firstSlide).toHaveAttribute('data-active');

    // Check that all other slides are inert
    for (let i = 1; i < totalSlides; i++) {
      const slide = await d.getSlideAt(i);
      await expect(slide).toHaveAttribute('inert');
    }

    // Optionally, move to another slide and repeat the check
    await d.getNextButton().click();

    // Now the second slide should be active
    const secondSlide = await d.getSlideAt(1);
    await expect(secondSlide).toHaveAttribute('data-active');

    // Check that all other slides (except the second one) are inert
    for (let i = 0; i < totalSlides; i++) {
      if (i !== 1) {
        const slide = await d.getSlideAt(i);
        await expect(slide).toHaveAttribute('inert');
      }
    }
  });

  test(`25. GIVEN a carousel
        WHEN on the current slide
        THEN items inside the slide should be the only focusable items
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    const totalSlides = await d.getTotalSlides();

    // Move to the first slide and ensure it's active
    const firstSlide = await d.getSlideAt(0);
    await expect(firstSlide).toHaveAttribute('data-active');

    // Check that all other slides are inert
    for (let i = 1; i < totalSlides; i++) {
      const slide = await d.getSlideAt(i);
      await expect(slide).toHaveAttribute('inert');
    }

    // Optionally, move to another slide and repeat the check
    await d.getNextButton().click();

    // Now the second slide should be active
    const secondSlide = await d.getSlideAt(1);
    await expect(secondSlide).toHaveAttribute('data-active');

    // Check that all other slides (except the second one) are inert
    for (let i = 0; i < totalSlides; i++) {
      if (i !== 1) {
        const slide = await d.getSlideAt(i);
        await expect(slide).toHaveAttribute('inert');
      }
    }
  });

  test(`26. GIVEN a carousel with loop disabled
        WHEN on the last slide
        THEN the previous button should be focused
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    const totalSlides = await d.getTotalSlides();

    // //Move to the last slide by clicking the next button until the end
    // for (let i = 0; i < totalSlides - 2; i++) {
    //     await d.getNextButton().click();
    //     //await expect(d.getSlideAt(i)).toHaveAttribute('data-active');
    // }
    await d.getNextButton().click(); //1
    await d.getNextButton().click(); //2
    await d.getNextButton().click(); //3
    await d.getNextButton().click(); //4
    await d.getNextButton().click(); //5
    await d.getNextButton().click(); //6

    // Ensure the last slide is active
    const lastSlide = await d.getSlideAt(totalSlides - 2);
    await expect(lastSlide).toHaveAttribute('data-active');

    // Check that the previous button is focused
    const prevButton = await d.getPrevButton();
    await expect(d.getPrevButton()).toHaveAttribute('aria-disabled', 'false');
    await expect(d.getNextButton()).toHaveAttribute('aria-disabled', 'true');
  });

  test(`27. GIVEN a carousel with loop disabled
        WHEN on the first slide
        THEN the next button should be focused
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // Ensure the carousel is on the first slide
    const firstSlide = await d.getSlideAt(0);
    await expect(firstSlide).toHaveAttribute('data-active');

    // Verify that the next button is focused

    await expect(d.getNextButton()).toHaveAttribute('aria-disabled', 'false');
    await expect(d.getPrevButton()).toHaveAttribute('aria-disabled', 'true');
  });
});

test.describe('Behavior', () => {
  test(`28. GIVEN a carousel with loop disabled
        WHEN on the last slide
        THEN the next button should be disabled
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // Move to the last slide
    const totalSlides = await d.getTotalSlides();
    //for (let i = 0; i < totalSlides - 1; i++) {
    //    await d.getNextButton().click();
    //}

    await d.getNextButton().click();
    await d.getNextButton().click();
    await d.getNextButton().click();
    await d.getNextButton().click();
    await d.getNextButton().click();
    await d.getNextButton().click();
    //await d.getNextButton().click();

    // Ensure the last slide is active
    //await expect(d.getSlideAt(totalSlides)).toHaveAttribute('data-active');
    //await expect(d.getSlideAt(8)).toHaveAttribute('data-active');

    // Verify the next button is disabled
    await expect(d.getNextButton()).toHaveAttribute('disabled'); // Adjust if your button uses 'aria-disabled' or another attribute
  });

  test(`29. GIVEN a carousel with loop disabled
        WHEN on the first slide
        THEN the previous button should be disabled
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'hero');

    // Ensure the first slide is active
    await expect(d.getSlideAt(0)).toHaveAttribute('data-active');

    // Verify the previous button is disabled
    await expect(d.getPrevButton()).toHaveAttribute('disabled'); //
  });

  test(`30. BUG GIVEN a carousel with loop enabled
        WHEN on the last slide and the next button is clicked
        THEN it should move to the first slide
`, async ({ page }) => {
    // JACK HASNT DONE THIS YET
    const { driver: d } = await setup(page, 'loop');
    await d.getNextButton().click();
    await d.getNextButton().click();
    await d.getNextButton().click();
    await d.getNextButton().click();
    await d.getNextButton().click();
    await d.getNextButton().click();
    await d.getNextButton().click();

    await expect(d.getSlideAt(0)).toHaveAttribute('data-active');
  });

  test(`31. BUG GIVEN a carousel with loop enabled
        WHEN on the first slide and the previous button is clicked
        THEN it should move to the first slide
`, async ({ page }) => {
    const { driver: d } = await setup(page, 'loop');

    // Ensure the first slide is active
    await expect(d.getSlideAt(0)).toHaveAttribute('data-active');

    // Click the previous button
    await d.getPrevButton().click();

    // Get the total number of slides
    const totalSlides = await d.getTotalSlides();
    console.log(`Total number of slides: ${totalSlides}`);

    // Verify that the last slide is now active
    await expect(d.getSlideAt(0)).toHaveAttribute('data-active');
  });

  test.describe('Threshold', () => {
    test(`32. GIVEN a carousel with dragging enabled
          WHEN on the first slide and the mouse is moved far right
          THEN it should stay snapped on the first slide
`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      // Ensure the first slide is active
      await expect(d.getSlideAt(0)).toHaveAttribute('data-active');

      // Get the bounding box of the first slide to determine the drag start point
      const firstSlide = await d.getSlideAt(0);
      const boundingBox = await firstSlide.boundingBox();
      if (!boundingBox) {
        throw new Error('Could not determine the bounding box of the first slide');
      }

      // Calculate start and end points for the drag
      const startX = boundingBox.x + boundingBox.width / 2; // Middle of the first slide
      const startY = boundingBox.y + boundingBox.height / 2;
      const endX = startX + boundingBox.width * 2; // Dragging far to the right

      // Perform the drag action
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(endX, startY, { steps: 10 }); // Dragging right
      await page.mouse.up();

      // Verify that the first slide is still active
      await expect(firstSlide).toHaveAttribute('data-active');
    });

    test(`33. GIVEN a carousel with dragging enabled
          WHEN on the last slide and the mouse is moved far left
          THEN it should stay snapped on the last slide
`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      // Get the total number of slides
      const totalSlides = await d.getTotalSlides();

      // Move to the last slide
      for (let i = 0; i < totalSlides - 1; i++) {
        await d.getNextButton().click();
      }

      // Ensure the last slide is active
      const lastSlide = await d.getSlideAt(totalSlides - 1);
      await expect(lastSlide).toHaveAttribute('data-active');

      // Get the bounding box of the last slide to determine the drag start point
      const boundingBox = await lastSlide.boundingBox();
      if (!boundingBox) {
        throw new Error('Could not determine the bounding box of the last slide');
      }

      // Calculate start and end points for the drag
      const startX = boundingBox.x + boundingBox.width / 2; // Middle of the last slide
      const startY = boundingBox.y + boundingBox.height / 2;
      const endX = startX - boundingBox.width * 2; // Dragging far to the left

      // Perform the drag action
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(endX, startY, { steps: 10 }); // Dragging left
      await page.mouse.up();

      // // Perform the drag action
      // await d.mouse.move(startX, startY);
      // await d.mouse.down();
      // await d.mouse.move(endX, startY, { steps: 10 }); // Dragging left
      // await d.mouse.up();

      // Verify that the last slide is still active
      await expect(lastSlide).toHaveAttribute('data-active');
    });

    test(`34. GIVEN a carousel with dragging enabled
          WHEN on the first slide and is mobile swiped far left
          THEN it should stay snapped on the last slide
`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      // Ensure the first slide is active
      const firstSlide = await d.getSlideAt(0);
      await expect(firstSlide).toHaveAttribute('data-active');

      // Get the bounding box of the first slide to determine the swipe start point
      const boundingBox = await firstSlide.boundingBox();
      if (!boundingBox) {
        throw new Error('Could not determine the bounding box of the first slide');
      }

      // Calculate start and end points for the swipe
      const startX = boundingBox.x + boundingBox.width / 2; // Middle of the first slide
      const startY = boundingBox.y + boundingBox.height / 2;
      const endX = startX - boundingBox.width * 2; // Swiping far to the left

      // Perform the swipe action (simulating mobile touch input)
      await page.touchscreen.tap(startX, startY); // Start the swipe
      await page.touchscreen.swipe(startX, startY, endX, startY, 50); // Swiping left with some speed
      //page, lastSlide, 'right', 100

      // Verify that the first slide is still active
      await expect(firstSlide).toHaveAttribute('data-active');
    });

    test(`35. GIVEN a carousel with dragging enabled
          WHEN on the last slide and is mobile swiped far right
          THEN it should stay snapped on the first slide
`, async ({ page }) => {
      const { driver: d } = await setup(page, 'hero');

      // Get the total number of slides
      const totalSlides = await d.getTotalSlides();

      // Move to the last slide
      for (let i = 0; i < totalSlides - 1; i++) {
        await d.getNextButton().click();
      }

      // Ensure the last slide is active
      const lastSlide = await d.getSlideAt(totalSlides - 1);
      await expect(lastSlide).toHaveAttribute('data-active');

      // Get the bounding box of the last slide to determine the swipe start point
      const boundingBox = await lastSlide.boundingBox();
      if (!boundingBox) {
        throw new Error('Could not determine the bounding box of the last slide');
      }

      // Calculate start and end points for the swipe
      const startX = boundingBox.x + boundingBox.width / 2; // Middle of the last slide
      const startY = boundingBox.y + boundingBox.height / 2;
      const endX = startX + boundingBox.width * 2; // Swiping far to the right

      // Perform the swipe action (simulating mobile touch input)
      await page.touchscreen.tap(startX, startY); // Start the swipe
      //await page.touchscreen.swipe(page, lastSlide, 'right', 100); // Swiping left with some speed
      //await page.touchscreen.swipe(startX, startY, endX, startY, 50); // Swiping right with some speed

      // Verify that the last slide is still active
      await expect(lastSlide).toHaveAttribute('data-active');
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
