export interface Theme {
  mode: 'light' | 'dark';
  style: 'simple' | 'brutalist' | 'neumorphic';
  colorTheme:
    | 'slate'
    | 'gray'
    | 'zinc'
    | 'neutral'
    | 'stone'
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'violet'
    | 'rose';
  contrast: 'low-contrast' | 'high-contrast';
  borderRadius:
    | 'border-radius-0'
    | 'border-radius-025'
    | 'border-radius-050'
    | 'border-radius-075'
    | 'border-radius-1';
}

export const colorThemeOptions: Theme['colorTheme'][] = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'violet',
  'rose',
];

export const styleOptions: Theme['style'][] = ['simple', 'brutalist', 'neumorphic'];

export const borderRadiusOptions: Theme['borderRadius'][] = [
  'border-radius-0',
  'border-radius-025',
  'border-radius-050',
  'border-radius-075',
  'border-radius-1',
];

export const contrastOptions: Theme['contrast'][] = ['high-contrast', 'low-contrast'];

export const modeOptions: Theme['mode'][] = ['light', 'dark'];
