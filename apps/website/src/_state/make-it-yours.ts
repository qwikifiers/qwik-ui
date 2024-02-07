export interface Theme {
  mode: 'light' | 'dark';
  style: 'simple' | 'brutalist' | 'neumorphic';
  base: 'base-slate' | 'base-gray' | 'base-zinc' | 'base-neutral' | 'base-stone';
  primary:
    | 'primary-slate-100'
    | 'primary-gray-100'
    | 'primary-zinc-100'
    | 'primary-neutral-100'
    | 'primary-stone-100'
    | 'primary-red-100'
    | 'primary-orange-100'
    | 'primary-amber-100'
    | 'primary-yellow-100'
    | 'primary-lime-100'
    | 'primary-green-100'
    | 'primary-emerald-100'
    | 'primary-teal-100'
    | 'primary-cyan-100'
    | 'primary-sky-100'
    | 'primary-blue-100'
    | 'primary-indigo-100'
    | 'primary-violet-100'
    | 'primary-purple-100'
    | 'primary-fuchsia-100'
    | 'primary-pink-100'
    | 'primary-rose-100'
    | 'primary-slate-200'
    | 'primary-gray-200'
    | 'primary-zinc-200'
    | 'primary-neutral-200'
    | 'primary-stone-200'
    | 'primary-red-200'
    | 'primary-orange-200'
    | 'primary-amber-200'
    | 'primary-yellow-200'
    | 'primary-lime-200'
    | 'primary-green-200'
    | 'primary-emerald-200'
    | 'primary-teal-200'
    | 'primary-cyan-200'
    | 'primary-sky-200'
    | 'primary-blue-200'
    | 'primary-indigo-200'
    | 'primary-violet-200'
    | 'primary-purple-200'
    | 'primary-fuchsia-200'
    | 'primary-pink-200'
    | 'primary-rose-200'
    | 'primary-slate-300'
    | 'primary-gray-300'
    | 'primary-zinc-300'
    | 'primary-neutral-300'
    | 'primary-stone-300'
    | 'primary-red-300'
    | 'primary-orange-300'
    | 'primary-amber-300'
    | 'primary-yellow-300'
    | 'primary-lime-300'
    | 'primary-green-300'
    | 'primary-emerald-300'
    | 'primary-teal-300'
    | 'primary-cyan-300'
    | 'primary-sky-300'
    | 'primary-blue-300'
    | 'primary-indigo-300'
    | 'primary-violet-300'
    | 'primary-purple-300'
    | 'primary-fuchsia-300'
    | 'primary-pink-300'
    | 'primary-rose-300'
    | 'primary-slate-400'
    | 'primary-gray-400'
    | 'primary-zinc-400'
    | 'primary-neutral-400'
    | 'primary-stone-400'
    | 'primary-red-400'
    | 'primary-orange-400'
    | 'primary-amber-400'
    | 'primary-yellow-400'
    | 'primary-lime-400'
    | 'primary-green-400'
    | 'primary-emerald-400'
    | 'primary-teal-400'
    | 'primary-cyan-400'
    | 'primary-sky-400'
    | 'primary-blue-400'
    | 'primary-indigo-400'
    | 'primary-violet-400'
    | 'primary-purple-400'
    | 'primary-fuchsia-400'
    | 'primary-pink-400'
    | 'primary-rose-400'
    | 'primary-slate-500'
    | 'primary-gray-500'
    | 'primary-zinc-500'
    | 'primary-neutral-500'
    | 'primary-stone-500'
    | 'primary-red-500'
    | 'primary-orange-500'
    | 'primary-amber-500'
    | 'primary-yellow-500'
    | 'primary-lime-500'
    | 'primary-green-500'
    | 'primary-emerald-500'
    | 'primary-teal-500'
    | 'primary-cyan-500'
    | 'primary-sky-500'
    | 'primary-blue-500'
    | 'primary-indigo-500'
    | 'primary-violet-500'
    | 'primary-purple-500'
    | 'primary-fuchsia-500'
    | 'primary-pink-500'
    | 'primary-rose-500'
    | 'primary-slate-600'
    | 'primary-gray-600'
    | 'primary-zinc-600'
    | 'primary-neutral-600'
    | 'primary-stone-600'
    | 'primary-red-600'
    | 'primary-orange-600'
    | 'primary-amber-600'
    | 'primary-yellow-600'
    | 'primary-lime-600'
    | 'primary-green-600'
    | 'primary-emerald-600'
    | 'primary-teal-600'
    | 'primary-cyan-600'
    | 'primary-sky-600'
    | 'primary-blue-600'
    | 'primary-indigo-600'
    | 'primary-violet-600'
    | 'primary-purple-600'
    | 'primary-fuchsia-600'
    | 'primary-pink-600'
    | 'primary-rose-600'
    | 'primary-slate-700'
    | 'primary-gray-700'
    | 'primary-zinc-700'
    | 'primary-neutral-700'
    | 'primary-stone-700'
    | 'primary-red-700'
    | 'primary-orange-700'
    | 'primary-amber-700'
    | 'primary-yellow-700'
    | 'primary-lime-700'
    | 'primary-green-700'
    | 'primary-emerald-700'
    | 'primary-teal-700'
    | 'primary-cyan-700'
    | 'primary-sky-700'
    | 'primary-blue-700'
    | 'primary-indigo-700'
    | 'primary-violet-700'
    | 'primary-purple-700'
    | 'primary-fuchsia-700'
    | 'primary-pink-700'
    | 'primary-rose-700'
    | 'primary-slate-800'
    | 'primary-gray-800'
    | 'primary-zinc-800'
    | 'primary-neutral-800'
    | 'primary-stone-800'
    | 'primary-red-800'
    | 'primary-orange-800'
    | 'primary-amber-800'
    | 'primary-yellow-800'
    | 'primary-lime-800'
    | 'primary-green-800'
    | 'primary-emerald-800'
    | 'primary-teal-800'
    | 'primary-cyan-800'
    | 'primary-sky-800'
    | 'primary-blue-800'
    | 'primary-indigo-800'
    | 'primary-violet-800'
    | 'primary-purple-800'
    | 'primary-fuchsia-800'
    | 'primary-pink-800'
    | 'primary-rose-800'
    | 'primary-slate-900'
    | 'primary-gray-900'
    | 'primary-zinc-900'
    | 'primary-neutral-900'
    | 'primary-stone-900'
    | 'primary-red-900'
    | 'primary-orange-900'
    | 'primary-amber-900'
    | 'primary-yellow-900'
    | 'primary-lime-900'
    | 'primary-green-900'
    | 'primary-emerald-900'
    | 'primary-teal-900'
    | 'primary-cyan-900'
    | 'primary-sky-900'
    | 'primary-blue-900'
    | 'primary-indigo-900'
    | 'primary-violet-900'
    | 'primary-purple-900'
    | 'primary-fuchsia-900'
    | 'primary-pink-900'
    | 'primary-rose-900';

  contrast: 'low-contrast' | 'high-contrast';
  borderRadius:
    | 'border-radius-0'
    | 'border-radius-025'
    | 'border-radius-050'
    | 'border-radius-075'
    | 'border-radius-1';
}

export const baseOptions: Theme['base'][] = [
  'base-slate',
  'base-gray',
  'base-zinc',
  'base-neutral',
  'base-stone',
];

export const primaryOptions: Theme['primary'][] = [
  'primary-slate-100',
  'primary-gray-100',
  'primary-zinc-100',
  'primary-neutral-100',
  'primary-stone-100',
  'primary-red-100',
  'primary-orange-100',
  'primary-amber-100',
  'primary-yellow-100',
  'primary-lime-100',
  'primary-green-100',
  'primary-emerald-100',
  'primary-teal-100',
  'primary-cyan-100',
  'primary-sky-100',
  'primary-blue-100',
  'primary-indigo-100',
  'primary-violet-100',
  'primary-purple-100',
  'primary-fuchsia-100',
  'primary-pink-100',
  'primary-rose-100',

  'primary-slate-200',
  'primary-gray-200',
  'primary-zinc-200',
  'primary-neutral-200',
  'primary-stone-200',
  'primary-red-200',
  'primary-orange-200',
  'primary-amber-200',
  'primary-yellow-200',
  'primary-lime-200',
  'primary-green-200',
  'primary-emerald-200',
  'primary-teal-200',
  'primary-cyan-200',
  'primary-sky-200',
  'primary-blue-200',
  'primary-indigo-200',
  'primary-violet-200',
  'primary-purple-200',
  'primary-fuchsia-200',
  'primary-pink-200',
  'primary-rose-200',

  'primary-slate-300',
  'primary-gray-300',
  'primary-zinc-300',
  'primary-neutral-300',
  'primary-stone-300',
  'primary-red-300',
  'primary-orange-300',
  'primary-amber-300',
  'primary-yellow-300',
  'primary-lime-300',
  'primary-green-300',
  'primary-emerald-300',
  'primary-teal-300',
  'primary-cyan-300',
  'primary-sky-300',
  'primary-blue-300',
  'primary-indigo-300',
  'primary-violet-300',
  'primary-purple-300',
  'primary-fuchsia-300',
  'primary-pink-300',
  'primary-rose-300',

  'primary-slate-400',
  'primary-gray-400',
  'primary-zinc-400',
  'primary-neutral-400',
  'primary-stone-400',
  'primary-red-400',
  'primary-orange-400',
  'primary-amber-400',
  'primary-yellow-400',
  'primary-lime-400',
  'primary-green-400',
  'primary-emerald-400',
  'primary-teal-400',
  'primary-cyan-400',
  'primary-sky-400',
  'primary-blue-400',
  'primary-indigo-400',
  'primary-violet-400',
  'primary-purple-400',
  'primary-fuchsia-400',
  'primary-pink-400',
  'primary-rose-400',

  'primary-slate-500',
  'primary-gray-500',
  'primary-zinc-500',
  'primary-neutral-500',
  'primary-stone-500',
  'primary-red-500',
  'primary-orange-500',
  'primary-amber-500',
  'primary-yellow-500',
  'primary-lime-500',
  'primary-green-500',
  'primary-emerald-500',
  'primary-teal-500',
  'primary-cyan-500',
  'primary-sky-500',
  'primary-blue-500',
  'primary-indigo-500',
  'primary-violet-500',
  'primary-purple-500',
  'primary-fuchsia-500',
  'primary-pink-500',
  'primary-rose-500',

  'primary-slate-600',
  'primary-gray-600',
  'primary-zinc-600',
  'primary-neutral-600',
  'primary-stone-600',
  'primary-red-600',
  'primary-orange-600',
  'primary-amber-600',
  'primary-yellow-600',
  'primary-lime-600',
  'primary-green-600',
  'primary-emerald-600',
  'primary-teal-600',
  'primary-cyan-600',
  'primary-sky-600',
  'primary-blue-600',
  'primary-indigo-600',
  'primary-violet-600',
  'primary-purple-600',
  'primary-fuchsia-600',
  'primary-pink-600',
  'primary-rose-600',

  'primary-slate-700',
  'primary-gray-700',
  'primary-zinc-700',
  'primary-neutral-700',
  'primary-stone-700',
  'primary-red-700',
  'primary-orange-700',
  'primary-amber-700',
  'primary-yellow-700',
  'primary-lime-700',
  'primary-green-700',
  'primary-emerald-700',
  'primary-teal-700',
  'primary-cyan-700',
  'primary-sky-700',
  'primary-blue-700',
  'primary-indigo-700',
  'primary-violet-700',
  'primary-purple-700',
  'primary-fuchsia-700',
  'primary-pink-700',
  'primary-rose-700',

  'primary-slate-800',
  'primary-gray-800',
  'primary-zinc-800',
  'primary-neutral-800',
  'primary-stone-800',
  'primary-red-800',
  'primary-orange-800',
  'primary-amber-800',
  'primary-yellow-800',
  'primary-lime-800',
  'primary-green-800',
  'primary-emerald-800',
  'primary-teal-800',
  'primary-cyan-800',
  'primary-sky-800',
  'primary-blue-800',
  'primary-indigo-800',
  'primary-violet-800',
  'primary-purple-800',
  'primary-fuchsia-800',
  'primary-pink-800',
  'primary-rose-800',

  'primary-slate-900',
  'primary-gray-900',
  'primary-zinc-900',
  'primary-neutral-900',
  'primary-stone-900',
  'primary-red-900',
  'primary-orange-900',
  'primary-amber-900',
  'primary-yellow-900',
  'primary-lime-900',
  'primary-green-900',
  'primary-emerald-900',
  'primary-teal-900',
  'primary-cyan-900',
  'primary-sky-900',
  'primary-blue-900',
  'primary-indigo-900',
  'primary-violet-900',
  'primary-purple-900',
  'primary-fuchsia-900',
  'primary-pink-900',
  'primary-rose-900',
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
