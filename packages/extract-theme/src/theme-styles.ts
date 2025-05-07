import { ObjectValues } from './type-utils';

export const ThemeStyles = {
  SIMPLE: 'simple',
  BRUTALIST: 'brutalist',
  NEUMORPHIC: 'neumorphic',
} as const;

export type ThemeStyle = ObjectValues<typeof ThemeStyles>;
