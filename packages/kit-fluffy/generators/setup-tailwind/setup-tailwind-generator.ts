import { Tree, formatFiles, joinPathFragments, workspaceRoot } from '@nx/devkit';
import { readFileSync } from 'fs';
import { join } from 'path';
import { SetupTailwindGeneratorSchema } from './schema';

export async function setupTailwindGenerator(
  tree: Tree,
  options: SetupTailwindGeneratorSchema,
) {
  const globalCssPath = options.rootCssPath ?? 'src/global.css';

  options.projectRoot = options.projectRoot ?? '';

  updateTailwindConfig(tree, options.projectRoot);

  updateRootCss(tree, globalCssPath);

  await formatFiles(tree);
}

function updateTailwindConfig(tree: Tree, projectRoot: string) {
  const tailwindConfigPath = getTailwindConfigPath(tree, projectRoot, workspaceRoot);

  if (!tailwindConfigPath) {
    throw new Error('Could not find a tailwind config file');
  }

  const tailwindConfigContent = tree.read(tailwindConfigPath, 'utf-8');

  if (!tailwindConfigContent) {
    throw new Error('Could not read the tailwind config file');
  }

  const tailwindConfigTemplatePath = joinPathFragments(
    __dirname,
    '..',
    '..',
    'src',
    'templates',
    'tailwind.extend._template',
  );

  const cssVarsTemplate = readFileSync(tailwindConfigTemplatePath, 'utf-8');

  const extendKeyword = /\bextend:\s*\{/;

  const match = tailwindConfigContent.match(extendKeyword);
  console.log('**** MATCH', match);
  if (!match || !match.index) {
    throw new Error('Could not find the "extend" property in your tailwind config file');
  }

  if (match && match.index) {
    const startIndex = match.index + match[0].length;
    const modifiedTailwindConfigContent =
      tailwindConfigContent.slice(0, startIndex) +
      cssVarsTemplate +
      tailwindConfigContent.slice(startIndex);

    tree.write(tailwindConfigPath, modifiedTailwindConfigContent);
  }
}

function updateRootCss(tree: Tree, globalCssPath: string) {
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
    __dirname,
    '..',
    '..',
    'src',
    'templates',
    'root.css_template',
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
