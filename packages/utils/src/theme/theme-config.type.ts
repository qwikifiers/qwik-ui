import { BorderRadius } from './border-radius.type';
import { ThemeStyle } from './theme-style.enum';

export type ThemeConfig = {
  style?: ThemeStyle;
  borderRadius?: BorderRadius;
  primaryColor?: string;
  baseColor?: string;
};
