import { component$, useSignal, useStyles$, useVisibleTask$ } from '@builder.io/qwik';
import { Modal, ModalContent, ModalFooter, ModalHeader } from '@qwik-ui/headless';
import { LuSlidersHorizontal, LuX } from '@qwikest/icons/lucide';
import { useTheme } from 'qwik-themes';
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
            onChange$={(e, el) => {
              console.log('e', el.value.split(' '));
              setTheme(el.value);
            }}
          >
            <option value={'simple light'}>Simple light</option>
            <option value={'simple light zinc'}>Simple light zinc</option>
            <option value={'simple light zinc high-contrast'}>
              Simple light zinc high-contrast
            </option>
            <option value={'brutalist light zinc high-contrast'}>Brutalist light</option>
            <option value={'skeuomorphic light zinc'}> Skeuomorphic light</option>
            <option value={'simple dark zinc'}>Simple dark</option>
            <option value={'brutalist dark zinc high-contrast'}>Brutalist dark</option>
            <option value={'skeuomorphic dark zinc'}> Skeuomorphic dark</option>
          </select>

          <pre>
            <code>{extractedClasses.value}</code>
          </pre>
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
