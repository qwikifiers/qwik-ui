import { ObjectValues } from './type-utils';

export const ThemeModes = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type ThemeMode = ObjectValues<typeof ThemeModes>;
