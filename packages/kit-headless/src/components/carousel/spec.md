Based on the W3C ARIA Practices Guide for Carousels, the required behaviors for a carousel are:

- Buttons for previous and next slides.

- Optional controls for choosing a specific slide.

- If the carousel auto-rotates, it should:
  - Have a button for stopping and restarting rotation.
  - Stop rotating when keyboard focus enters the carousel or mouse hovers over it.

For keyboard interactions:

- Auto-rotation stops when any element in the carousel receives keyboard focus.

- Tab and Shift + Tab: Move focus through the carousel's interactive elements.

- Button elements implement the keyboard interaction defined in the button pattern.

- If present, the rotation control is the first element in the Tab sequence inside the carousel.

- If tab elements are used for slide picker controls, they implement the keyboard interaction defined in the Tabs Pattern.

Implementation logic whiteboard:

What's the width of the carousel component?

Make the containing slide div the size of the slide

When someone navigates, slide the containing div over by however many carousel component widths to get to the wanted slide.

Ex. Slide 1-10 -> n - 1 widths
