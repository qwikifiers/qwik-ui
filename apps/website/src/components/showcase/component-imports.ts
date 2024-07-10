import { isDev } from '@builder.io/qwik/build';

// The below `/src/routes/docs/**/**/examples/*.tsx` patterns are here so that import.meta.glob works both for styled and headless routes.
// For example:
// /src/routes/docs/components/styled/modal/examples/hero.tsx
// /src/routes/docs/components/headless/modal/examples/hero.tsx

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const metaGlobComponents: Record<string, any> = import.meta.glob(
  '/src/routes/docs/**/**/examples/*.tsx',
  {
    import: 'default',
    eager: isDev ? false : true,
  },
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rawComponents: Record<string, any> = import.meta.glob(
  '/src/routes/docs/**/**/examples/*.tsx',
  {
    query: '?raw',
    import: 'default',
    eager: isDev ? false : true,
  },
);
