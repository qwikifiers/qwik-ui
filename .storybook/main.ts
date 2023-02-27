import { qwikVite } from '@builder.io/qwik/optimizer';
import tsConfigPaths from 'vite-tsconfig-paths';
import type { UserConfig } from 'vite';
import { qwikNxVite } from 'qwik-nx/plugins';

export default {
  stories: [`../docs/**/*.stories.@(js|jsx|ts|tsx)`, `../docs/**/*.mdx`],
  framework: 'storybook-framework-qwik',
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
  async viteFinal(config: UserConfig) {
    config.plugins.unshift(qwikVite({ srcDir: '.storybook' }));
    config.plugins.unshift(tsConfigPaths({ projects: ['tsconfig.json'] }));
    config.plugins.unshift(qwikNxVite());

    config.server = config?.server ?? {};
    config.server.port = 6006;
    config.server.watch = { usePolling: true, interval: 3000 };

    return config;
  },
};
