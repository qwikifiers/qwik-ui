# qwik-ui

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
