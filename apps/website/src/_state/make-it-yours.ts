export interface Theme {
  mode: 'light' | 'dark';
  style: 'simple' | 'brutalist' | 'neumorphic';
  colorTheme:
    | 'red-300'
    | 'red-400'
    | 'red-500'
    | 'red-600'
    | 'red-700'
    | 'orange-300'
    | 'orange-400'
    | 'orange-500'
    | 'orange-600'
    | 'orange-700'
    | 'amber-300'
    | 'amber-400'
    | 'amber-500'
    | 'amber-600'
    | 'amber-700'
    | 'yellow-300'
    | 'yellow-400'
    | 'yellow-500'
    | 'yellow-600'
    | 'yellow-700'
    | 'lime-300'
    | 'lime-400'
    | 'lime-500'
    | 'lime-600'
    | 'lime-700'
    | 'green-300'
    | 'green-400'
    | 'green-500'
    | 'green-600'
    | 'green-700'
    | 'emerald-300'
    | 'emerald-400'
    | 'emerald-500'
    | 'emerald-600'
    | 'emerald-700'
    | 'teal-300'
    | 'teal-400'
    | 'teal-500'
    | 'teal-600'
    | 'teal-700'
    | 'cyan-300'
    | 'cyan-400'
    | 'cyan-500'
    | 'cyan-600'
    | 'cyan-700'
    | 'sky-300'
    | 'sky-400'
    | 'sky-500'
    | 'sky-600'
    | 'sky-700'
    | 'blue-300'
    | 'blue-400'
    | 'blue-500'
    | 'blue-600'
    | 'blue-700'
    | 'indigo-300'
    | 'indigo-400'
    | 'indigo-500'
    | 'indigo-600'
    | 'indigo-700'
    | 'violet-300'
    | 'violet-400'
    | 'violet-500'
    | 'violet-600'
    | 'violet-700'
    | 'purple-300'
    | 'purple-400'
    | 'purple-500'
    | 'purple-600'
    | 'purple-700'
    | 'fuchsia-300'
    | 'fuchsia-400'
    | 'fuchsia-500'
    | 'fuchsia-600'
    | 'fuchsia-700'
    | 'pink-300'
    | 'pink-400'
    | 'pink-500'
    | 'pink-600'
    | 'pink-700'
    | 'rose-300'
    | 'rose-400'
    | 'rose-500'
    | 'rose-600'
    | 'rose-700';

  contrast: 'low-contrast' | 'high-contrast';
  borderRadius:
    | 'border-radius-0'
    | 'border-radius-025'
    | 'border-radius-050'
    | 'border-radius-075'
    | 'border-radius-1';
}

export const colorThemeOptions: Theme['colorTheme'][] = [
  'red-300',
  'orange-300',
  'amber-300',
  'yellow-300',
  'lime-300',
  'green-300',
  'emerald-300',
  'teal-300',
  'cyan-300',
  'sky-300',
  'blue-300',
  'indigo-300',
  'violet-300',
  'purple-300',
  'fuchsia-300',
  'pink-300',
  'rose-300',
  'red-400',
  'orange-400',
  'amber-400',
  'yellow-400',
  'lime-400',
  'green-400',
  'emerald-400',
  'teal-400',
  'cyan-400',
  'sky-400',
  'blue-400',
  'indigo-400',
  'violet-400',
  'purple-400',
  'fuchsia-400',
  'pink-400',
  'rose-400',
  'red-500',
  'orange-500',
  'amber-500',
  'yellow-500',
  'lime-500',
  'green-500',
  'emerald-500',
  'teal-500',
  'cyan-500',
  'sky-500',
  'blue-500',
  'indigo-500',
  'violet-500',
  'purple-500',
  'fuchsia-500',
  'pink-500',
  'rose-500',
  'red-600',
  'orange-600',
  'amber-600',
  'yellow-600',
  'lime-600',
  'green-600',
  'emerald-600',
  'teal-600',
  'cyan-600',
  'sky-600',
  'blue-600',
  'indigo-600',
  'violet-600',
  'purple-600',
  'fuchsia-600',
  'pink-600',
  'rose-600',
  'red-700',
  'orange-700',
  'amber-700',
  'yellow-700',
  'lime-700',
  'green-700',
  'emerald-700',
  'teal-700',
  'cyan-700',
  'sky-700',
  'blue-700',
  'indigo-700',
  'violet-700',
  'purple-700',
  'fuchsia-700',
  'pink-700',
  'rose-700',
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
