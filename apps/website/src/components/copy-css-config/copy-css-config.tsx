import { $, component$, useSignal } from '@builder.io/qwik';
import { Modal, ModalContent, ModalFooter, ModalHeader } from '@qwik-ui/headless';
import { Button } from '@qwik-ui/styled';
import { LuX } from '@qwikest/icons/lucide';
import { useTheme } from 'qwik-themes';
import { Theme } from 'qwik-themes/lib-types/lib/types';
import globalCSS from '~/global.css?raw';

export default component$(() => {
  const showSig = useSignal(false);

  const cssThemeOutput = useSignal<string>('');

  const { theme } = useTheme();

  const generateCSSThemeOutput = $(async () => {
    const cssClasses = (() => {
      const startMarker = '/* CSS PARSER: START - DO NOT REMOVE */';
      const endMarker = '/* CSS PARSER: END - DO NOT REMOVE */';

      // Find the indexes of the start and end markers
      const startIndex = globalCSS.indexOf(startMarker) + startMarker.length;
      const endIndex = globalCSS.indexOf(endMarker);

      // Extract the content between the start and end markers
      let extractedCSS = globalCSS.substring(startIndex, endIndex).trim();
      console.log('extractedCSS: ', extractedCSS);

      // Remove all CSS comments
      extractedCSS = extractedCSS.replace(/\/\*[\s\S]*?\*\//g, '').trim();

      return extractedCSS;
    })();

    function cssClassesToObj(css: string): Record<string, Record<string, string>> {
      const objectThemingClasses: Record<string, Record<string, string>> = {};

      // Split the CSS string by '}' to separate class blocks, filtering out empty strings.
      const classBlocks = css.split('}').filter((block) => block.trim() !== '');

      classBlocks.forEach((block) => {
        // Find the index where the class definitions end and the CSS properties start.
        const startOfProperties = block.indexOf('{');
        if (startOfProperties === -1) return; // Skip if '{' not found to avoid errors.

        // Extract class names and properties substrings.
        const classKeys = block.substring(0, startOfProperties).trim();
        const classValues = block.substring(startOfProperties + 1).trim();

        // Split class names by ',' in case multiple classes are defined together.
        const classKeysArray = classKeys.split(',').map((name) => name.trim()); // Remove leading '.' from class names.
        console.log('classNamesArray: ', classKeysArray);

        // Process CSS properties into a key-value map.
        const properties = classValues
          .split(';')
          .reduce((acc: Record<string, string>, current) => {
            const [key, value] = current.split(':').map((part) => part.trim());
            if (key && value) {
              acc[key] = value;
            }
            return acc;
          }, {});

        // Assign properties to each class name found.
        classKeysArray.forEach((className) => {
          if (!objectThemingClasses[className]) {
            objectThemingClasses[className] = {};
          }
          Object.assign(objectThemingClasses[className], properties);
        });
      });

      return objectThemingClasses;
    }

    function removeDarkClasses(
      classes: Record<string, Record<string, string>>,
    ): Record<string, Record<string, string>> {
      const filteredClasses: Record<string, Record<string, string>> = {};

      // Iterate over all class names in the input object
      Object.keys(classes).forEach((className) => {
        // Check if the class name does not start with 'dark'
        if (!className.includes('.dark')) {
          // If it doesn't, include it in the filtered classes
          filteredClasses[className] = classes[className];
        }
      });

      return filteredClasses;
    }

    function applyDarkOverrides(
      classes: Record<string, Record<string, string>>,
    ): Record<string, Record<string, string>> {
      const result: Record<string, Record<string, string>> = {};

      // Iterate over all classes in the input
      Object.keys(classes).forEach((className) => {
        // Check if this class is a dark theme override
        if (className.includes('.dark')) {
          // Extract the actual class name by removing the 'dark' prefix and any leading dots
          const baseClassName = className.replace(/^\.dark/, '');

          // If the base class exists, merge the dark properties into it
          if (classes[baseClassName]) {
            result[baseClassName] = {
              ...classes[baseClassName], // Original properties
              ...classes[className], // Override with dark properties
            };
          } else {
            // If the base class does not exist, just add the dark class as is (without 'dark' prefix)
            result[baseClassName] = classes[className];
          }
        } else if (!result[className]) {
          // Ensure not to override already processed classes
          // If it's not a dark override, copy the class as is
          result[className] = classes[className];
        }
      });

      return result;
    }

    type ObjTheme = {
      root: Record<string, string>;
      dark: Record<string, string>;
    };
    function generateObjThemeOutput({
      theme,
      objRootClasses,
      objDarkClasses,
    }: {
      theme: Theme;
      objRootClasses: Record<string, Record<string, string>>;
      objDarkClasses: Record<string, Record<string, string>>;
    }): ObjTheme {
      if (!theme) throw new Error('No theme provided');

      console.log('objRootClasses: ', objRootClasses[`.base-slate`]);

      const themeClasses: string[] = Array.isArray(theme) ? theme : theme?.split(' ');
      let rootOutput: Record<string, string> = {};
      let darkOutput: Record<string, string> = {};

      themeClasses.forEach((themeClass) => {
        if (objRootClasses[`.${themeClass}`]) {
          rootOutput = { ...rootOutput, ...objRootClasses[`.${themeClass}`] };
        }
      });

      themeClasses.forEach((themeClass) => {
        if (objDarkClasses[`.${themeClass}`]) {
          darkOutput = { ...darkOutput, ...objDarkClasses[`.${themeClass}`] };
        }
      });
      console.log('rootOutput: ', rootOutput);
      console.log('darkOutput: ', darkOutput);

      return {
        root: rootOutput,
        dark: darkOutput,
      };
    }

    function objThemeToCSSThemeOutput(themeObject: ObjTheme) {
      let cssOutput = `@layer base {\n`;

      // Iterate over each theme (e.g., 'root', 'dark')
      for (const [theme, values] of Object.entries(themeObject)) {
        cssOutput += `  ${theme === 'root' ? ':root' : `.${theme}`} {\n`;
        // Iterate over each variable in the theme
        for (const [variable, value] of Object.entries(values)) {
          cssOutput += `    ${variable}: ${value};\n`;
        }
        cssOutput += `  }\n`;
      }

      cssOutput += `}`;

      return cssOutput;
    }

    // Parse the CSS to get the variables
    const objClasses = cssClassesToObj(cssClasses);
    console.log('themes: ', objClasses);

    // Example usage with the cssThemeToObjectTheme function output
    const objDarkClasses = applyDarkOverrides(objClasses);
    console.log('objDarkClasses:', objDarkClasses);
    const objRootClasses = removeDarkClasses(objClasses);
    console.log('objRootClasses: ', objRootClasses);

    // Build the theme CSS
    const objectTheme = generateObjThemeOutput({ theme, objRootClasses, objDarkClasses });
    console.log('objectTheme', objectTheme);

    cssThemeOutput.value = objThemeToCSSThemeOutput(objectTheme);
    console.log('cssThemeOutput: ', cssThemeOutput.value);
  });

  return (
    <>
      <Button
        onClick$={() => {
          showSig.value = true;
          generateCSSThemeOutput();
        }}
      >
        Copy code
      </Button>
      <Modal
        bind:show={showSig}
        class="my-animation bg-background text-foreground max-w-2xl rounded-sm p-8 shadow-md backdrop:backdrop-blur backdrop:backdrop-brightness-50 dark:backdrop:backdrop-brightness-100"
      >
        <ModalHeader>
          <h2 class="text-lg font-bold">Copy config</h2>
          <p>Copy the config below into your own codebase</p>
        </ModalHeader>
        <ModalContent class="mb-2 pb-4 pt-2">
          <div>
            <pre>
              <code>{cssThemeOutput.value}</code>
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
