import type { StorybookConfig } from '@storybook/types';

export const rootMain: StorybookConfig = {
  core: {
    disableTelemetry: true,
  },

  // webpackFinal: async (config, { configType }) => {
  //   // Make whatever fine-grained changes you need that should apply to all storybook configs

  //   // Return the altered config
  //   return config;
  // },
};
