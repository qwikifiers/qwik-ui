import { Tree, formatFiles, joinPathFragments } from '@nx/devkit';
import { InitGeneratorSchema } from './schema';
import { StyledKit } from './styled-kit.enum';

export const QWIK_UI_CONFIG_FILENAME = 'qwik-ui.config.json';

export const styledPackagesMap = {
  [StyledKit.FLUFFY]: '@qwik-ui/fluffy',
  [StyledKit.MINIMAL]: '@qwik-ui/minimal',
};

export async function initGenerator(tree: Tree, options: InitGeneratorSchema) {
  if (tree.exists(QWIK_UI_CONFIG_FILENAME)) {
    console.log(`${QWIK_UI_CONFIG_FILENAME} already exists`);
    return;
  }

  options.projectRoot ||= '/';
  options.styledKit ||= StyledKit.FLUFFY;
  options.componentsRoot ||= 'src/_components/ui';
  // options.rootCssPath ||= 'src/global.css';
  // options.tailwindConfigPath ||= 'tailwind.config.js';

  const fullConfigPath = joinPathFragments(options.projectRoot, QWIK_UI_CONFIG_FILENAME);

  tree.write(
    fullConfigPath,
    JSON.stringify({
      componentsRoot: options.componentsRoot,
      styledKit: options.styledKit,
      rootCssPath: options.rootCssPath,
      tailwindConfigPath: options.tailwindConfigPath,
    }),
  );

  // const styledPackage = styledPackagesMap[options.styledKit];

  // installStyledKit(styledPackage);

  // setupTailwind(styledPackage)

  /*
const res = await execAndWait(
      `${pmc.exec} nx g nx:connect-to-nx-cloud --no-interactive --quiet`,
      directory
    );
*/

  await formatFiles(tree);
}

export default initGenerator;
