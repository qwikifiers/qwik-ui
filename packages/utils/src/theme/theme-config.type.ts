import { type ThemeBaseColor } from './theme-base-colors';
import { ThemeBorderRadius } from './theme-border-radiuses';
import { type ThemeFont } from './theme-fonts';
import { type ThemeMode } from './theme-modes';
import { type ThemePrimaryColor } from './theme-primary-colors';
import { type ThemeStyle } from './theme-styles';

export type ThemeConfig = {
  font?: ThemeFont | string;
  mode?: ThemeMode | string;
  style?: ThemeStyle | string;
  borderRadius?: ThemeBorderRadius | string;
  primaryColor?: ThemePrimaryColor | string;
  baseColor?: ThemeBaseColor | string;
};
