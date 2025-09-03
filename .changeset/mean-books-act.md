---
'@qwik-ui/styled': minor
'qwik-ui': minor
---

feat: Qwik UI has now fully migrated and updated the global.css config and components to use tailwind v4. You can copy/paste the components into your project(s) or use the CLI.

## Migration guide:

- Make sure to commit any changes before you start the steps below
- Run the `npx @tailwindcss/upgrade` script and let it do most of the work for you
- Remove your tailwind.config.cjs and postcss.config.cjs
- install the @tailwindcss/vite package and pass it to your vite.config plugins array
- Copy paste the new css config base tokens, or use the `qwik-ui init` to get them, and adapt them to your project
- If you are in a monorepo, make sure to `@source “../../../path/to/your/components“;`
- Add `"w-full"` to Modal PanelVariants position.top and position.bottom; add `"m-auto"` to position.center
- If you didn't modify some components, you can re-copy/paste (or re-install them with the cli) for their most up to date version
