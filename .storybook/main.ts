import type { StorybookConfig } from '@storybook/types';

export const rootMain: StorybookConfig = {
  stories: [],
  core: {
    disableTelemetry: true,
  },
  addons: ['@storybook/addon-essentials'],
  // webpackFinal: async (config, { configType }) => {
  //   // Make whatever fine-grained changes you need that should apply to all storybook configs

  //   // Return the altered config
  //   return config;
  // },
};
