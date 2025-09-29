# qwik-ui

## 0.4.1

### Patch Changes

- Updated dependencies [[`6b25878`](https://github.com/qwikifiers/qwik-ui/commit/6b25878e1f40ce83044c7ed3e7baef83300718de)]:
  - @qwik-ui/utils@0.3.3

## 0.4.0

### Minor Changes

- ✨ Qwik UI has now fully migrated and updated the global.css config and components to use tailwind v4. You can copy/paste the components into your project(s) or use the CLI. (by [@maiieul](https://github.com/maiieul) in [#1122](https://github.com/qwikifiers/qwik-ui/pull/1122))

  ## Migration guide:
  - Make sure to commit any changes before you start the steps below
  - Run the `npx @tailwindcss/upgrade` script and let it do most of the work for you
  - Remove your tailwind.config.cjs and postcss.config.cjs
  - install the @tailwindcss/vite package and pass it to your vite.config plugins array
  - Copy paste the new css config base tokens, or use the `qwik-ui init` to get them, and adapt them to your project
  - If you are in a monorepo, make sure to `@source “../../../path/to/your/components“;`
  - Add `"w-full"` to Modal PanelVariants position.top and position.bottom; add `"m-auto"` to position.center
  - If you didn't modify some components, you can re-copy/paste (or re-install them with the cli) for their most up to date version

## 0.3.2

### Patch Changes

- Updated dependencies [[`10f1474`](https://github.com/qwikifiers/qwik-ui/commit/10f1474e3d239c0e3d0ffe2b19f7d965e31ff677)]:
  - @qwik-ui/utils@0.3.3

## 0.3.1

### Patch Changes

- 🐞🩹 cli now works but defaults to tailwind 3 installation. Support for Tailwind 4 is coming (by [@shairez](https://github.com/shairez) in [#1105](https://github.com/qwikifiers/qwik-ui/pull/1105))

## 0.3.0

### Minor Changes

- Added sponsors section to the Readme (by [@zaynet](https://github.com/zaynet) in [#1064](https://github.com/qwikifiers/qwik-ui/pull/1064))

### Patch Changes

- Updated dependencies [[`04b5872`](https://github.com/qwikifiers/qwik-ui/commit/04b58726b0bf798c7735f54924467b19e7d6b6e9)]:
  - @qwik-ui/utils@0.3.2

## 0.2.0

### Minor Changes

- ✨ added a barrel file to the components root folder (by [@shairez](https://github.com/shairez) in [#1015](https://github.com/qwikifiers/qwik-ui/pull/1015))

  Now when you generate a component qwik-ui will create an `index.ts` file in your components folder which exports the newly generated components.

  Example: `qwik-ui add input`

  Generated output:

  ```bash
  src/components/index.ts # exports * from './input/input'
  src/components/input/input.tsx
  ```

## 0.1.4

### Patch Changes

- 🐞🩹 `qwik-ui.config.json` is generated at the root of the monorepo. (by [@shairez](https://github.com/shairez) in [#1009](https://github.com/qwikifiers/qwik-ui/pull/1009))

  Before it got created inside of the individual project, but it was wrong because we couldn't generate components in the right place or use the CLI from the root of the monorepo.

- 🐞🩹 cli not checking relative global.css correctly (by [@shairez](https://github.com/shairez) in [#1003](https://github.com/qwikifiers/qwik-ui/pull/1003))

## 0.1.3

### Patch Changes

- Updated dependencies [[`519718f`](https://github.com/qwikifiers/qwik-ui/commit/519718f159b051a4858990b059dad89dc5b1ba13)]:
  - @qwik-ui/utils@0.3.1

## 0.1.2

### Patch Changes

- Changed enums to const maps in utils (by [@shairez](https://github.com/shairez) in [#914](https://github.com/qwikifiers/qwik-ui/pull/914))

- 🐞🩹 added `.nx/workspace-data` to `.gitignore` for new projects (by [@shairez](https://github.com/shairez) in [#914](https://github.com/qwikifiers/qwik-ui/pull/914))

- Updated dependencies [[`927c2d4`](https://github.com/qwikifiers/qwik-ui/commit/927c2d4117ffe9c07fc0c75b9df412d5662ad6c1)]:
  - @qwik-ui/utils@0.3.0

## 0.1.1

### Patch Changes

- 🐞🩹 now installing `tailwindcss-animate`, `class-variance-authority` (by [@shairez](https://github.com/shairez) in [#872](https://github.com/qwikifiers/qwik-ui/pull/872))
  and `@qwikest/icons` during the cli init

## 0.1.0

### Minor Changes

- added support for tailwind config in ESM format (by [@shairez](https://github.com/shairez) in [#604](https://github.com/qwikifiers/qwik-ui/pull/604))

### Patch Changes

- ✨ changed to `kit-styled` (by [@shairez](https://github.com/shairez) in [#604](https://github.com/qwikifiers/qwik-ui/pull/604))

  Now the cli will only install `kit-styled` and generate the css variables according to which theme you choose.

- Updated dependencies [[`31dcec7`](https://github.com/qwikifiers/qwik-ui/commit/31dcec7ce266b3840f79a57ce303e1b71d6fab02)]:
  - @qwik-ui/utils@0.2.1

## 0.0.4

### Patch Changes

- Removed the generated `nx.json` after `qwik-ui init` command. (by [@shairez](https://github.com/shairez) in [#598](https://github.com/qwikifiers/qwik-ui/pull/598))
  Apparently, only an empty `nx: {}` in the package.json is enough.

## 0.0.3

### Patch Changes

- Initial release of qwik-ui cli (by [@shairez](https://github.com/shairez) in [`34b788d`](https://github.com/qwikifiers/qwik-ui/commit/34b788d4ac30f4c4439c52066bdd259535b4efdb))
  This is not production ready, yet. It was released for testing purposes only.
