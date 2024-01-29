import {
  $,
  component$,
  useSignal,
  useStore,
  useStyles$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { Modal, ModalContent, ModalFooter, ModalHeader } from '@qwik-ui/headless';
import { Button } from '@qwik-ui/styled';
import { cn } from '@qwik-ui/utils';
import { LuSlidersHorizontal, LuX } from '@qwikest/icons/lucide';
import { useTheme } from 'qwik-themes';
import { Theme, borderRadiusOptions, colorThemeOptions } from '~/_state/make-it-yours';
import globalCSS from '~/global.css?raw';

export default component$(() => {
  useStyles$(`
    .make-it-yours::backdrop {
      background: rgba(0,0,0,0.05);

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

  const { setTheme } = useTheme();

  const extractedClasses = useSignal<string>('');

  useVisibleTask$(async () => {
    const element = document.getElementsByTagName('html');
    console.log('element', element[0].classList);

    function extractClassCSSVars(cssString: string, className: string) {
      console.log('cssString', cssString);
      // Find the start of the class
      const classStart = cssString.indexOf(`.${className} {`);
      console.log('classStart', classStart);
      if (classStart === -1) return null;

      // Find the opening curly brace
      const openingBraceIndex = cssString.indexOf('{', classStart);
      console.log('openingBraceIndex', openingBraceIndex);
      if (openingBraceIndex === -1) return null;

      // Find the end of the class
      const classEnd = cssString.indexOf('}', openingBraceIndex);
      console.log('classEnd', classEnd);
      if (classEnd === -1) return null;

      // Extract the class content, starting from the character after the opening brace
      const classContent = cssString.substring(openingBraceIndex, classEnd);

      console.log('classContent', classContent);
      return classContent;
    }

    // Example usage
    const cssString = extractClassCSSVars(globalCSS, 'brutalist');
    let formattedCSS = '.brutalist {\n';
    formattedCSS += cssString?.replace(/;/g, ';\n');
    formattedCSS += '}';

    console.log('formattedCSS', formattedCSS);
    extractedClasses.value = formattedCSS;
  });

  const themeStore = useStore<Theme>({
    mode: 'light',
    style: 'simple',
    colorTheme: 'cyan-500',
    contrast: 'low-contrast',
    borderRadius: 'border-radius-0',
  });

  const themeStoreToThemeClasses = $(() => {
    const { mode, style, colorTheme, contrast, borderRadius } = themeStore;
    return [mode, style, colorTheme, contrast, borderRadius].filter(
      (value) => value !== 'low-contrast',
    );
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
        class="make-it-yours bg-background text-foreground mr-0 h-screen max-w-96 rounded-sm border-0 p-8 shadow-md"
      >
        <ModalHeader>
          <h2 class="text-lg font-bold">Edit Profile</h2>
        </ModalHeader>
        <ModalContent class="mb-2 py-4">
          <label class="mb-1 block font-medium">Preset</label>
          <select
            class="bg-background h-12 min-w-80 rounded-sm border p-2"
            onChange$={async (e, el) => {
              themeStore.style = el.value as Theme['style'];
              setTheme(await themeStoreToThemeClasses());
            }}
          >
            <option value={'simple'}>Simple</option>
            <option value={'brutalist'}>Brutalist</option>
            <option value={'neumorphic'}>Neumorphic</option>
          </select>

          <label class="mb-1 mt-8 block font-medium">Color Theme</label>
          <div class="grid grid-cols-[repeat(17,1fr)] gap-[2px]">
            {colorThemeOptions.map((colorTheme) => {
              const isActive = themeStore.colorTheme === colorTheme;
              return (
                <Button
                  key={colorTheme}
                  look="outline"
                  size="icon"
                  onClick$={async () => {
                    themeStore.colorTheme = colorTheme;
                    console.log('colorTheme', colorTheme);
                    setTheme(await themeStoreToThemeClasses());
                  }}
                  class={cn(
                    'flex h-4 w-4 items-center justify-center rounded-none',
                    isActive && 'border-primary border-2',
                  )}
                >
                  <span
                    class={cn(
                      'flex h-3 w-3 shrink-0 rounded-none',
                      colorTheme === 'red-100' && 'bg-red-100',
                      colorTheme === 'orange-100' && 'bg-orange-100',
                      colorTheme === 'amber-100' && 'bg-amber-100',
                      colorTheme === 'yellow-100' && 'bg-yellow-100',
                      colorTheme === 'lime-100' && 'bg-lime-100',
                      colorTheme === 'green-100' && 'bg-green-100',
                      colorTheme === 'emerald-100' && 'bg-emerald-100',
                      colorTheme === 'teal-100' && 'bg-teal-100',
                      colorTheme === 'cyan-100' && 'bg-cyan-100',
                      colorTheme === 'sky-100' && 'bg-sky-100',
                      colorTheme === 'blue-100' && 'bg-blue-100',
                      colorTheme === 'indigo-100' && 'bg-indigo-100',
                      colorTheme === 'violet-100' && 'bg-violet-100',
                      colorTheme === 'purple-100' && 'bg-purple-100',
                      colorTheme === 'fuchsia-100' && 'bg-fuchsia-100',
                      colorTheme === 'pink-100' && 'bg-pink-100',
                      colorTheme === 'rose-100' && 'bg-rose-100',
                      colorTheme === 'red-200' && 'bg-red-200',
                      colorTheme === 'orange-200' && 'bg-orange-200',
                      colorTheme === 'amber-200' && 'bg-amber-200',
                      colorTheme === 'yellow-200' && 'bg-yellow-200',
                      colorTheme === 'lime-200' && 'bg-lime-200',
                      colorTheme === 'green-200' && 'bg-green-200',
                      colorTheme === 'emerald-200' && 'bg-emerald-200',
                      colorTheme === 'teal-200' && 'bg-teal-200',
                      colorTheme === 'cyan-200' && 'bg-cyan-200',
                      colorTheme === 'sky-200' && 'bg-sky-200',
                      colorTheme === 'blue-200' && 'bg-blue-200',
                      colorTheme === 'indigo-200' && 'bg-indigo-200',
                      colorTheme === 'violet-200' && 'bg-violet-200',
                      colorTheme === 'purple-200' && 'bg-purple-200',
                      colorTheme === 'fuchsia-200' && 'bg-fuchsia-200',
                      colorTheme === 'pink-200' && 'bg-pink-200',
                      colorTheme === 'rose-200' && 'bg-rose-200',
                      colorTheme === 'red-300' && 'bg-red-300',
                      colorTheme === 'orange-300' && 'bg-orange-300',
                      colorTheme === 'amber-300' && 'bg-amber-300',
                      colorTheme === 'yellow-300' && 'bg-yellow-300',
                      colorTheme === 'lime-300' && 'bg-lime-300',
                      colorTheme === 'green-300' && 'bg-green-300',
                      colorTheme === 'emerald-300' && 'bg-emerald-300',
                      colorTheme === 'teal-300' && 'bg-teal-300',
                      colorTheme === 'cyan-300' && 'bg-cyan-300',
                      colorTheme === 'sky-300' && 'bg-sky-300',
                      colorTheme === 'blue-300' && 'bg-blue-300',
                      colorTheme === 'indigo-300' && 'bg-indigo-300',
                      colorTheme === 'violet-300' && 'bg-violet-300',
                      colorTheme === 'purple-300' && 'bg-purple-300',
                      colorTheme === 'fuchsia-300' && 'bg-fuchsia-300',
                      colorTheme === 'pink-300' && 'bg-pink-300',
                      colorTheme === 'rose-300' && 'bg-rose-300',
                      colorTheme === 'red-400' && 'bg-red-400',
                      colorTheme === 'orange-400' && 'bg-orange-400',
                      colorTheme === 'amber-400' && 'bg-amber-400',
                      colorTheme === 'yellow-400' && 'bg-yellow-400',
                      colorTheme === 'lime-400' && 'bg-lime-400',
                      colorTheme === 'green-400' && 'bg-green-400',
                      colorTheme === 'emerald-400' && 'bg-emerald-400',
                      colorTheme === 'teal-400' && 'bg-teal-400',
                      colorTheme === 'cyan-400' && 'bg-cyan-400',
                      colorTheme === 'sky-400' && 'bg-sky-400',
                      colorTheme === 'blue-400' && 'bg-blue-400',
                      colorTheme === 'indigo-400' && 'bg-indigo-400',
                      colorTheme === 'violet-400' && 'bg-violet-400',
                      colorTheme === 'purple-400' && 'bg-purple-400',
                      colorTheme === 'fuchsia-400' && 'bg-fuchsia-400',
                      colorTheme === 'pink-400' && 'bg-pink-400',
                      colorTheme === 'rose-400' && 'bg-rose-400',
                      colorTheme === 'red-500' && 'bg-red-500',
                      colorTheme === 'orange-500' && 'bg-orange-500',
                      colorTheme === 'amber-500' && 'bg-amber-500',
                      colorTheme === 'yellow-500' && 'bg-yellow-500',
                      colorTheme === 'lime-500' && 'bg-lime-500',
                      colorTheme === 'green-500' && 'bg-green-500',
                      colorTheme === 'emerald-500' && 'bg-emerald-500',
                      colorTheme === 'teal-500' && 'bg-teal-500',
                      colorTheme === 'cyan-500' && 'bg-cyan-500',
                      colorTheme === 'sky-500' && 'bg-sky-500',
                      colorTheme === 'blue-500' && 'bg-blue-500',
                      colorTheme === 'indigo-500' && 'bg-indigo-500',
                      colorTheme === 'violet-500' && 'bg-violet-500',
                      colorTheme === 'purple-500' && 'bg-purple-500',
                      colorTheme === 'fuchsia-500' && 'bg-fuchsia-500',
                      colorTheme === 'pink-500' && 'bg-pink-500',
                      colorTheme === 'rose-500' && 'bg-rose-500',
                      colorTheme === 'red-600' && 'bg-red-600',
                      colorTheme === 'orange-600' && 'bg-orange-600',
                      colorTheme === 'amber-600' && 'bg-amber-600',
                      colorTheme === 'yellow-600' && 'bg-yellow-600',
                      colorTheme === 'lime-600' && 'bg-lime-600',
                      colorTheme === 'green-600' && 'bg-green-600',
                      colorTheme === 'emerald-600' && 'bg-emerald-600',
                      colorTheme === 'teal-600' && 'bg-teal-600',
                      colorTheme === 'cyan-600' && 'bg-cyan-600',
                      colorTheme === 'sky-600' && 'bg-sky-600',
                      colorTheme === 'blue-600' && 'bg-blue-600',
                      colorTheme === 'indigo-600' && 'bg-indigo-600',
                      colorTheme === 'violet-600' && 'bg-violet-600',
                      colorTheme === 'purple-600' && 'bg-purple-600',
                      colorTheme === 'fuchsia-600' && 'bg-fuchsia-600',
                      colorTheme === 'pink-600' && 'bg-pink-600',
                      colorTheme === 'rose-600' && 'bg-rose-600',
                      colorTheme === 'red-700' && 'bg-red-700',
                      colorTheme === 'orange-700' && 'bg-orange-700',
                      colorTheme === 'amber-700' && 'bg-amber-700',
                      colorTheme === 'yellow-700' && 'bg-yellow-700',
                      colorTheme === 'lime-700' && 'bg-lime-700',
                      colorTheme === 'green-700' && 'bg-green-700',
                      colorTheme === 'emerald-700' && 'bg-emerald-700',
                      colorTheme === 'teal-700' && 'bg-teal-700',
                      colorTheme === 'cyan-700' && 'bg-cyan-700',
                      colorTheme === 'sky-700' && 'bg-sky-700',
                      colorTheme === 'blue-700' && 'bg-blue-700',
                      colorTheme === 'indigo-700' && 'bg-indigo-700',
                      colorTheme === 'violet-700' && 'bg-violet-700',
                      colorTheme === 'purple-700' && 'bg-purple-700',
                      colorTheme === 'fuchsia-700' && 'bg-fuchsia-700',
                      colorTheme === 'pink-700' && 'bg-pink-700',
                      colorTheme === 'rose-700' && 'bg-rose-700',
                      colorTheme === 'red-800' && 'bg-red-800',
                      colorTheme === 'orange-800' && 'bg-orange-800',
                      colorTheme === 'amber-800' && 'bg-amber-800',
                      colorTheme === 'yellow-800' && 'bg-yellow-800',
                      colorTheme === 'lime-800' && 'bg-lime-800',
                      colorTheme === 'green-800' && 'bg-green-800',
                      colorTheme === 'emerald-800' && 'bg-emerald-800',
                      colorTheme === 'teal-800' && 'bg-teal-800',
                      colorTheme === 'cyan-800' && 'bg-cyan-800',
                      colorTheme === 'sky-800' && 'bg-sky-800',
                      colorTheme === 'blue-800' && 'bg-blue-800',
                      colorTheme === 'indigo-800' && 'bg-indigo-800',
                      colorTheme === 'violet-800' && 'bg-violet-800',
                      colorTheme === 'purple-800' && 'bg-purple-800',
                      colorTheme === 'fuchsia-800' && 'bg-fuchsia-800',
                      colorTheme === 'pink-800' && 'bg-pink-800',
                      colorTheme === 'rose-800' && 'bg-rose-800',
                      colorTheme === 'red-900' && 'bg-red-900',
                      colorTheme === 'orange-900' && 'bg-orange-900',
                      colorTheme === 'amber-900' && 'bg-amber-900',
                      colorTheme === 'yellow-900' && 'bg-yellow-900',
                      colorTheme === 'lime-900' && 'bg-lime-900',
                      colorTheme === 'green-900' && 'bg-green-900',
                      colorTheme === 'emerald-900' && 'bg-emerald-900',
                      colorTheme === 'teal-900' && 'bg-teal-900',
                      colorTheme === 'cyan-900' && 'bg-cyan-900',
                      colorTheme === 'sky-900' && 'bg-sky-900',
                      colorTheme === 'blue-900' && 'bg-blue-900',
                      colorTheme === 'indigo-900' && 'bg-indigo-900',
                      colorTheme === 'violet-900' && 'bg-violet-900',
                      colorTheme === 'purple-900' && 'bg-purple-900',
                      colorTheme === 'fuchsia-900' && 'bg-fuchsia-900',
                      colorTheme === 'pink-900' && 'bg-pink-900',
                      colorTheme === 'rose-900' && 'bg-rose-900',
                    )}
                  />
                </Button>
              );
            })}
          </div>

          <div>
            <label class="mb-1 mt-8 block font-medium">Radius</label>
            <div class="grid grid-cols-3 gap-2">
              {borderRadiusOptions.map((borderRadius) => {
                const isActive = themeStore.borderRadius === borderRadius;
                return (
                  <Button
                    key={borderRadius}
                    look="outline"
                    size="xs"
                    onClick$={async () => {
                      themeStore.borderRadius = borderRadius;
                      setTheme(await themeStoreToThemeClasses());
                    }}
                    class={cn('justify-start', isActive && 'border-primary border-2')}
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
              onClick$={async () => {
                themeStore.contrast =
                  themeStore.contrast === 'high-contrast'
                    ? 'low-contrast'
                    : 'high-contrast';

                console.log(themeStore.contrast);
                setTheme(await themeStoreToThemeClasses());
              }}
            />
          </div>

          <div>
            <label class="mb-1 mt-8 block font-medium">Contrast</label>
            Dark Mode{' '}
            <input
              type="checkbox"
              onClick$={async () => {
                themeStore.mode = themeStore.mode === 'light' ? 'dark' : 'light';

                console.log(themeStore.mode);
                setTheme(await themeStoreToThemeClasses());
              }}
            />
          </div>
          {/* TODO: move into a Modal */}
          {/* <pre>
            <code>{extractedClasses.value}</code>
          </pre> */}
        </ModalContent>
        <ModalFooter class="flex justify-end gap-4">
          {/* <button
            class="bg-muted text-muted-foreground focus:ring-ring ring-offset-background focus-visible:ring-ring hover:bg-accent/90 hover:text-accent-foreground rounded-sm border border-none px-4 py-[10px] outline-none transition-colors focus:ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            onClick$={() => (showSig.value = false)}
          >
            Cancel
          </button>
          <button
            class="bg-primary text-primary-foreground focus:ring-ring ring-offset-background focus-visible:ring-ring hover:bg-primary/90 rounded-sm border border-none px-4 py-[10px] outline-none transition-colors focus:ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            onClick$={() => (showSig.value = false)}
          >
            Save Changes
          </button> */}
        </ModalFooter>
        <button
          onClick$={() => (showSig.value = false)}
          class="absolute right-6 top-[26px]"
        >
          <LuX class="h-8 w-8" />
        </button>
      </Modal>{' '}
    </section>
  );
});
