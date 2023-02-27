import type { StorybookConfig } from '@storybook/html-vite';
import { QWIK_LOADER } from '@builder.io/qwik/loader';
import { mergeConfig } from 'vite';

export const core: StorybookConfig['core'] = {
  builder: '@storybook/builder-vite',
  renderer: '@qwik-ui/storybook',
};

export const viteFinal: StorybookConfig['viteFinal'] = async (
  defaultConfig,
  options
) => {
  const config = mergeConfig(defaultConfig, {
    build: {
      target: 'es2020',
      rollupOptions: {
        external: ['@qwik-city-plan'],
      },
    },
  });
  // Qwik-city plugin may be used in apps, but it has mdx stuff that conflicts with Storybook mdx
  // we'll try to only remove the transform code (where the mdx stuff is), and keep everything else.
  config.plugins = config.plugins.map((plugin: any) =>
    plugin.name === 'vite-plugin-qwik-city'
      ? { ...plugin, transform: () => null as any }
      : plugin
  );
  return config;
};

export const previewAnnotations: StorybookConfig['previewAnnotations'] = (
  entry = []
) => [...entry, '@qwik-ui/storybook'];

export const previewHead = (head: string) => {
  return `${head}\n<script>${QWIK_LOADER}</script>`;
};
