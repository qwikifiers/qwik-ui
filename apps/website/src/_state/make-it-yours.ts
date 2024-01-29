export interface Theme {
  mode: 'light' | 'dark';
  style: 'simple' | 'brutalist' | 'neumorphic';
  colorTheme:
    | 'red-100'
    | 'orange-100'
    | 'amber-100'
    | 'yellow-100'
    | 'lime-100'
    | 'green-100'
    | 'emerald-100'
    | 'teal-100'
    | 'cyan-100'
    | 'sky-100'
    | 'blue-100'
    | 'indigo-100'
    | 'violet-100'
    | 'purple-100'
    | 'fuchsia-100'
    | 'pink-100'
    | 'rose-100'
    | 'red-200'
    | 'orange-200'
    | 'amber-200'
    | 'yellow-200'
    | 'lime-200'
    | 'green-200'
    | 'emerald-200'
    | 'teal-200'
    | 'cyan-200'
    | 'sky-200'
    | 'blue-200'
    | 'indigo-200'
    | 'violet-200'
    | 'purple-200'
    | 'fuchsia-200'
    | 'pink-200'
    | 'rose-200'
    | 'red-300'
    | 'orange-300'
    | 'amber-300'
    | 'yellow-300'
    | 'lime-300'
    | 'green-300'
    | 'emerald-300'
    | 'teal-300'
    | 'cyan-300'
    | 'sky-300'
    | 'blue-300'
    | 'indigo-300'
    | 'violet-300'
    | 'purple-300'
    | 'fuchsia-300'
    | 'pink-300'
    | 'rose-300'
    | 'red-400'
    | 'orange-400'
    | 'amber-400'
    | 'yellow-400'
    | 'lime-400'
    | 'green-400'
    | 'emerald-400'
    | 'teal-400'
    | 'cyan-400'
    | 'sky-400'
    | 'blue-400'
    | 'indigo-400'
    | 'violet-400'
    | 'purple-400'
    | 'fuchsia-400'
    | 'pink-400'
    | 'rose-400'
    | 'red-500'
    | 'orange-500'
    | 'amber-500'
    | 'yellow-500'
    | 'lime-500'
    | 'green-500'
    | 'emerald-500'
    | 'teal-500'
    | 'cyan-500'
    | 'sky-500'
    | 'blue-500'
    | 'indigo-500'
    | 'violet-500'
    | 'purple-500'
    | 'fuchsia-500'
    | 'pink-500'
    | 'rose-500'
    | 'red-600'
    | 'orange-600'
    | 'amber-600'
    | 'yellow-600'
    | 'lime-600'
    | 'green-600'
    | 'emerald-600'
    | 'teal-600'
    | 'cyan-600'
    | 'sky-600'
    | 'blue-600'
    | 'indigo-600'
    | 'violet-600'
    | 'purple-600'
    | 'fuchsia-600'
    | 'pink-600'
    | 'rose-600'
    | 'red-700'
    | 'orange-700'
    | 'amber-700'
    | 'yellow-700'
    | 'lime-700'
    | 'green-700'
    | 'emerald-700'
    | 'teal-700'
    | 'cyan-700'
    | 'sky-700'
    | 'blue-700'
    | 'indigo-700'
    | 'violet-700'
    | 'purple-700'
    | 'fuchsia-700'
    | 'pink-700'
    | 'rose-700'
    | 'red-800'
    | 'orange-800'
    | 'amber-800'
    | 'yellow-800'
    | 'lime-800'
    | 'green-800'
    | 'emerald-800'
    | 'teal-800'
    | 'cyan-800'
    | 'sky-800'
    | 'blue-800'
    | 'indigo-800'
    | 'violet-800'
    | 'purple-800'
    | 'fuchsia-800'
    | 'pink-800'
    | 'rose-800'
    | 'red-900'
    | 'orange-900'
    | 'amber-900'
    | 'yellow-900'
    | 'lime-900'
    | 'green-900'
    | 'emerald-900'
    | 'teal-900'
    | 'cyan-900'
    | 'sky-900'
    | 'blue-900'
    | 'indigo-900'
    | 'violet-900'
    | 'purple-900'
    | 'fuchsia-900'
    | 'pink-900'
    | 'rose-900';

  contrast: 'low-contrast' | 'high-contrast';
  borderRadius:
    | 'border-radius-0'
    | 'border-radius-025'
    | 'border-radius-050'
    | 'border-radius-075'
    | 'border-radius-1';
}

export const colorThemeOptions: Theme['colorTheme'][] = [
  'red-100',
  'orange-100',
  'amber-100',
  'yellow-100',
  'lime-100',
  'green-100',
  'emerald-100',
  'teal-100',
  'cyan-100',
  'sky-100',
  'blue-100',
  'indigo-100',
  'violet-100',
  'purple-100',
  'fuchsia-100',
  'pink-100',
  'rose-100',
  'red-200',
  'orange-200',
  'amber-200',
  'yellow-200',
  'lime-200',
  'green-200',
  'emerald-200',
  'teal-200',
  'cyan-200',
  'sky-200',
  'blue-200',
  'indigo-200',
  'violet-200',
  'purple-200',
  'fuchsia-200',
  'pink-200',
  'rose-200',
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
  'red-800',
  'orange-800',
  'amber-800',
  'yellow-800',
  'lime-800',
  'green-800',
  'emerald-800',
  'teal-800',
  'cyan-800',
  'sky-800',
  'blue-800',
  'indigo-800',
  'violet-800',
  'purple-800',
  'fuchsia-800',
  'pink-800',
  'rose-800',
  'red-900',
  'orange-900',
  'amber-900',
  'yellow-900',
  'lime-900',
  'green-900',
  'emerald-900',
  'teal-900',
  'cyan-900',
  'sky-900',
  'blue-900',
  'indigo-900',
  'violet-900',
  'purple-900',
  'fuchsia-900',
  'pink-900',
  'rose-900',
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
