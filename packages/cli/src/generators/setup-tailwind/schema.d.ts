import type { ThemeConfig } from '@qwik-ui/extract-theme';

export interface SetupTailwindGeneratorSchema extends ThemeConfig {
  projectRoot?: string;
  rootCssPath?: string;
}
