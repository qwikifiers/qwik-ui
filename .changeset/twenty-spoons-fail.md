---
'@qwik-ui/headless': patch
---

Chromium 109-113 did not properly support the popover but reported that they did. This led to the polyfill not activating which caused our E2E tests to break. We are dropping down to Chromium 108 to validate the polyfill as users of Chrome would see it before the popover API was supported.
