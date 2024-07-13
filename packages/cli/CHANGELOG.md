# qwik-ui

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
