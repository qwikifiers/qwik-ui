import { Tree, formatFiles, joinPathFragments } from '@nx/devkit';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { SetupTailwindGeneratorSchema } from './schema';

export async function setupTailwindGenerator(
  tree: Tree,
  options: SetupTailwindGeneratorSchema,
) {
  const globalCssPath = options.rootCssPath ?? 'src/global.css';

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

  await formatFiles(tree);
}

// CREDIT FOR CODE: Nx Angular plugin
function getTailwindConfigPath(
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
      if (existsSync(fullPath)) {
        return fullPath;
      }
    }
  }

  return undefined;
}
