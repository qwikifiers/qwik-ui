---
'@qwik-ui/styled': minor
---

## tailwind.config.cjs

Now uses tailwindcss-animate

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

## Modal refactor

### Modal.Panel

The Panel now uses tailwindcss-animate

```tsx
class={cn(
        'max-w-sm rounded-base border bg-background p-6 text-foreground shadow-md backdrop:brightness-50 backdrop:backdrop-blur-sm',
        'data-[closed]:duration-300 data-[open]:duration-300 data-[open]:animate-in data-[closing]:animate-out data-[closing]:fade-out data-[open]:fade-in',
        'backdrop:data-[closed]:duration-300 backdrop:data-[open]:duration-300 backdrop:data-[open]:animate-in backdrop:data-[closing]:animate-out backdrop:data-[closing]:fade-out backdrop:data-[open]:fade-in',
        props.class,
      )}
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
