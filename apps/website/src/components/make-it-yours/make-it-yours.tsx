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
import { LuCheck, LuSlidersHorizontal, LuX } from '@qwikest/icons/lucide';
import { useTheme } from 'qwik-themes';
import { Theme, borderRadiusOptions, colorThemeOptions } from '~/_state/make-it-yours';
import globalCSS from '~/global.css?raw';

export default component$(() => {
  useStyles$(`
    .sheet::backdrop {
      background: hsla(0, 0%, 0%, 0.5);
    }
  
    .sheet.modal-showing {
      animation: sheetOpen 0.75s forwards cubic-bezier(0.6, 0.6, 0, 1);
    }
  
    .sheet.modal-showing::backdrop {
      animation: sheetFadeIn 0.75s forwards cubic-bezier(0.6, 0.6, 0, 1);
    }
  
    .sheet.modal-closing {
      animation: sheetClose 0.35s forwards cubic-bezier(0.6, 0.6, 0, 1);
    }
  
    .sheet.modal-closing::backdrop {
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
    colorTheme: 'zinc',
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
        class="sheet bg-background text-foreground mr-0 h-screen max-w-96 rounded-sm border-0 p-8 shadow-md backdrop:backdrop-brightness-100"
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
            <option value={'skeuomorphic'}>Skeuomorphic</option>
          </select>

          <label class="mb-1 mt-8 block font-medium">Color Theme</label>
          <div class="grid grid-cols-3 gap-2">
            {colorThemeOptions.map((colorTheme) => {
              const isActive = themeStore.colorTheme === colorTheme;
              return (
                <Button
                  key={colorTheme}
                  look="outline"
                  size="xs"
                  onClick$={async () => {
                    themeStore.colorTheme = colorTheme;
                    setTheme(await themeStoreToThemeClasses());
                  }}
                  class={cn('justify-start', isActive && 'border-primary border-2')}
                >
                  <span
                    class={cn(
                      'mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full',
                      colorTheme === 'slate' && 'bg-slate-500',
                      colorTheme === 'gray' && 'bg-gray-500',
                      colorTheme === 'zinc' && 'bg-zinc-500',
                      colorTheme === 'neutral' && 'bg-neutral-500',
                      colorTheme === 'stone' && 'bg-stone-500',
                      colorTheme === 'red' && 'bg-red-500',
                      colorTheme === 'orange' && 'bg-orange-500',
                      colorTheme === 'yellow' && 'bg-yellow-500',
                      colorTheme === 'green' && 'bg-green-500',
                      colorTheme === 'blue' && 'bg-blue-500',
                      colorTheme === 'violet' && 'bg-violet-500',
                      colorTheme === 'rose' && 'bg-rose-500',
                    )}
                  >
                    {isActive && <LuCheck class="h-4 w-4 text-white" />}
                  </span>
                  {colorTheme}
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
            <label class="mb-1 mt-8 block font-medium">High Contrast</label>
            <button
              onClick$={async () => {
                themeStore.contrast =
                  themeStore.contrast === 'high-contrast'
                    ? 'low-contrast'
                    : 'high-contrast';

                console.log(themeStore.contrast);
                setTheme(await themeStoreToThemeClasses());
              }}
            >
              test
            </button>
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
