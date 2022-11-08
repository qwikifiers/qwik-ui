import { nxE2EStorybookPreset } from '@nrwl/storybook/presets/cypress';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EStorybookPreset(__dirname),
    // setupNodeEvents(on, config) {
    //   coverageTask(on, config);
    //   // include any other plugin code...

    //   // It's IMPORTANT to return the config object
    //   // with any changed environment variables
    //   return config;
    // },
  },
});
