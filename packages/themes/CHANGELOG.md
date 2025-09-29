# Changelog

## 0.1.3

### Patch Changes

- 🐞🩹 the cli with tailwind v4 was not working because it was using outdated versions of its dependencies. It should now work normally. (by [@maiieul](https://github.com/maiieul) in [#1142](https://github.com/qwikifiers/qwik-ui/pull/1142))

## 0.1.2

### Patch Changes

- 🐞🩹 all @qwik-ui packages are now side effect free. This cleans up the consumers bundle-graphs of unnecessary static imports, preventing any likelyhood of over-preloading. (by [@maiieul](https://github.com/maiieul) in [#1126](https://github.com/qwikifiers/qwik-ui/pull/1126))

## 0.1.1

### Patch Changes

- add license in package json (by [@thejackshelton](https://github.com/thejackshelton) in [#1070](https://github.com/qwikifiers/qwik-ui/pull/1070))

## 0.1.0

### Minor Changes

- ✨ carousel reaches beta state (by [@thejackshelton](https://github.com/thejackshelton) in [#965](https://github.com/qwikifiers/qwik-ui/pull/965))

  feat: stepper component added as a configuration for the carousel

  feat: vertical carousels are now supported

  feat: progress bar gets a major refactor and is backwards compatible

  docs: fixed theme issues and improved prefetching
