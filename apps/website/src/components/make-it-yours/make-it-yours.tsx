import { $, PropsOf, component$, useComputed$ } from '@builder.io/qwik';
import { Modal, Button, buttonVariants } from '~/components/ui';
import {
  ThemeBaseColor,
  ThemeBorderRadius,
  ThemeConfig,
  ThemeFont,
  ThemeMode,
  ThemePrimaryColor,
  ThemeStyle,
  cn,
} from '@qwik-ui/utils';
import { LuSlidersHorizontal, LuX } from '@qwikest/icons/lucide';
import { useTheme } from 'qwik-themes';

import CopyCssConfig from '../copy-css-config/copy-css-config';
import { useAppState } from '~/_state/use-app-state';

export default component$<PropsOf<typeof Button>>(() => {
  const rootStore = useAppState();

  const { theme, setTheme } = useTheme();

  const themeComputedObjectSig = useComputed$((): ThemeConfig => {
    if (!theme || theme === 'light') {
      return {
        font: ThemeFont.SANS,
        mode: ThemeMode.LIGHT,
        style: ThemeStyle.SIMPLE,
        baseColor: ThemeBaseColor.SLATE,
        primaryColor: ThemePrimaryColor.CYAN600,
        borderRadius: ThemeBorderRadius['BORDER-RADIUS-0'],
      };
    }

    if (theme === 'dark') {
      return {
        font: ThemeFont.SANS,
        mode: ThemeMode.DARK,
        style: ThemeStyle.SIMPLE,
        baseColor: ThemeBaseColor.SLATE,
        primaryColor: ThemePrimaryColor.CYAN600,
        borderRadius: ThemeBorderRadius['BORDER-RADIUS-0'],
      };
    }

    const themeArray = Array.isArray(theme) ? theme : theme.split(' ');
    return {
      font: themeArray[0],
      mode: themeArray[1],
      style: themeArray[2],
      baseColor: themeArray[3],
      primaryColor: themeArray[4],
      borderRadius: themeArray[5],
    };
  });

  const themeStoreToThemeClasses$ = $((): string => {
    const { font, mode, style, baseColor, primaryColor, borderRadius } =
      themeComputedObjectSig.value;
    return [font, mode, style, baseColor, primaryColor, borderRadius].join(' ');
  });
  return (
    <Modal.Root>
      <Modal.Trigger
        class={cn(
          buttonVariants({ size: 'sm', look: 'outline' }),
          'flex sm:mr-2 sm:h-10',
        )}
      >
        <LuSlidersHorizontal class={cn('h-4 w-4 sm:mr-2')} />
        <span class={cn('hidden', 'sm:block')}>Make it yours</span>
      </Modal.Trigger>
      <Modal.Panel position="right">
        <header class="flex w-full">
          <h2 class="justify-self-start text-lg font-bold">Edit Profile</h2>
        </header>
        <div class="mb-2 mt-8 py-4">
          <label class="mb-1 block font-medium">Preset</label>
          <select
            class="h-12 w-full rounded-base border bg-background p-2"
            value={themeComputedObjectSig.value.style}
            onChange$={async (e, el) => {
              if (el.value === 'simple') {
                themeComputedObjectSig.value.font = ThemeFont.SANS;
              }
              if (el.value === 'brutalist') {
                themeComputedObjectSig.value.font = ThemeFont.MONO;
              }
              if (el.value === 'neumorphic') {
                themeComputedObjectSig.value.font = ThemeFont.SANS;
              }
              themeComputedObjectSig.value.style = el.value;
              setTheme(await themeStoreToThemeClasses$());
            }}
          >
            <option value={'simple'}>Simple</option>
            <option value={'brutalist'}>Brutalist</option>
            {rootStore.featureFlags?.showNeumorphic && (
              <option value={'neumorphic'}>Neumorphic</option>
            )}
          </select>

          <label class="mb-1 mt-8 block font-medium">Base</label>
          <div class="flex">
            {Object.values(ThemeBaseColor).map((baseColor: string) => {
              const isActive = themeComputedObjectSig.value.baseColor === baseColor;

              return (
                <Button
                  key={baseColor}
                  look="ghost"
                  size="icon"
                  onClick$={async () => {
                    themeComputedObjectSig.value.baseColor = baseColor;

                    setTheme(await themeStoreToThemeClasses$());
                  }}
                  class={cn(
                    'flex h-3 w-3 items-center justify-center rounded-none',
                    isActive && 'border-2 border-ring',
                  )}
                >
                  <span
                    class={cn(
                      'flex h-[10px] w-[10px] shrink-0 rounded-none',
                      baseColor === 'base-slate' && 'bg-slate-500',
                      baseColor === 'base-gray' && 'bg-gray-500',
                      baseColor === 'base-neutral' && 'bg-neutral-500',
                      baseColor === 'base-zinc' && 'bg-zinc-500',
                      baseColor === 'base-stone' && 'bg-stone-500',
                    )}
                  />
                </Button>
              );
            })}
          </div>

          <label class="mb-1 mt-8 block font-medium">Primary</label>
          <div class="flex justify-end">
            <div class="grid grid-cols-[repeat(22,0fr)]">
              {Object.values(ThemePrimaryColor).map((primaryColor: string) => {
                const isActive =
                  themeComputedObjectSig.value.primaryColor === primaryColor;

                if (
                  primaryColor.includes('slate-100') ||
                  primaryColor.includes('gray-100') ||
                  primaryColor.includes('zinc-100') ||
                  primaryColor.includes('neutral-100') ||
                  primaryColor.includes('stone-100') ||
                  primaryColor.includes('slate-200') ||
                  primaryColor.includes('gray-200') ||
                  primaryColor.includes('zinc-200') ||
                  primaryColor.includes('neutral-200') ||
                  primaryColor.includes('stone-200')
                ) {
                  return <span key={primaryColor}></span>;
                }

                return (
                  <Button
                    key={primaryColor}
                    look="ghost"
                    size="icon"
                    onClick$={async () => {
                      themeComputedObjectSig.value.primaryColor = primaryColor;
                      setTheme(await themeStoreToThemeClasses$());
                    }}
                    class={cn(
                      'h-3 w-3 rounded-none',
                      isActive && 'border-[1px] border-ring',
                    )}
                  >
                    {(primaryColor === 'primary-slate-800' ||
                      primaryColor === 'primary-gray-800' ||
                      primaryColor === 'primary-zinc-800' ||
                      primaryColor === 'primary-neutral-800' ||
                      primaryColor === 'primary-stone-800' ||
                      primaryColor === 'primary-slate-900' ||
                      primaryColor === 'primary-gray-900' ||
                      primaryColor === 'primary-zinc-900' ||
                      primaryColor === 'primary-neutral-900' ||
                      primaryColor === 'primary-stone-900') &&
                    theme?.includes('dark') ? (
                      <span
                        class={cn(
                          'flex h-[10px] w-[10px] shrink-0 rounded-none',
                          primaryColor === 'primary-slate-800' && 'bg-slate-200',
                          primaryColor === 'primary-gray-800' && 'bg-gray-200',
                          primaryColor === 'primary-zinc-800' && 'bg-zinc-200',
                          primaryColor === 'primary-neutral-800' && 'bg-neutral-200',
                          primaryColor === 'primary-stone-800' && 'bg-stone-200',
                          primaryColor === 'primary-slate-900' && 'bg-slate-100',
                          primaryColor === 'primary-gray-900' && 'bg-gray-100',
                          primaryColor === 'primary-zinc-900' && 'bg-zinc-100',
                          primaryColor === 'primary-neutral-900' && 'bg-neutral-100',
                          primaryColor === 'primary-stone-900' && 'bg-stone-100',
                        )}
                      />
                    ) : (
                      <span
                        class={cn(
                          'flex h-[10px] w-[10px] shrink-0 rounded-none',
                          primaryColor === 'primary-slate-100' && 'bg-slate-100',
                          primaryColor === 'primary-gray-100' && 'bg-gray-100',
                          primaryColor === 'primary-zinc-100' && 'bg-zinc-100',
                          primaryColor === 'primary-neutral-100' && 'bg-neutral-100',
                          primaryColor === 'primary-stone-100' && 'bg-stone-100',
                          primaryColor === 'primary-red-100' && 'bg-red-100',
                          primaryColor === 'primary-orange-100' && 'bg-orange-100',
                          primaryColor === 'primary-amber-100' && 'bg-amber-100',
                          primaryColor === 'primary-yellow-100' && 'bg-yellow-100',
                          primaryColor === 'primary-lime-100' && 'bg-lime-100',
                          primaryColor === 'primary-green-100' && 'bg-green-100',
                          primaryColor === 'primary-emerald-100' && 'bg-emerald-100',
                          primaryColor === 'primary-teal-100' && 'bg-teal-100',
                          primaryColor === 'primary-cyan-100' && 'bg-cyan-100',
                          primaryColor === 'primary-sky-100' && 'bg-sky-100',
                          primaryColor === 'primary-blue-100' && 'bg-blue-100',
                          primaryColor === 'primary-indigo-100' && 'bg-indigo-100',
                          primaryColor === 'primary-violet-100' && 'bg-violet-100',
                          primaryColor === 'primary-purple-100' && 'bg-purple-100',
                          primaryColor === 'primary-fuchsia-100' && 'bg-fuchsia-100',
                          primaryColor === 'primary-pink-100' && 'bg-pink-100',
                          primaryColor === 'primary-rose-100' && 'bg-rose-100',

                          primaryColor === 'primary-slate-200' && 'bg-slate-200',
                          primaryColor === 'primary-gray-200' && 'bg-gray-200',
                          primaryColor === 'primary-zinc-200' && 'bg-zinc-200',
                          primaryColor === 'primary-neutral-200' && 'bg-neutral-200',
                          primaryColor === 'primary-stone-200' && 'bg-stone-200',
                          primaryColor === 'primary-red-200' && 'bg-red-200',
                          primaryColor === 'primary-orange-200' && 'bg-orange-200',
                          primaryColor === 'primary-amber-200' && 'bg-amber-200',
                          primaryColor === 'primary-yellow-200' && 'bg-yellow-200',
                          primaryColor === 'primary-lime-200' && 'bg-lime-200',
                          primaryColor === 'primary-green-200' && 'bg-green-200',
                          primaryColor === 'primary-emerald-200' && 'bg-emerald-200',
                          primaryColor === 'primary-teal-200' && 'bg-teal-200',
                          primaryColor === 'primary-cyan-200' && 'bg-cyan-200',
                          primaryColor === 'primary-sky-200' && 'bg-sky-200',
                          primaryColor === 'primary-blue-200' && 'bg-blue-200',
                          primaryColor === 'primary-indigo-200' && 'bg-indigo-200',
                          primaryColor === 'primary-violet-200' && 'bg-violet-200',
                          primaryColor === 'primary-purple-200' && 'bg-purple-200',
                          primaryColor === 'primary-fuchsia-200' && 'bg-fuchsia-200',
                          primaryColor === 'primary-pink-200' && 'bg-pink-200',
                          primaryColor === 'primary-rose-200' && 'bg-rose-200',

                          primaryColor === 'primary-slate-300' && 'bg-slate-300',
                          primaryColor === 'primary-gray-300' && 'bg-gray-300',
                          primaryColor === 'primary-zinc-300' && 'bg-zinc-300',
                          primaryColor === 'primary-neutral-300' && 'bg-neutral-300',
                          primaryColor === 'primary-stone-300' && 'bg-stone-300',
                          primaryColor === 'primary-red-300' && 'bg-red-300',
                          primaryColor === 'primary-orange-300' && 'bg-orange-300',
                          primaryColor === 'primary-amber-300' && 'bg-amber-300',
                          primaryColor === 'primary-yellow-300' && 'bg-yellow-300',
                          primaryColor === 'primary-lime-300' && 'bg-lime-300',
                          primaryColor === 'primary-green-300' && 'bg-green-300',
                          primaryColor === 'primary-emerald-300' && 'bg-emerald-300',
                          primaryColor === 'primary-teal-300' && 'bg-teal-300',
                          primaryColor === 'primary-cyan-300' && 'bg-cyan-300',
                          primaryColor === 'primary-sky-300' && 'bg-sky-300',
                          primaryColor === 'primary-blue-300' && 'bg-blue-300',
                          primaryColor === 'primary-indigo-300' && 'bg-indigo-300',
                          primaryColor === 'primary-violet-300' && 'bg-violet-300',
                          primaryColor === 'primary-purple-300' && 'bg-purple-300',
                          primaryColor === 'primary-fuchsia-300' && 'bg-fuchsia-300',
                          primaryColor === 'primary-pink-300' && 'bg-pink-300',
                          primaryColor === 'primary-rose-300' && 'bg-rose-300',

                          primaryColor === 'primary-slate-400' && 'bg-slate-400',
                          primaryColor === 'primary-gray-400' && 'bg-gray-400',
                          primaryColor === 'primary-zinc-400' && 'bg-zinc-400',
                          primaryColor === 'primary-neutral-400' && 'bg-neutral-400',
                          primaryColor === 'primary-stone-400' && 'bg-stone-400',
                          primaryColor === 'primary-red-400' && 'bg-red-400',
                          primaryColor === 'primary-orange-400' && 'bg-orange-400',
                          primaryColor === 'primary-amber-400' && 'bg-amber-400',
                          primaryColor === 'primary-yellow-400' && 'bg-yellow-400',
                          primaryColor === 'primary-lime-400' && 'bg-lime-400',
                          primaryColor === 'primary-green-400' && 'bg-green-400',
                          primaryColor === 'primary-emerald-400' && 'bg-emerald-400',
                          primaryColor === 'primary-teal-400' && 'bg-teal-400',
                          primaryColor === 'primary-cyan-400' && 'bg-cyan-400',
                          primaryColor === 'primary-sky-400' && 'bg-sky-400',
                          primaryColor === 'primary-blue-400' && 'bg-blue-400',
                          primaryColor === 'primary-indigo-400' && 'bg-indigo-400',
                          primaryColor === 'primary-violet-400' && 'bg-violet-400',
                          primaryColor === 'primary-purple-400' && 'bg-purple-400',
                          primaryColor === 'primary-fuchsia-400' && 'bg-fuchsia-400',
                          primaryColor === 'primary-pink-400' && 'bg-pink-400',
                          primaryColor === 'primary-rose-400' && 'bg-rose-400',

                          primaryColor === 'primary-slate-500' && 'bg-slate-500',
                          primaryColor === 'primary-gray-500' && 'bg-gray-500',
                          primaryColor === 'primary-zinc-500' && 'bg-zinc-500',
                          primaryColor === 'primary-neutral-500' && 'bg-neutral-500',
                          primaryColor === 'primary-stone-500' && 'bg-stone-500',
                          primaryColor === 'primary-red-500' && 'bg-red-500',
                          primaryColor === 'primary-orange-500' && 'bg-orange-500',
                          primaryColor === 'primary-amber-500' && 'bg-amber-500',
                          primaryColor === 'primary-yellow-500' && 'bg-yellow-500',
                          primaryColor === 'primary-lime-500' && 'bg-lime-500',
                          primaryColor === 'primary-green-500' && 'bg-green-500',
                          primaryColor === 'primary-emerald-500' && 'bg-emerald-500',
                          primaryColor === 'primary-teal-500' && 'bg-teal-500',
                          primaryColor === 'primary-cyan-500' && 'bg-cyan-500',
                          primaryColor === 'primary-sky-500' && 'bg-sky-500',
                          primaryColor === 'primary-blue-500' && 'bg-blue-500',
                          primaryColor === 'primary-indigo-500' && 'bg-indigo-500',
                          primaryColor === 'primary-violet-500' && 'bg-violet-500',
                          primaryColor === 'primary-purple-500' && 'bg-purple-500',
                          primaryColor === 'primary-fuchsia-500' && 'bg-fuchsia-500',
                          primaryColor === 'primary-pink-500' && 'bg-pink-500',
                          primaryColor === 'primary-rose-500' && 'bg-rose-500',

                          primaryColor === 'primary-slate-600' && 'bg-slate-600',
                          primaryColor === 'primary-gray-600' && 'bg-gray-600',
                          primaryColor === 'primary-zinc-600' && 'bg-zinc-600',
                          primaryColor === 'primary-neutral-600' && 'bg-neutral-600',
                          primaryColor === 'primary-stone-600' && 'bg-stone-600',
                          primaryColor === 'primary-red-600' && 'bg-red-600',
                          primaryColor === 'primary-orange-600' && 'bg-orange-600',
                          primaryColor === 'primary-amber-600' && 'bg-amber-600',
                          primaryColor === 'primary-yellow-600' && 'bg-yellow-600',
                          primaryColor === 'primary-lime-600' && 'bg-lime-600',
                          primaryColor === 'primary-green-600' && 'bg-green-600',
                          primaryColor === 'primary-emerald-600' && 'bg-emerald-600',
                          primaryColor === 'primary-teal-600' && 'bg-teal-600',
                          primaryColor === 'primary-cyan-600' && 'bg-cyan-600',
                          primaryColor === 'primary-sky-600' && 'bg-sky-600',
                          primaryColor === 'primary-blue-600' && 'bg-blue-600',
                          primaryColor === 'primary-indigo-600' && 'bg-indigo-600',
                          primaryColor === 'primary-violet-600' && 'bg-violet-600',
                          primaryColor === 'primary-purple-600' && 'bg-purple-600',
                          primaryColor === 'primary-fuchsia-600' && 'bg-fuchsia-600',
                          primaryColor === 'primary-pink-600' && 'bg-pink-600',
                          primaryColor === 'primary-rose-600' && 'bg-rose-600',

                          primaryColor === 'primary-slate-700' && 'bg-slate-700',
                          primaryColor === 'primary-gray-700' && 'bg-gray-700',
                          primaryColor === 'primary-zinc-700' && 'bg-zinc-700',
                          primaryColor === 'primary-neutral-700' && 'bg-neutral-700',
                          primaryColor === 'primary-stone-700' && 'bg-stone-700',
                          primaryColor === 'primary-red-700' && 'bg-red-700',
                          primaryColor === 'primary-orange-700' && 'bg-orange-700',
                          primaryColor === 'primary-amber-700' && 'bg-amber-700',
                          primaryColor === 'primary-yellow-700' && 'bg-yellow-700',
                          primaryColor === 'primary-lime-700' && 'bg-lime-700',
                          primaryColor === 'primary-green-700' && 'bg-green-700',
                          primaryColor === 'primary-emerald-700' && 'bg-emerald-700',
                          primaryColor === 'primary-teal-700' && 'bg-teal-700',
                          primaryColor === 'primary-cyan-700' && 'bg-cyan-700',
                          primaryColor === 'primary-sky-700' && 'bg-sky-700',
                          primaryColor === 'primary-blue-700' && 'bg-blue-700',
                          primaryColor === 'primary-indigo-700' && 'bg-indigo-700',
                          primaryColor === 'primary-violet-700' && 'bg-violet-700',
                          primaryColor === 'primary-purple-700' && 'bg-purple-700',
                          primaryColor === 'primary-fuchsia-700' && 'bg-fuchsia-700',
                          primaryColor === 'primary-pink-700' && 'bg-pink-700',
                          primaryColor === 'primary-rose-700' && 'bg-rose-700',

                          primaryColor === 'primary-slate-800' && 'bg-slate-800',
                          primaryColor === 'primary-gray-800' && 'bg-gray-800',
                          primaryColor === 'primary-zinc-800' && 'bg-zinc-800',
                          primaryColor === 'primary-neutral-800' && 'bg-neutral-800',
                          primaryColor === 'primary-stone-800' && 'bg-stone-800',
                          primaryColor === 'primary-slate-800' && 'bg-slate-800',
                          primaryColor === 'primary-gray-800' && 'bg-gray-800',
                          primaryColor === 'primary-zinc-800' && 'bg-zinc-800',
                          primaryColor === 'primary-neutral-800' && 'bg-neutral-800',
                          primaryColor === 'primary-stone-800' && 'bg-stone-800',
                          primaryColor === 'primary-red-800' && 'bg-red-800',
                          primaryColor === 'primary-orange-800' && 'bg-orange-800',
                          primaryColor === 'primary-amber-800' && 'bg-amber-800',
                          primaryColor === 'primary-yellow-800' && 'bg-yellow-800',
                          primaryColor === 'primary-lime-800' && 'bg-lime-800',
                          primaryColor === 'primary-green-800' && 'bg-green-800',
                          primaryColor === 'primary-emerald-800' && 'bg-emerald-800',
                          primaryColor === 'primary-teal-800' && 'bg-teal-800',
                          primaryColor === 'primary-cyan-800' && 'bg-cyan-800',
                          primaryColor === 'primary-sky-800' && 'bg-sky-800',
                          primaryColor === 'primary-blue-800' && 'bg-blue-800',
                          primaryColor === 'primary-indigo-800' && 'bg-indigo-800',
                          primaryColor === 'primary-violet-800' && 'bg-violet-800',
                          primaryColor === 'primary-purple-800' && 'bg-purple-800',
                          primaryColor === 'primary-fuchsia-800' && 'bg-fuchsia-800',
                          primaryColor === 'primary-pink-800' && 'bg-pink-800',
                          primaryColor === 'primary-rose-800' && 'bg-rose-800',

                          primaryColor === 'primary-slate-900' && 'bg-slate-900',
                          primaryColor === 'primary-gray-900' && 'bg-gray-900',
                          primaryColor === 'primary-zinc-900' && 'bg-zinc-900',
                          primaryColor === 'primary-neutral-900' && 'bg-neutral-900',
                          primaryColor === 'primary-stone-900' && 'bg-stone-900',
                          primaryColor === 'primary-slate-900' && 'bg-slate-900',
                          primaryColor === 'primary-gray-900' && 'bg-gray-900',
                          primaryColor === 'primary-zinc-900' && 'bg-zinc-900',
                          primaryColor === 'primary-neutral-900' && 'bg-neutral-900',
                          primaryColor === 'primary-stone-900' && 'bg-stone-900',
                          primaryColor === 'primary-red-900' && 'bg-red-900',
                          primaryColor === 'primary-orange-900' && 'bg-orange-900',
                          primaryColor === 'primary-amber-900' && 'bg-amber-900',
                          primaryColor === 'primary-yellow-900' && 'bg-yellow-900',
                          primaryColor === 'primary-lime-900' && 'bg-lime-900',
                          primaryColor === 'primary-green-900' && 'bg-green-900',
                          primaryColor === 'primary-emerald-900' && 'bg-emerald-900',
                          primaryColor === 'primary-teal-900' && 'bg-teal-900',
                          primaryColor === 'primary-cyan-900' && 'bg-cyan-900',
                          primaryColor === 'primary-sky-900' && 'bg-sky-900',
                          primaryColor === 'primary-blue-900' && 'bg-blue-900',
                          primaryColor === 'primary-indigo-900' && 'bg-indigo-900',
                          primaryColor === 'primary-violet-900' && 'bg-violet-900',
                          primaryColor === 'primary-purple-900' && 'bg-purple-900',
                          primaryColor === 'primary-fuchsia-900' && 'bg-fuchsia-900',
                          primaryColor === 'primary-pink-900' && 'bg-pink-900',
                          primaryColor === 'primary-rose-900' && 'bg-rose-900',
                        )}
                      />
                    )}
                  </Button>
                );
              })}
            </div>
          </div>

          <div>
            <label class="mb-1 mt-8 block font-medium">Radius</label>
            <div class="flex h-12 space-x-3">
              {Object.values(ThemeBorderRadius).map((borderRadius: string) => {
                const isActive =
                  themeComputedObjectSig.value.borderRadius === borderRadius;
                return (
                  <Button
                    key={borderRadius}
                    look="outline"
                    onClick$={async () => {
                      themeComputedObjectSig.value.borderRadius = borderRadius;
                      setTheme(await themeStoreToThemeClasses$());
                    }}
                    class={cn('w-12', isActive && 'mb-2 border-ring')}
                  >
                    {borderRadius === 'border-radius-0' && 0}
                    {borderRadius === 'border-radius-dot-25' && '.25'}
                    {borderRadius === 'border-radius-dot-50' && '.5'}
                    {borderRadius === 'border-radius-dot-75' && '.75'}
                    {borderRadius === 'border-radius-1' && 1}
                  </Button>
                );
              })}
            </div>
          </div>
          <div class="mt-8">
            Dark Mode{' '}
            <input
              type="checkbox"
              checked={themeComputedObjectSig.value.mode === 'dark'}
              onClick$={async () => {
                themeComputedObjectSig.value.mode =
                  themeComputedObjectSig.value.mode?.includes('light') ? 'dark' : 'light';

                setTheme(await themeStoreToThemeClasses$());
              }}
            />
          </div>
        </div>

        <footer class=" flex w-full justify-between gap-4">
          <Button
            look="ghost"
            onClick$={() => setTheme(theme?.includes('dark') ? 'dark' : 'light')}
          >
            Reset
          </Button>
          <CopyCssConfig />
        </footer>
        <Modal.Close
          class={cn(buttonVariants({ size: 'sm', look: 'link' }), 'fixed right-4 top-5')}
        >
          <LuX class="h-8 w-8" />
        </Modal.Close>
      </Modal.Panel>
    </Modal.Root>
  );
});
