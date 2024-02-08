import {
  $,
  component$,
  useComputed$,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { Modal, ModalContent, ModalFooter, ModalHeader } from '@qwik-ui/headless';
import { Button } from '@qwik-ui/styled';
import { cn } from '@qwik-ui/utils';
import { LuSlidersHorizontal, LuX } from '@qwikest/icons/lucide';
import { useTheme } from 'qwik-themes';
import { borderRadiusOptions, baseOptions, primaryOptions } from '~/_state/make-it-yours';
import CopyCssConfig from '../copy-css-config/copy-css-config';

export default component$(() => {
  useStyles$(`
    .make-it-yours::backdrop {
      background: rgba(0,0,0,0.02);

    }
  
    .make-it-yours.modal-showing {
      animation: sheetOpen 0.75s forwards cubic-bezier(0.6, 0.6, 0, 1);
    }
  
    .make-it-yours.modal-showing::backdrop {
      animation: sheetFadeIn 0.75s forwards cubic-bezier(0.6, 0.6, 0, 1);
    }
  
    .make-it-yours.modal-closing {
      animation: sheetClose 0.35s forwards cubic-bezier(0.6, 0.6, 0, 1);
    }
  
    .make-it-yours.modal-closing::backdrop {
      animation: sheetFadeOut 0.35s forwards cubic-bezier(0.6, 0.6, 0, 1);
    }

    @keyframes sheetOpen {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0%);
      }
    }
  
    @keyframes sheetClose {
      from {
        opacity: 1;
        transform: translateX(0%);
      }
      to {
        opacity: 0;
        transform: translateX(100%);
      }
    }
  
    @keyframes sheetFadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  
    @keyframes sheetFadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
    `);

  const showSig = useSignal(false);

  const { theme, setTheme } = useTheme();

  useVisibleTask$(() => {
    console.log('theme', theme);
  });

  const themeComputedObject = useComputed$(() => {
    const themeArray = Array.isArray(theme) ? theme : theme?.split(' ');
    console.log('themeArray', themeArray);

    return {
      mode: themeArray?.[0] || 'light',
      style: themeArray?.[1] || 'simple',
      base: themeArray?.[2] || 'base-slate',
      primary: themeArray?.[3] || 'primary-cyan-600',
      contrast: themeArray?.[4] || 'low-contrast',
      borderRadius: themeArray?.[5] || 'border-radius-0',
    };
  });

  const themeStoreToThemeClasses = $(() => {
    const { mode, style, base, primary, contrast, borderRadius } =
      themeComputedObject.value;
    return [mode, style, base, primary, contrast, borderRadius];
  });
  return (
    <section>
      <button
        onClick$={() => {
          showSig.value = true;
        }}
        class="hover:bg-accent/80 rounded-sm border px-3 py-2"
      >
        <div class="flex justify-center">
          <LuSlidersHorizontal class="mr-3 h-6 w-6" />
          Make it yours
        </div>
      </button>
      <Modal
        bind:show={showSig}
        class="make-it-yours bg-background text-foreground mr-0 h-screen max-w-lg rounded-sm border-0 p-8 shadow-md"
      >
        <div class="flex h-full flex-col justify-between">
          <div>
            <ModalHeader>
              <h2 class="text-lg font-bold">Edit Profile</h2>
            </ModalHeader>
            <ModalContent class="mb-2 py-4">
              <label class="mb-1 block font-medium">Preset</label>
              <select
                class="bg-background h-12 min-w-80 rounded-sm border p-2"
                value={themeComputedObject.value.style}
                onChange$={async (e, el) => {
                  themeComputedObject.value.style = el.value;
                  console.log('themeComputedObject.value', themeComputedObject.value);
                  setTheme(await themeStoreToThemeClasses());
                }}
              >
                <option value={'simple'}>Simple</option>
                <option value={'brutalist'}>Brutalist</option>
                <option value={'neumorphic'}>Neumorphic</option>
              </select>

              <label class="mb-1 mt-8 block font-medium">Base</label>
              <div class="flex">
                {baseOptions.map((base) => {
                  const isActive = themeComputedObject.value.base === base;

                  return (
                    <Button
                      key={base}
                      look="ghost"
                      size="icon"
                      onClick$={async () => {
                        themeComputedObject.value.base = base;

                        setTheme(await themeStoreToThemeClasses());
                      }}
                      class={cn(
                        'flex h-4 w-4 items-center justify-center rounded-none',
                        isActive && 'border-ring border-2',
                      )}
                    >
                      <span
                        class={cn(
                          'flex h-3 w-3 shrink-0 rounded-none',
                          base === 'base-slate' && 'bg-slate-500',
                          base === 'base-gray' && 'bg-gray-500',
                          base === 'base-neutral' && 'bg-neutral-500',
                          base === 'base-zinc' && 'bg-zinc-500',
                          base === 'base-stone' && 'bg-stone-500',
                        )}
                      />
                    </Button>
                  );
                })}
              </div>

              <label class="mb-1 mt-8 block font-medium">Primary</label>
              <div class="grid grid-cols-[repeat(22,1fr)]">
                {primaryOptions.map((primary) => {
                  const isActive = themeComputedObject.value.primary === primary;

                  if (
                    primary.includes('slate-100') ||
                    primary.includes('gray-100') ||
                    primary.includes('zinc-100') ||
                    primary.includes('neutral-100') ||
                    primary.includes('stone-100') ||
                    primary.includes('slate-200') ||
                    primary.includes('gray-200') ||
                    primary.includes('zinc-200') ||
                    primary.includes('neutral-200') ||
                    primary.includes('stone-200')
                  )
                    return <span key={primary}></span>;

                  return (
                    <Button
                      key={primary}
                      look="ghost"
                      size="icon"
                      onClick$={async () => {
                        themeComputedObject.value.primary = primary;
                        setTheme(await themeStoreToThemeClasses());
                      }}
                      class={cn(
                        'flex h-4 w-4 items-center justify-center rounded-none',
                        isActive && 'border-ring border-2',
                      )}
                    >
                      {(primary?.includes('slate-800') ||
                        primary?.includes('gray-800') ||
                        primary?.includes('zinc-800') ||
                        primary?.includes('neutral-800') ||
                        primary?.includes('stone-800') ||
                        primary?.includes('slate-900') ||
                        primary?.includes('gray-900') ||
                        primary?.includes('zinc-900') ||
                        primary?.includes('neutral-900') ||
                        primary?.includes('stone-900')) &&
                      theme?.includes('dark') ? (
                        <span
                          class={cn(
                            'flex h-3 w-3 shrink-0 rounded-none',
                            primary === 'primary-slate-900' && 'bg-slate-100',
                            primary === 'primary-gray-900' && 'bg-gray-100',
                            primary === 'primary-zinc-900' && 'bg-zinc-100',
                            primary === 'primary-neutral-900' && 'bg-neutral-100',
                            primary === 'primary-stone-900' && 'bg-stone-100',
                            primary === 'primary-slate-800' && 'bg-slate-200',
                            primary === 'primary-gray-800' && 'bg-gray-200',
                            primary === 'primary-zinc-800' && 'bg-zinc-200',
                            primary === 'primary-neutral-800' && 'bg-neutral-200',
                            primary === 'primary-stone-800' && 'bg-stone-200',
                          )}
                        />
                      ) : (
                        <span
                          class={cn(
                            'flex h-3 w-3 shrink-0 rounded-none',

                            primary === 'primary-red-100' && 'bg-red-100',
                            primary === 'primary-orange-100' && 'bg-orange-100',
                            primary === 'primary-amber-100' && 'bg-amber-100',
                            primary === 'primary-yellow-100' && 'bg-yellow-100',
                            primary === 'primary-lime-100' && 'bg-lime-100',
                            primary === 'primary-green-100' && 'bg-green-100',
                            primary === 'primary-emerald-100' && 'bg-emerald-100',
                            primary === 'primary-teal-100' && 'bg-teal-100',
                            primary === 'primary-cyan-100' && 'bg-cyan-100',
                            primary === 'primary-sky-100' && 'bg-sky-100',
                            primary === 'primary-blue-100' && 'bg-blue-100',
                            primary === 'primary-indigo-100' && 'bg-indigo-100',
                            primary === 'primary-violet-100' && 'bg-violet-100',
                            primary === 'primary-purple-100' && 'bg-purple-100',
                            primary === 'primary-fuchsia-100' && 'bg-fuchsia-100',
                            primary === 'primary-pink-100' && 'bg-pink-100',
                            primary === 'primary-rose-100' && 'bg-rose-100',

                            primary === 'primary-red-200' && 'bg-red-200',
                            primary === 'primary-orange-200' && 'bg-orange-200',
                            primary === 'primary-amber-200' && 'bg-amber-200',
                            primary === 'primary-yellow-200' && 'bg-yellow-200',
                            primary === 'primary-lime-200' && 'bg-lime-200',
                            primary === 'primary-green-200' && 'bg-green-200',
                            primary === 'primary-emerald-200' && 'bg-emerald-200',
                            primary === 'primary-teal-200' && 'bg-teal-200',
                            primary === 'primary-cyan-200' && 'bg-cyan-200',
                            primary === 'primary-sky-200' && 'bg-sky-200',
                            primary === 'primary-blue-200' && 'bg-blue-200',
                            primary === 'primary-indigo-200' && 'bg-indigo-200',
                            primary === 'primary-violet-200' && 'bg-violet-200',
                            primary === 'primary-purple-200' && 'bg-purple-200',
                            primary === 'primary-fuchsia-200' && 'bg-fuchsia-200',
                            primary === 'primary-pink-200' && 'bg-pink-200',
                            primary === 'primary-rose-200' && 'bg-rose-200',

                            primary === 'primary-slate-300' && 'bg-slate-300',
                            primary === 'primary-gray-300' && 'bg-gray-300',
                            primary === 'primary-zinc-300' && 'bg-zinc-300',
                            primary === 'primary-neutral-300' && 'bg-neutral-300',
                            primary === 'primary-stone-300' && 'bg-stone-300',
                            primary === 'primary-red-300' && 'bg-red-300',
                            primary === 'primary-orange-300' && 'bg-orange-300',
                            primary === 'primary-amber-300' && 'bg-amber-300',
                            primary === 'primary-yellow-300' && 'bg-yellow-300',
                            primary === 'primary-lime-300' && 'bg-lime-300',
                            primary === 'primary-green-300' && 'bg-green-300',
                            primary === 'primary-emerald-300' && 'bg-emerald-300',
                            primary === 'primary-teal-300' && 'bg-teal-300',
                            primary === 'primary-cyan-300' && 'bg-cyan-300',
                            primary === 'primary-sky-300' && 'bg-sky-300',
                            primary === 'primary-blue-300' && 'bg-blue-300',
                            primary === 'primary-indigo-300' && 'bg-indigo-300',
                            primary === 'primary-violet-300' && 'bg-violet-300',
                            primary === 'primary-purple-300' && 'bg-purple-300',
                            primary === 'primary-fuchsia-300' && 'bg-fuchsia-300',
                            primary === 'primary-pink-300' && 'bg-pink-300',
                            primary === 'primary-rose-300' && 'bg-rose-300',

                            primary === 'primary-slate-400' && 'bg-slate-400',
                            primary === 'primary-gray-400' && 'bg-gray-400',
                            primary === 'primary-zinc-400' && 'bg-zinc-400',
                            primary === 'primary-neutral-400' && 'bg-neutral-400',
                            primary === 'primary-stone-400' && 'bg-stone-400',
                            primary === 'primary-red-400' && 'bg-red-400',
                            primary === 'primary-orange-400' && 'bg-orange-400',
                            primary === 'primary-amber-400' && 'bg-amber-400',
                            primary === 'primary-yellow-400' && 'bg-yellow-400',
                            primary === 'primary-lime-400' && 'bg-lime-400',
                            primary === 'primary-green-400' && 'bg-green-400',
                            primary === 'primary-emerald-400' && 'bg-emerald-400',
                            primary === 'primary-teal-400' && 'bg-teal-400',
                            primary === 'primary-cyan-400' && 'bg-cyan-400',
                            primary === 'primary-sky-400' && 'bg-sky-400',
                            primary === 'primary-blue-400' && 'bg-blue-400',
                            primary === 'primary-indigo-400' && 'bg-indigo-400',
                            primary === 'primary-violet-400' && 'bg-violet-400',
                            primary === 'primary-purple-400' && 'bg-purple-400',
                            primary === 'primary-fuchsia-400' && 'bg-fuchsia-400',
                            primary === 'primary-pink-400' && 'bg-pink-400',
                            primary === 'primary-rose-400' && 'bg-rose-400',

                            primary === 'primary-slate-500' && 'bg-slate-500',
                            primary === 'primary-gray-500' && 'bg-gray-500',
                            primary === 'primary-zinc-500' && 'bg-zinc-500',
                            primary === 'primary-neutral-500' && 'bg-neutral-500',
                            primary === 'primary-stone-500' && 'bg-stone-500',
                            primary === 'primary-red-500' && 'bg-red-500',
                            primary === 'primary-orange-500' && 'bg-orange-500',
                            primary === 'primary-amber-500' && 'bg-amber-500',
                            primary === 'primary-yellow-500' && 'bg-yellow-500',
                            primary === 'primary-lime-500' && 'bg-lime-500',
                            primary === 'primary-green-500' && 'bg-green-500',
                            primary === 'primary-emerald-500' && 'bg-emerald-500',
                            primary === 'primary-teal-500' && 'bg-teal-500',
                            primary === 'primary-cyan-500' && 'bg-cyan-500',
                            primary === 'primary-sky-500' && 'bg-sky-500',
                            primary === 'primary-blue-500' && 'bg-blue-500',
                            primary === 'primary-indigo-500' && 'bg-indigo-500',
                            primary === 'primary-violet-500' && 'bg-violet-500',
                            primary === 'primary-purple-500' && 'bg-purple-500',
                            primary === 'primary-fuchsia-500' && 'bg-fuchsia-500',
                            primary === 'primary-pink-500' && 'bg-pink-500',
                            primary === 'primary-rose-500' && 'bg-rose-500',

                            primary === 'primary-slate-600' && 'bg-slate-600',
                            primary === 'primary-gray-600' && 'bg-gray-600',
                            primary === 'primary-zinc-600' && 'bg-zinc-600',
                            primary === 'primary-neutral-600' && 'bg-neutral-600',
                            primary === 'primary-stone-600' && 'bg-stone-600',
                            primary === 'primary-red-600' && 'bg-red-600',
                            primary === 'primary-orange-600' && 'bg-orange-600',
                            primary === 'primary-amber-600' && 'bg-amber-600',
                            primary === 'primary-yellow-600' && 'bg-yellow-600',
                            primary === 'primary-lime-600' && 'bg-lime-600',
                            primary === 'primary-green-600' && 'bg-green-600',
                            primary === 'primary-emerald-600' && 'bg-emerald-600',
                            primary === 'primary-teal-600' && 'bg-teal-600',
                            primary === 'primary-cyan-600' && 'bg-cyan-600',
                            primary === 'primary-sky-600' && 'bg-sky-600',
                            primary === 'primary-blue-600' && 'bg-blue-600',
                            primary === 'primary-indigo-600' && 'bg-indigo-600',
                            primary === 'primary-violet-600' && 'bg-violet-600',
                            primary === 'primary-purple-600' && 'bg-purple-600',
                            primary === 'primary-fuchsia-600' && 'bg-fuchsia-600',
                            primary === 'primary-pink-600' && 'bg-pink-600',
                            primary === 'primary-rose-600' && 'bg-rose-600',

                            primary === 'primary-slate-700' && 'bg-slate-700',
                            primary === 'primary-gray-700' && 'bg-gray-700',
                            primary === 'primary-zinc-700' && 'bg-zinc-700',
                            primary === 'primary-neutral-700' && 'bg-neutral-700',
                            primary === 'primary-stone-700' && 'bg-stone-700',
                            primary === 'primary-red-700' && 'bg-red-700',
                            primary === 'primary-orange-700' && 'bg-orange-700',
                            primary === 'primary-amber-700' && 'bg-amber-700',
                            primary === 'primary-yellow-700' && 'bg-yellow-700',
                            primary === 'primary-lime-700' && 'bg-lime-700',
                            primary === 'primary-green-700' && 'bg-green-700',
                            primary === 'primary-emerald-700' && 'bg-emerald-700',
                            primary === 'primary-teal-700' && 'bg-teal-700',
                            primary === 'primary-cyan-700' && 'bg-cyan-700',
                            primary === 'primary-sky-700' && 'bg-sky-700',
                            primary === 'primary-blue-700' && 'bg-blue-700',
                            primary === 'primary-indigo-700' && 'bg-indigo-700',
                            primary === 'primary-violet-700' && 'bg-violet-700',
                            primary === 'primary-purple-700' && 'bg-purple-700',
                            primary === 'primary-fuchsia-700' && 'bg-fuchsia-700',
                            primary === 'primary-pink-700' && 'bg-pink-700',
                            primary === 'primary-rose-700' && 'bg-rose-700',

                            primary === 'primary-slate-800' && 'bg-slate-800',
                            primary === 'primary-gray-800' && 'bg-gray-800',
                            primary === 'primary-zinc-800' && 'bg-zinc-800',
                            primary === 'primary-neutral-800' && 'bg-neutral-800',
                            primary === 'primary-stone-800' && 'bg-stone-800',
                            primary === 'primary-red-800' && 'bg-red-800',
                            primary === 'primary-orange-800' && 'bg-orange-800',
                            primary === 'primary-amber-800' && 'bg-amber-800',
                            primary === 'primary-yellow-800' && 'bg-yellow-800',
                            primary === 'primary-lime-800' && 'bg-lime-800',
                            primary === 'primary-green-800' && 'bg-green-800',
                            primary === 'primary-emerald-800' && 'bg-emerald-800',
                            primary === 'primary-teal-800' && 'bg-teal-800',
                            primary === 'primary-cyan-800' && 'bg-cyan-800',
                            primary === 'primary-sky-800' && 'bg-sky-800',
                            primary === 'primary-blue-800' && 'bg-blue-800',
                            primary === 'primary-indigo-800' && 'bg-indigo-800',
                            primary === 'primary-violet-800' && 'bg-violet-800',
                            primary === 'primary-purple-800' && 'bg-purple-800',
                            primary === 'primary-fuchsia-800' && 'bg-fuchsia-800',
                            primary === 'primary-pink-800' && 'bg-pink-800',
                            primary === 'primary-rose-800' && 'bg-rose-800',

                            primary === 'primary-slate-900' && 'bg-slate-900',
                            primary === 'primary-gray-900' && 'bg-gray-900',
                            primary === 'primary-zinc-900' && 'bg-zinc-900',
                            primary === 'primary-neutral-900' && 'bg-neutral-900',
                            primary === 'primary-stone-900' && 'bg-stone-900',
                            primary === 'primary-red-900' && 'bg-red-900',
                            primary === 'primary-orange-900' && 'bg-orange-900',
                            primary === 'primary-amber-900' && 'bg-amber-900',
                            primary === 'primary-yellow-900' && 'bg-yellow-900',
                            primary === 'primary-lime-900' && 'bg-lime-900',
                            primary === 'primary-green-900' && 'bg-green-900',
                            primary === 'primary-emerald-900' && 'bg-emerald-900',
                            primary === 'primary-teal-900' && 'bg-teal-900',
                            primary === 'primary-cyan-900' && 'bg-cyan-900',
                            primary === 'primary-sky-900' && 'bg-sky-900',
                            primary === 'primary-blue-900' && 'bg-blue-900',
                            primary === 'primary-indigo-900' && 'bg-indigo-900',
                            primary === 'primary-violet-900' && 'bg-violet-900',
                            primary === 'primary-purple-900' && 'bg-purple-900',
                            primary === 'primary-fuchsia-900' && 'bg-fuchsia-900',
                            primary === 'primary-pink-900' && 'bg-pink-900',
                            primary === 'primary-rose-900' && 'bg-rose-900',
                          )}
                        />
                      )}
                    </Button>
                  );
                })}
              </div>

              <div>
                <label class="mb-1 mt-8 block font-medium">Radius</label>
                <div class="grid grid-cols-3 gap-2">
                  {borderRadiusOptions.map((borderRadius) => {
                    const isActive =
                      themeComputedObject.value.borderRadius === borderRadius;
                    return (
                      <Button
                        key={borderRadius}
                        look="outline"
                        size="xs"
                        onClick$={async () => {
                          themeComputedObject.value.borderRadius = borderRadius;
                          setTheme(await themeStoreToThemeClasses());
                        }}
                        class={cn('justify-start', isActive && 'border-ring border-2')}
                      >
                        {borderRadius}
                      </Button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label class="mb-1 mt-8 block font-medium">Contrast</label>
                High Contrast{' '}
                <input
                  type="checkbox"
                  checked={themeComputedObject.value.contrast === 'high-contrast'}
                  onClick$={async () => {
                    themeComputedObject.value.contrast =
                      themeComputedObject.value.contrast === 'high-contrast'
                        ? 'low-contrast'
                        : 'high-contrast';

                    console.log(themeComputedObject.value.contrast);
                    setTheme(await themeStoreToThemeClasses());
                  }}
                />
              </div>

              <div>
                <label class="mb-1 mt-8 block font-medium">Contrast</label>
                Dark Mode{' '}
                <input
                  type="checkbox"
                  checked={themeComputedObject.value.mode === 'dark'}
                  onClick$={async () => {
                    themeComputedObject.value.mode =
                      themeComputedObject.value.mode === 'light' ? 'dark' : 'light';

                    console.log(themeComputedObject.value.mode);
                    setTheme(await themeStoreToThemeClasses());
                  }}
                />
              </div>
            </ModalContent>
          </div>
          <div>
            <ModalFooter class="flex justify-end gap-4">
              <CopyCssConfig />
            </ModalFooter>
            <button
              onClick$={() => (showSig.value = false)}
              class="absolute right-6 top-[26px]"
            >
              <LuX class="h-8 w-8" />
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
});
