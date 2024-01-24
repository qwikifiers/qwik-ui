import { Tree, formatFiles, joinPathFragments } from '@nx/devkit';
import { QWIK_UI_CONFIG_FILENAME } from '../../_shared/config-filenames';
import { InitGeneratorSchema } from './schema';

export async function initGenerator(tree: Tree, options: InitGeneratorSchema) {
  if (tree.exists(QWIK_UI_CONFIG_FILENAME)) {
    console.log(`${QWIK_UI_CONFIG_FILENAME} already exists`);
    return;
  }

  options.projectRoot ||= '/';
  options.componentsRoot ||= 'src/components/ui';

  const fullConfigPath = joinPathFragments(options.projectRoot, QWIK_UI_CONFIG_FILENAME);

  tree.write(
    fullConfigPath,
    JSON.stringify({
      componentsRoot: options.componentsRoot,
    }),
  );

  await formatFiles(tree);
}

export default initGenerator;
