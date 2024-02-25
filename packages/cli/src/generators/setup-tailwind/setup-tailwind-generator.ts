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

  options.borderRadius = options.borderRadius ?? 'border-radius-dot-25';

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

  const rootTemplate = extractBetweenComments(
    tailwindTemplate,
    '// ROOT-START',
    '// ROOT-END',
  );
  const extendTemplate = extractBetweenComments(
    tailwindTemplate,
    '// EXTEND-START',
    '// EXTEND-END',
  );

  const commonJsModuleExportsRegex = /\bmodule\.exports\s*=\s*\{/;
  const esmModuleExportsRegex = /\bexport\s*default\s*\{/;
  let modifiedTailwindConfigContent;

  modifiedTailwindConfigContent = insertAfter({
    whatToFind: commonJsModuleExportsRegex,
    content: tailwindConfigContent,
    whatToInsert: rootTemplate,
    shouldThrow: false,
  });

  // if the result is undefined that means that
  // it didn't find the `module.exports` string
  if (!modifiedTailwindConfigContent) {
    modifiedTailwindConfigContent = insertAfter({
      whatToFind: esmModuleExportsRegex,
      content: tailwindConfigContent,
      whatToInsert: rootTemplate,
      shouldThrow: true,
      errorTitle: '"module.exports" or "export default"',
    });
  }

  const extendKeyword = /\bextend:\s*\{/;

  modifiedTailwindConfigContent = insertAfter({
    whatToFind: extendKeyword,
    content: modifiedTailwindConfigContent,
    whatToInsert: extendTemplate,
    shouldThrow: true,
    errorTitle: 'extend',
  });

  tree.write(tailwindConfigPath, modifiedTailwindConfigContent);
}

type InsertAfterConfig = {
  whatToFind: RegExp;
  content: string;
  whatToInsert: string;
  shouldThrow?: boolean;
  errorTitle?: string;
};

function insertAfter({
  whatToFind,
  content,
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
  themeConfig.baseColor = 'base-' + Color.NEUTRAL;

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
