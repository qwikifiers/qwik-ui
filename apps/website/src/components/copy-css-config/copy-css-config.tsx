import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Modal, ModalContent, ModalFooter, ModalHeader } from '@qwik-ui/headless';
import { Button } from '@qwik-ui/styled';
import { LuX } from '@qwikest/icons/lucide';
import globalCSS from '~/global.css?raw';

export default component$(() => {
  const showSig = useSignal(false);

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
    <>
      <Button onClick$={() => (showSig.value = true)}>Copy code</Button>
      <Modal
        bind:show={showSig}
        class="my-animation bg-background text-foreground max-w-2xl rounded-sm p-8 shadow-md backdrop:backdrop-blur backdrop:backdrop-brightness-50 dark:backdrop:backdrop-brightness-100"
      >
        <ModalHeader>
          <h2 class="text-lg font-bold">Edit Profile</h2>
        </ModalHeader>
        <ModalContent class="mb-2 pb-4 pt-2">
          <div>
            <pre>
              <code>{globalCSS}</code>
            </pre>
          </div>
        </ModalContent>
        <ModalFooter class="flex justify-end gap-4">
          <button
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
          </button>
        </ModalFooter>
        <button
          onClick$={() => (showSig.value = false)}
          class="absolute right-6 top-[26px]"
        >
          <LuX class="h-8 w-8" />
        </button>
      </Modal>
    </>
  );
});
