import { Tree, formatFiles, joinPathFragments, workspaceRoot } from '@nx/devkit';
import { readFileSync } from 'fs';
import { join } from 'path';
import { getKitRoot } from '../../_shared/get-kit-root';
import { StyledTheme } from '../../_shared/styled-theme.enum';
import { SetupTailwindGeneratorSchema } from './schema';

export async function setupTailwindGenerator(
  tree: Tree,
  options: SetupTailwindGeneratorSchema,
) {
  const kitRoot = getKitRoot();

  const globalCssPath = options.rootCssPath ?? 'src/global.css';

  options.projectRoot = options.projectRoot ?? '';

  options.styledTheme = options.styledTheme ?? StyledTheme.FLUFFY;

  updateTailwindConfig(tree, options.projectRoot, kitRoot);

  updateRootCss(tree, globalCssPath, kitRoot, options.styledTheme);

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

  const moduleExportsRegex = /\bmodule\.exports\s*=\s*\{/;

  let modifiedTailwindConfigContent = insertAfter(
    moduleExportsRegex,
    tailwindConfigContent,
    rootTemplate,
    'module.exports',
  );

  const extendKeyword = /\bextend:\s*\{/;

  modifiedTailwindConfigContent = insertAfter(
    extendKeyword,
    modifiedTailwindConfigContent,
    extendTemplate,
    'extend',
  );

  tree.write(tailwindConfigPath, modifiedTailwindConfigContent);
}

function insertAfter(
  regex: RegExp,
  content: string,
  toInsert: string,
  errorTitle: string,
) {
  const match = content.match(regex);

  if (!match || !match.index) {
    throw new Error(
      `Could not find the "${errorTitle}" property in your tailwind config file`,
    );
  }

  if (match && match.index) {
    const startIndex = match.index + match[0].length;
    const modifiedTailwindConfigContent =
      content.slice(0, startIndex) + toInsert + content.slice(startIndex);

    return modifiedTailwindConfigContent;
  }
}

function extractBetweenComments(
  content: string,
  startComment: string,
  endComment: string,
): string {
  const startIndex = content.indexOf(startComment) + startComment.length;
  const endIndex = content.indexOf(endComment);
  return content.substring(startIndex, endIndex).trim();
}

function updateRootCss(
  tree: Tree,
  globalCssPath: string,
  kitRoot: string,
  styledTheme: string,
) {
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

  const pathToGlobalCssTemplate = joinPathFragments(
    kitRoot,
    'src',
    'templates',
    'themes',
    styledTheme + '.css_template',
  );
  const rootCssTemplate = readFileSync(pathToGlobalCssTemplate, 'utf-8');
  const updatedGlobalCssContent = `
  ${firstPart}
  ${rootCssTemplate}
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
