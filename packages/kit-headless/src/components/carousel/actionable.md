# Accessibility Improvements for Carousel Component

## 1. Implement auto-rotation control

- Add a start/stop button for users to control auto-rotation [x]
- Pause rotation on hover, focus, or when reduced motion is preferred
- Disable auto-rotation completely as an option
- Ensure auto-rotation stops when keyboard focus enters the carousel
- Do not restart auto-rotation unless explicitly requested by the user

## 2. Ensure proper keyboard navigation

- Use arrow keys to move between tabs/slides [x]
- Implement Home and End keys to jump to first/last slide [x]
- Manage focus with roving tabindex [x]
- Ensure Tab and Shift+Tab move through interactive elements as specified by page tab sequence

## 5. Ensure proper color contrast

- Maintain sufficient contrast for controls and text, especially when overlaying images
- Consider moving controls and captions outside the image area

## 6. Implement focus styling

- Highlight the entire tab list when a tab receives focus
- Ensure focus indicators are visible in high contrast mode
- Place the rotation control as the first element in the Tab sequence inside the carousel

## 7. Provide screen reader announcements

- Announce slide changes when auto-rotation is off
- Disable announcements when auto-rotation is on
- Ensure rotation control label changes to match the action it will perform (e.g., "Stop slide rotation" or "Start slide rotation")
