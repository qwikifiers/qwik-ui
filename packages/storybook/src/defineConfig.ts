import type { StorybookConfig } from './types';
import type { UserConfig } from 'vite';

import type { PluginOptions as TsConfigPathOptions } from 'vite-tsconfig-paths';
import tsConfigPaths from 'vite-tsconfig-paths';

import type { QwikVitePluginOptions } from '@builder.io/qwik/optimizer';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { PluginOption } from 'vite';

export interface CustomConfig extends StorybookConfig {
  /**
   * Configure custom base path to your documentation files
   * @default ../docs (relative from .storybook folder)
   */
  docsDir?: string;

  /**
   * Configure custom base path to your component stories
   * @default ../src (relative from .storybook folder)
   */
  storiesDir?: string;

  /**
   * Path to your TSConfig file
   * @default .storybook/tsconfig.json
   */
  tsconfig?: string;

  /**
   * Configure TSConfig Paths plugin
   */
  tspaths?: TsConfigPathOptions;

  /**
   * Set watching mode for Vite
   * @default fsevents
   */
  watchMode?: 'fsevents' | 'polling';

  /**
   * Sets the port on which Vite serves the resources
   * This should be the same port you are using with storybook cli!
   *
   * @default 6006
   */
  port?: number;

  /**
   * Configure Qwik Vite Plugin
   */
  qwik?: QwikVitePluginOptions;

  /**
   * Configure Vite
   */
  vite?: UserConfig;

  /**
   * Add extra plugins to Vite
   */
  plugins?: PluginOption[];
}

/**
 * Configure storybook to serve a Qwik project and allow custom overwrites. By default, it will read all of your stories
 * in `docs` and `src` folders, and serve the UI on 6006.
 *
 * Usage:
 * ```typescript
 * // .storybook/main.ts
 * import { defineConfig } from "@qwik-ui/storybook";
 *
 * export default defineConfig();
 * ```
 *
 * @param {StorybookConfig} customConfig
 * @return {StorybookConfig}
 */
export function defineConfig(customConfig?: CustomConfig): StorybookConfig {
  const plugins = customConfig?.plugins ?? [];
  if ('plugins' in customConfig) delete customConfig.plugins;

  return {
    stories: [
      `${customConfig?.docsDir ?? '../docs'}/**/*.stories.@(js|jsx|ts|tsx)`,
      `${customConfig?.docsDir ?? '../docs'}/**/*.mdx`,
      `${customConfig?.storiesDir ?? '../src'}/**/*.stories.@(js|jsx|ts|tsx)`,
      `${customConfig?.storiesDir ?? '../src'}/**/*.mdx`,
    ],
    framework: '@qwik-ui/storybook',
    addons: [
      '@storybook/addon-links',
      '@storybook/addon-essentials',
      '@storybook/addon-storysource',
      '@storybook/addon-a11y',
    ],
    docs: {
      defaultName: 'Overview',
      autodocs: 'tag',
    },
    ...(customConfig ?? {}),
    async viteFinal(config: UserConfig) {
      // Add Qwik parser
      config.plugins.unshift(
        qwikVite({
          srcDir: '.storybook',
          ...(customConfig?.qwik ?? {}),
        })
      );

      // Add Typescript path resolution
      config.plugins.unshift(
        tsConfigPaths({
          projects: [customConfig?.tsconfig ?? '.storybook/tsconfig.json'],
          ...(customConfig?.tspaths ?? {}),
        })
      );

      // Add any custom plugins
      plugins.reverse().forEach((plugin) => config.plugins.unshift(plugin));

      // Configure the development server
      config.server = customConfig?.vite?.server ?? config?.server ?? {};
      config.server.port = customConfig?.port ?? 6006;

      // Configure watch mode, and as a default use fsevents
      config.server.watch = { useFsEvents: true };
      if (customConfig?.watchMode == 'polling')
        config.server.watch = { usePolling: true, interval: 3000 };

      return config;
    },
  };
}
