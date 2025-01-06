# @qwik-ui/styled

## 0.3.0

### Minor Changes

- ✨ Added the following components: Dropdown, Toggle, ToggleGroup in #993 (by [@shairez](https://github.com/shairez) in [#1013](https://github.com/qwikifiers/qwik-ui/pull/1013))

## 0.2.0

### Minor Changes

- ✨ toggle and togglegroup headless and styled components (by [@steffanek](https://github.com/steffanek) in [#957](https://github.com/qwikifiers/qwik-ui/pull/957))

- ✨ carousel reaches beta state (by [@thejackshelton](https://github.com/thejackshelton) in [#965](https://github.com/qwikifiers/qwik-ui/pull/965))

  feat: stepper component added as a configuration for the carousel

  feat: vertical carousels are now supported

  feat: progress bar gets a major refactor and is backwards compatible

  docs: fixed theme issues and improved prefetching

## 0.1.0

### Minor Changes

- ## tailwind.config.cjs (by [@maiieul](https://github.com/maiieul) in [#753](https://github.com/qwikifiers/qwik-ui/pull/753))

  ### tailwindcss-animate

  The tailwind config now uses tailwindcss-animate

  ```ts
    plugins: [
      require('tailwindcss-animate'),
      ...
    ],
  ```

  Instead of manually defined animations through a custom plugin like

  ```ts
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.appear': {
          opacity: 1,
        },
        '.disappear': {
          opacity: 0,
        },
      });
    }),
  ];
  ```

  ### New keyframes

  We added

  ```js
  animation: {
    'accordion-up': 'collapsible-up 0.2s ease-out 0s 1 normal forwards',
    'accordion-down': 'collapsible-down 0.2s ease-out 0s 1 normal forwards',
  },
  keyframes: {
    'collapsible-down': {
      from: { height: '0' },
      to: { height: 'var(--qwikui-collapsible-content-height)' },
    },
    'collapsible-up': {
      from: { height: 'var(--qwikui-collapsible-content-height)' },
      to: { height: '0' },
    },
  },
  ```

  to the tailwind config. You will need those for the styled accordion to be animated.

  ## Modal refactor

  ### Modal.Panel

  The Panel now uses tailwindcss-animate and comes built-in with 5 `position` variant props

  ```tsx
  export const panelVariants = cva(
    [
      'fixed w-full bg-background p-6 text-foreground transition-all backdrop:brightness-50 backdrop:backdrop-blur-sm',
      'data-[closing]:duration-300 data-[open]:duration-300 data-[open]:animate-in data-[closing]:animate-out',
      'backdrop:data-[closing]:duration-300 backdrop:data-[open]:duration-300 backdrop:data-[open]:animate-in backdrop:data-[closing]:animate-out backdrop:data-[closing]:fade-out backdrop:data-[open]:fade-in',
    ],
    {
      variants: {
        position: {
          center:
            'max-w-lg rounded-base shadow-lg data-[state=closed]:fade-out data-[state=open]:fade-in data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-2 backdrop:data-[closing]:fade-out backdrop:data-[open]:fade-in',
          top: 'inset-x-0 top-0 mt-0 rounded-b-base border-b data-[closing]:slide-out-to-top data-[open]:slide-in-from-top',
          bottom:
            'inset-x-0 bottom-0 mb-0 rounded-t-base border-t data-[closing]:slide-out-to-bottom data-[open]:slide-in-from-bottom',
          left: 'inset-y-0 left-0 ml-0 h-full max-w-sm rounded-r-base border-r data-[closing]:slide-out-to-left data-[open]:slide-in-from-left',
          right:
            'inset-y-0 right-0 mr-0 h-full max-w-sm rounded-l-base border-l data-[closing]:slide-out-to-right data-[open]:slide-in-from-right',
        },
      },
      defaultVariants: {
        position: 'center',
      },
    },
  );

  type PanelProps = PropsOf<typeof HeadlessModal.Panel> &
    VariantProps<typeof panelVariants>;

  const Panel = component$<PanelProps>(({ position, ...props }) => {
    return (
      <HeadlessModal.Panel
        {...props}
        class={cn(panelVariants({ position }), props.class)}
      >
        <Slot />
      </HeadlessModal.Panel>
    );
  });
  ```

  over previous tailwind.config.js home-made plugin

  ```tsx
          '.appear': {
            opacity: 1,
          },
          '.disappear': {
            opacity: 0,
          },
  ```

  to avoid re-inventing the wheel.

  ### Modal.Title

  Title now holds `text-lg font-semibold` classes.

  ### Modal.Description

  Description now holds `text-muted-foreground` class.

  ## Accordion

  We changed the accordion animations. So make sure to update your taiwind config accordingly (explained at the beginning of the changeset!).

### Patch Changes

- ✨ new styled select component 🎉 (by [@maiieul](https://github.com/maiieul) in [#759](https://github.com/qwikifiers/qwik-ui/pull/759))

- Styled button now uses `transition-all` for every variant shared class (by [@maiieul](https://github.com/maiieul) in [#753](https://github.com/qwikifiers/qwik-ui/pull/753))

## 0.0.6

### Patch Changes

- refactor change CardTitle font-weight to medium (by [@maiieul](https://github.com/maiieul) in [#693](https://github.com/qwikifiers/qwik-ui/pull/693))

## 0.0.5

### Patch Changes

- FEAT add styled breadcrumbs component (draft) (by [@ditadi](https://github.com/ditadi) in [#665](https://github.com/qwikifiers/qwik-ui/pull/665))

## 0.0.4

### Patch Changes

- FEAT add experimental styled card image (by [@maiieul](https://github.com/maiieul) in [#651](https://github.com/qwikifiers/qwik-ui/pull/651))

## 0.0.3

### Patch Changes

- REFACTOR minor class fixes on the styled Card and Tabs (by [@maiieul](https://github.com/maiieul) in [#625](https://github.com/qwikifiers/qwik-ui/pull/625))

- FIX added input to registry (by [@shairez](https://github.com/shairez) in [`cbe6087`](https://github.com/qwikifiers/qwik-ui/commit/cbe608795c5a8d4498d09b0e3266d4d2db9acde3))

## 0.0.2

### Patch Changes

- ✨ add popover component (by [@maiieul](https://github.com/maiieul) in [#604](https://github.com/qwikifiers/qwik-ui/pull/604))

- ✨ add Skeleton component (by [@maiieul](https://github.com/maiieul) in [#604](https://github.com/qwikifiers/qwik-ui/pull/604))

- ✨ add separator component (by [@maiieul](https://github.com/maiieul) in [#604](https://github.com/qwikifiers/qwik-ui/pull/604))

- 🐞🩹 added `bind:value` to input (by [@shairez](https://github.com/shairez) in [#604](https://github.com/qwikifiers/qwik-ui/pull/604))

- ✨ add Tabs component (by [@maiieul](https://github.com/maiieul) in [#604](https://github.com/qwikifiers/qwik-ui/pull/604))

- ✨ add RadioGroup component (by [@maiieul](https://github.com/maiieul) in [#604](https://github.com/qwikifiers/qwik-ui/pull/604))

- ✨ add combobox component draft (by [@maiieul](https://github.com/maiieul) in [#604](https://github.com/qwikifiers/qwik-ui/pull/604))

- ✨ add Separator component (by [@maiieul](https://github.com/maiieul) in [#604](https://github.com/qwikifiers/qwik-ui/pull/604))

- ✨ add border-base utility (by [@maiieul](https://github.com/maiieul) in [#604](https://github.com/qwikifiers/qwik-ui/pull/604))

- ✨ add data-[state=selected]:shadow-inner to Tab component (by [@maiieul](https://github.com/maiieul) in [#604](https://github.com/qwikifiers/qwik-ui/pull/604))

- ✨ add Alert component (by [@maiieul](https://github.com/maiieul) in [#604](https://github.com/qwikifiers/qwik-ui/pull/604))

- ✨ add Avatar component (by [@maiieul](https://github.com/maiieul) in [#604](https://github.com/qwikifiers/qwik-ui/pull/604))

- refactor(button.tsx): change border to border-base for solid buttons (by [@maiieul](https://github.com/maiieul) in [#604](https://github.com/qwikifiers/qwik-ui/pull/604))
