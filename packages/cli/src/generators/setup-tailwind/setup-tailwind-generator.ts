import { Tree, formatFiles, joinPathFragments } from '@nx/devkit';
import {
  ThemeBaseColors,
  ThemeBorderRadiuses,
  ThemePrimaryColors,
  ThemeStyles,
  extractThemeCSS,
  type ThemeConfig,
} from '@qwik-ui/utils';
import { readFileSync } from 'fs';
import { getKitRoot } from '../../_shared/get-kit-root';
import { SetupTailwindGeneratorSchema } from './schema';

export async function setupTailwindGenerator(
  tree: Tree,
  options: SetupTailwindGeneratorSchema,
) {
  const kitRoot = getKitRoot();

  const globalCssPath = options.rootCssPath ?? 'src/global.css';

  options.projectRoot = options.projectRoot ?? '';

  options.style = options.style ?? ThemeStyles.SIMPLE;
  options.primaryColor = options.primaryColor ?? ThemePrimaryColors.CYAN600;

  options.borderRadius = options.borderRadius ?? ThemeBorderRadiuses['BORDER-RADIUS-0'];

  updateRootCss(tree, globalCssPath, kitRoot, {
    style: options.style,
    primaryColor: options.primaryColor,
    borderRadius: options.borderRadius,
  });

  await formatFiles(tree);
}

function updateRootCss(
  tree: Tree,
  globalCssPath: string,
  kitRoot: string,
  themeConfig: ThemeConfig,
) {
  themeConfig.baseColor = ThemeBaseColors.SLATE;

  const rootCssContent = tree.read(globalCssPath, 'utf-8');

  console.log('rootCssContent', rootCssContent);

  const tailwindBaseImport = '@import "tailwindcss";';

  const rootCssContentWithoutTailwindBaseImport = rootCssContent.replace(
    tailwindBaseImport,
    '',
  );

  const utilsDirectiveIndex = rootCssContent?.indexOf(tailwindBaseImport);

  const afterTailwindDirectives = utilsDirectiveIndex + tailwindBaseImport.length;

  const firstPart = rootCssContentWithoutTailwindBaseImport?.slice(
    0,
    afterTailwindDirectives,
  );

  const secondPart = rootCssContentWithoutTailwindBaseImport?.slice(
    afterTailwindDirectives,
    rootCssContentWithoutTailwindBaseImport.length,
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

export default setupTailwindGenerator;
