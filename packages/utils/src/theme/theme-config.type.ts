import { ThemeBaseColor } from './theme-base-color.enum';
import { ThemeBorderRadius } from './theme-border-radius.enum';
import { ThemePrimaryColor } from './theme-primary-color.enum';
import { ThemeFont } from './theme-font.enum';
import { ThemeMode } from './theme-mode-enum';
import { ThemeStyle } from './theme-style.enum';

export type ThemeConfig = {
  font?: ThemeFont | string;
  mode?: ThemeMode | string;
  style?: ThemeStyle | string;
  borderRadius?: ThemeBorderRadius | string;
  primaryColor?: ThemePrimaryColor | string;
  baseColor?: ThemeBaseColor | string;
};
