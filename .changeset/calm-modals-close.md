---
'@qwik-ui/headless': patch
---

fix: a modal with an animation duration but no running animation now closes, a modal reopened while closing stays open, and `onClose$` runs once the dialog has closed
