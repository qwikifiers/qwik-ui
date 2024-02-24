import type { ThemeConfig } from '@qwik-ui/utils';

export interface SetupTailwindGeneratorSchema extends ThemeConfig {
  projectRoot?: string;
  rootCssPath?: string;
}
