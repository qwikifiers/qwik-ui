import { ObjectValues } from '../type-utils';

export const ThemeBaseColors = {
  SLATE: 'base-slate',
  GRAY: 'base-gray',
  ZINC: 'base-zinc',
  NEUTRAL: 'base-neutral',
  STONE: 'base-stone',
} as const;

export type ThemeBaseColor = ObjectValues<typeof ThemeBaseColors>;
