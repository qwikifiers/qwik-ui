import { Tree, formatFiles, joinPathFragments, workspaceRoot } from '@nx/devkit';
import {
  Color,
  ThemeStyle,
  extractBetweenComments,
  extractThemeCSS,
  type ThemeConfig,
} from '@qwik-ui/utils';
import { readFileSync } from 'fs';
import { join } from 'path';
import { getKitRoot } from '../../_shared/get-kit-root';
import { SetupTailwindGeneratorSchema } from './schema';

export async function setupTailwindGenerator(
  tree: Tree,
  options: SetupTailwindGeneratorSchema,
) {
  const kitRoot = getKitRoot();

  const globalCssPath = options.rootCssPath ?? 'src/global.css';

  options.projectRoot = options.projectRoot ?? '';

  options.style = options.style ?? ThemeStyle.SIMPLE;
  options.primaryColor = options.primaryColor ?? Color.CYAN + '-600';
  options.primaryColor = 'primary-' + options.primaryColor;

  options.borderRadius = options.borderRadius ?? 'border-radius-0';

  updateTailwindConfig(tree, options.projectRoot, kitRoot);

  updateRootCss(tree, globalCssPath, kitRoot, {
    style: options.style,
    primaryColor: options.primaryColor,
    borderRadius: options.borderRadius,
  });

  await formatFiles(tree);
}

function updateTailwindConfig(tree: Tree, projectRoot: string, kitRoot: string) {
  const tailwindConfigPath = getTailwindConfigPath(tree, projectRoot, workspaceRoot);

  if (!tailwindConfigPath) {
    throw new Error('Could not find a tailwind config file');
  }

  const tailwindConfigContent = tree.read(tailwindConfigPath, 'utf-8');

  if (!tailwindConfigContent) {
    throw new Error('Could not read the tailwind config file');
  }

  const tailwindConfigTemplatePath = joinPathFragments(
    kitRoot,
    'src',
    'templates',
    'tailwind.config.cjs',
  );

  const tailwindTemplate = readFileSync(tailwindConfigTemplatePath, 'utf-8');

  const pluginTemplate = extractBetweenComments(
    tailwindTemplate,
    '// PLUGIN-START',
    '// PLUGIN-END',
  );
  const extendTemplate = extractBetweenComments(
    tailwindTemplate,
    '// EXTEND-START',
    '// EXTEND-END',
  );

  let modifiedTailwindConfigContent = addPluginToConfig(
    pluginTemplate,
    tailwindConfigContent,
  );

  const extendKeyword = /\bextend:\s*\{/;

  modifiedTailwindConfigContent = insertAfter({
    whatToFind: extendKeyword,
    whereToFindIt: modifiedTailwindConfigContent,
    whatToInsert: extendTemplate,
    shouldThrow: true,
    errorTitle: 'extend',
  });

  tree.write(tailwindConfigPath, modifiedTailwindConfigContent);
}

function addPluginToConfig(pluginTemplate: string, tailwindConfigContent: string) {
  let modifiedTailwindConfigContent;
  const commonJsModuleExportsRegex = /\bmodule\.exports\s*=\s*\{/;
  const isESM = !commonJsModuleExportsRegex.test(tailwindConfigContent);

  const esmModuleExportsRegex = /\bexport\s*default\s*\{/;
  const pluginsKeyword = /\bplugins:\s*\[/;

  modifiedTailwindConfigContent = insertAfter({
    whatToFind: pluginsKeyword,
    whereToFindIt: tailwindConfigContent,
    whatToInsert: pluginTemplate,
    shouldThrow: false,
  });

  if (modifiedTailwindConfigContent) {
    return addPluginImportStatement(modifiedTailwindConfigContent, isESM);
  }

  pluginTemplate = `plugins: [\n${pluginTemplate}\n  ],\n`;

  modifiedTailwindConfigContent = insertAfter({
    whatToFind: commonJsModuleExportsRegex,
    whereToFindIt: tailwindConfigContent,
    whatToInsert: pluginTemplate,
    shouldThrow: false,
  });

  // if the result is undefined that means that
  // it didn't find the `module.exports` string
  if (!modifiedTailwindConfigContent) {
    modifiedTailwindConfigContent = insertAfter({
      whatToFind: esmModuleExportsRegex,
      whereToFindIt: tailwindConfigContent,
      whatToInsert: pluginTemplate,
      shouldThrow: true,
      errorTitle: '"module.exports" or "export default"',
    });
  }

  return addPluginImportStatement(modifiedTailwindConfigContent, isESM);
}

function addPluginImportStatement(content: string, isESM = false) {
  if (isESM) {
    return `import plugin from 'tailwindcss/plugin';
${content}`;
  }
  return `const plugin = require('tailwindcss/plugin');
${content}`;
}

type InsertAfterConfig = {
  whatToFind: RegExp;
  whereToFindIt: string;
  whatToInsert: string;
  shouldThrow?: boolean;
  errorTitle?: string;
};

function insertAfter({
  whatToFind,
  whereToFindIt: content,
  whatToInsert,
  shouldThrow,
  errorTitle,
}: InsertAfterConfig) {
  const match = content.match(whatToFind);

  if (!match || !match.index) {
    if (shouldThrow) {
      throw new Error(`Could not find the "${errorTitle}" in your tailwind config file`);
    }
    return;
  }

  if (match && match.index) {
    const startIndex = match.index + match[0].length;
    const modifiedTailwindConfigContent =
      content.slice(0, startIndex) + whatToInsert + content.slice(startIndex);

    return modifiedTailwindConfigContent;
  }
}

function updateRootCss(
  tree: Tree,
  globalCssPath: string,
  kitRoot: string,
  themeConfig: ThemeConfig,
) {
  themeConfig.baseColor = 'base-' + Color.SLATE;

  const rootCssContent = tree.read(globalCssPath, 'utf-8');

  const tailwindUtilsDirective = '@tailwind utilities;';
  const utilsDirectiveIndex = rootCssContent?.indexOf(tailwindUtilsDirective);

  if (!utilsDirectiveIndex) {
    console.error('Could not find the tailwind directives in your global css file');
    return;
  }

  const afterTailwindDirectives = utilsDirectiveIndex + tailwindUtilsDirective.length;

  const firstPart = rootCssContent?.slice(0, afterTailwindDirectives);

  const secondPart = rootCssContent?.slice(
    afterTailwindDirectives,
    rootCssContent.length,
  );

  const themeStr = `${themeConfig.style} ${themeConfig.baseColor} ${themeConfig.primaryColor} ${themeConfig.borderRadius}`;

  const pathToGlobalCssTemplate = joinPathFragments(
    kitRoot,
    'src',
    'templates',
    'global.css',
  );

  const rootCssTemplate = readFileSync(pathToGlobalCssTemplate, 'utf-8');

  const cssVarsContent = extractThemeCSS(themeStr, rootCssTemplate);

  const updatedGlobalCssContent = `
  ${firstPart}
  ${cssVarsContent}
  ${secondPart}
  `;

  tree.write(globalCssPath, updatedGlobalCssContent);
}

// CREDIT FOR CODE: Nx Angular plugin
function getTailwindConfigPath(
  tree: Tree,
  projectRoot: string,
  workspaceRoot: string,
): string | undefined {
  // valid tailwind config files https://github.com/tailwindlabs/tailwindcss/blob/master/src/util/resolveConfigPath.js#L4
  const tailwindConfigFiles = [
    'tailwind.config.js',
    'tailwind.config.cjs',
    'tailwind.config.mjs',
    'tailwind.config.ts',
  ];

  for (const basePath of [projectRoot, workspaceRoot]) {
    for (const configFile of tailwindConfigFiles) {
      const fullPath = join(basePath, configFile);
      if (tree.read(fullPath)) {
        return fullPath;
      }
    }
  }

  return undefined;
}

export default setupTailwindGenerator;
