---
'qwik-ui': minor
---

FEAT: added a barrel file to the components root folder

Now when you generate a component qwik-ui will create an `index.ts` file in your components folder which exports the newly generated components.

Example: `qwik-ui add input`

Generated output:

```bash
src/components/index.ts # exports * from './input/input'
src/components/input/input.tsx
```