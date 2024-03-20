/* eslint-disable @typescript-eslint/no-explicit-any */
import { isDev } from '@builder.io/qwik/build';

// The below `/src/routes/docs/**/**/examples/*.tsx` patterns are here so that import.meta.glob works both for styled and headless routes.
// For example:
// /src/routes/docs/components/styled/modal/examples/hero.tsx
// /src/routes/docs/components/headless/modal/examples/hero.tsx

function createMetaGlobComponents() {
  const metaGlobComponents: Record<string, any> = import.meta.glob(
    '../../../../website/src/routes/docs/**/**/examples/*.tsx',
    {
      import: 'default',
      eager: isDev ? false : true,
    },
  );

  const componentsMap: Record<string, unknown> = {};

  for (const key in metaGlobComponents) {
    const component = metaGlobComponents[key];

    if (component) {
      const componentName = key.split('routes/docs/')[1];
      if (componentName) {
        componentsMap[componentName] = component;
      }
    }
  }

  return componentsMap;
}

export const metaGlobComponents = createMetaGlobComponents();
