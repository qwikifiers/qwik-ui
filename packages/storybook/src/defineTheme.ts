import type { ThemeVars } from '@storybook/theming';
import { create } from '@storybook/theming';

/**
 * Create a Qwik-UI styled Storybook theme
 *
 * @param {ThemeVars} customConfig
 * @return {ThemeVars}
 */
export function defineTheme(customConfig?: ThemeVars): ThemeVars {
  return create({
    base: 'dark',
    brandTitle: 'Qwik UI',
    brandImage:
      'https://github.com/qwikifiers/qwik-ui/raw/main/apps/website/public/qwik-ui.png',
    brandTarget: '_self',

    colorPrimary: '#18b6f6',
    colorSecondary: '#AC7FF4',

    appBg: '#000000',
    appContentBg: '#101010',
    appBorderColor: '#000000',
    appBorderRadius: 0,

    barTextColor: '#000000',
    barSelectedColor: '#AC7FF4',
    barBg: '#18b6f6',
  });
}
