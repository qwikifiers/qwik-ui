---
'qwik-ui': patch
---

FIX: `qwik-ui.config.json` is generated at the root of the monorepo.

Before it got created inside of the individual project, but it was wrong because we couldn't generate components in the right place or use the CLI from the root of the monorepo.