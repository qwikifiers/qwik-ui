---
'qwik-ui': patch
---

Removed the generated `nx.json` after `qwik-ui init` command.
Apparently, only an empty `nx: {}` in the package.json is enough.
