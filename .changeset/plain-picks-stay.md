---
'@qwik-ui/headless': patch
---

fix: a Select's `bind:value` now matches options exactly, keeps an empty option value and updates when it starts empty. `onChange$` runs once per pick, not for values the parent sets, and the pick shows without waiting for it.
