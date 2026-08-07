import { Theme } from '@qwik-ui/themes';
import { calculate, compare } from 'specificity';
import { extractBetweenComments } from './extract-between-comments';

export const extractThemeCSS = (theme: Theme, globalCSS: string) => {
  const cssClasses = extractRelevantCSS(globalCSS);

  // Parse the CSS to get the variables
  const classesMap = createClassesMap(cssClasses);
  // Example usage with the cssThemeToObjectTheme function output
  const objDarkClasses = applyDarkOverrides(classesMap);
  const objRootClasses = removeDarkClasses(classesMap);

  // Build the theme CSS
  const objTheme = generateObjThemeOutput({ theme, objRootClasses, objDarkClasses });
  const orderedObjTheme = reorderThemeObject(objTheme);

  const output = objThemeToCSSThemeOutput(orderedObjTheme, globalCSS);

  return output;
};

function extractRelevantCSS(cssContent: string) {
  const startMarker = '/* CSS PARSER: START - DO NOT REMOVE */';
  const endMarker = '/* CSS PARSER: END - DO NOT REMOVE */';

  let extractedCSS = extractBetweenComments(cssContent, startMarker, endMarker);

  // Remove all CSS comments
  extractedCSS = extractedCSS.replace(/\/\*[\s\S]*?\*\//g, '').trim();

  return extractedCSS;
}

function createClassesMap(css: string): Record<string, Record<string, string>> {
  const classesMap: Record<string, Record<string, string>> = {};

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
      if (!classesMap[className]) {
        classesMap[className] = {};
      }
      Object.assign(classesMap[className], properties);
    });
  });

  return classesMap;
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

type ThemeMap = {
  root: Record<string, string>;
  dark: Record<string, string>;
};

type GenerateThemeProps = {
  theme: Theme;
  objRootClasses: Record<string, Record<string, string>>;
  objDarkClasses: Record<string, Record<string, string>>;
};

function generateObjThemeOutput({
  theme,
  objRootClasses,
  objDarkClasses,
}: GenerateThemeProps): ThemeMap {
  if (!theme) throw new Error('No theme provided');

  // Sort classes by specificity
  const sortedObjRootClasses = sortObjClassesBySpecificity(objRootClasses);
  const sortedObjDarkClasses = sortObjClassesBySpecificity(objDarkClasses);

  const themeClasses: string[] = Array.isArray(theme) ? theme : theme?.split(' ');
  let rootOutput: Record<string, string> = {};
  let darkOutput: Record<string, string> = {};

  // For root classes
  Object.entries(sortedObjRootClasses).forEach(([key, value]) => {
    themeClasses.forEach((themeClass) => {
      // Modify this to check if the key ends with the class name, accounting for specificity
      if (key.includes(`.${themeClass}`)) {
        rootOutput = { ...rootOutput, ...value };
      }
    });
  });

  // For dark classes
  Object.entries(sortedObjDarkClasses).forEach(([key, value]) => {
    themeClasses.forEach((themeClass) => {
      // Similar logic for dark classes
      if (key.includes(`.${themeClass}`)) {
        darkOutput = { ...darkOutput, ...value };
      }
    });
  });

  return {
    root: rootOutput,
    dark: darkOutput,
  };
}

// Sort objects props by specificity to automatically apply specificity to the output
function sortObjClassesBySpecificity(classes: Record<string, Record<string, string>>) {
  // Convert the classes object to an array of [className, classStyles] pairs
  const classNames = Object.keys(classes);

  // Sort the array based on the specificity of className
  const sortedClassNames = classNames.sort((a, b) => {
    // using 'specificity' npm package
    const specificityA = calculate(a);
    const specificityB = calculate(b);
    return compare(specificityA, specificityB);
  });

  // Convert the sorted array back to an object
  const sortedObjClasses = sortedClassNames.reduce(
    (obj: Record<string, Record<string, string>>, className) => {
      obj[className] = classes[className];
      return obj;
    },
    {},
  );

  return sortedObjClasses;
}

function reorderThemeObject(themeObject: ThemeMap) {
  const order = [
    '--background',
    '--foreground',
    '--muted',
    '--muted-foreground',
    '--popover',
    '--popover-foreground',
    '--card',
    '--card-foreground',
    '--border',
    '--input',
    '--primary',
    '--primary-foreground',
    '--secondary',
    '--secondary-foreground',
    '--accent',
    '--accent-foreground',
    '--alert',
    '--alert-foreground',
    '--ring',
    '--border-width',
    '--stroke-width',
    '--border-radius',
    '--shadow-base',
    '--shadow-2xs',
    '--shadow-xs',
    '--shadow-sm',
    '--shadow-md',
    '--shadow-lg',
    '--shadow-xl',
    '--shadow-2xl',
    '--shadow-inner',
    '--transform-press',
  ];

  function reorderObject(obj: Record<string, string>) {
    const ordered: Record<string, string> = {};
    order.forEach((key) => {
      if (key in obj) {
        ordered[key] = obj[key];
      }
    });
    return ordered;
  }

  return {
    root: reorderObject(themeObject.root),
    dark: reorderObject(themeObject.dark),
  };
}

function objThemeToCSSThemeOutput(themeObject: ThemeMap, globalCSS: string) {
  // Extract header (before :root), strip @source, rename @layer theme -> @layer base
  let header = globalCSS.substring(0, globalCSS.indexOf(':root {'));
  header = header
    .replace(/@source\s+[^;]+;\n*/g, '')
    .replace('@layer theme {', '@layer base {')
    .trimStart()
    .replace(/\s+$/, '\n');

  let cssOutput = header;

  // Iterate over each theme (e.g., 'root', 'dark')
  for (const [theme, values] of Object.entries(themeObject)) {
    cssOutput += `  ${theme === 'root' ? ':root' : `.${theme}`} {\n`;
    // Iterate over each variable in the theme
    for (const [variable, value] of Object.entries(values)) {
      cssOutput += `    ${variable}: ${value};\n`;
    }
    cssOutput += `  }\n`;
  }
  cssOutput += `}\n\n`;

  // Extract @theme { ... } + @utility blocks from globalCSS.
  // Bounded between @theme { and /* CSS PARSER: START, minus the trailing @layer base block.
  const themeStart = globalCSS.indexOf('@theme {');
  const parserStart = globalCSS.indexOf('/* CSS PARSER: START');
  if (themeStart !== -1 && parserStart !== -1) {
    let block = globalCSS.substring(themeStart, parserStart);
    const lastLayer = block.lastIndexOf('@layer');
    if (lastLayer !== -1) block = block.substring(0, lastLayer);
    block = block.trimEnd();

    // @theme is nested inside @layer theme in global.css, so strip the outer closing }
    // then un-indent by 2 spaces before appending to output
    const utilityIdx = block.indexOf('@utility press');
    if (utilityIdx !== -1) {
      let themeBlock = block.substring(0, utilityIdx).trimEnd();
      if (themeBlock.endsWith('}')) {
        themeBlock = themeBlock.substring(0, themeBlock.length - 1).trimEnd() + '\n\n';
      }
      cssOutput += themeBlock.replace(/^ {2}/gm, '') + block.substring(utilityIdx) + '\n';
    } else {
      cssOutput += block.replace(/^ {2}/gm, '') + '\n';
    }
  }

  return cssOutput;
}
