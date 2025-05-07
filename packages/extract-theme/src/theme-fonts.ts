import { ObjectValues } from './type-utils';

export const ThemeFonts = {
  MONO: 'font-mono',
  SANS: 'font-sans',
  SERIF: 'font-serif',
  SOURCE_SERIF_PRO: 'font-source-serif-pro',
  LONDRA_SHADOW: 'font-londra-shadow',
  RUBIK_DOODLE_SHADOW: 'font-rubik-doodle-shadow',
} as const;

export type ThemeFont = ObjectValues<typeof ThemeFonts>;
