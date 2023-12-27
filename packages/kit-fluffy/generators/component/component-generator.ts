import { formatFiles, joinPathFragments, readJsonFile, Tree } from '@nx/devkit';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ComponentGeneratorSchema } from './schema';

export const QWIK_UI_CONFIG_FILENAME = 'qwik-ui.config.json';

export async function componentGenerator(tree: Tree, options: ComponentGeneratorSchema) {
  const configContent = tree.read(QWIK_UI_CONFIG_FILENAME, 'utf-8');

  if (!options.types) {
    throw new Error('You must specify at least one component type');
  }
  if (!configContent) {
    throw new Error(`Could not find ${QWIK_UI_CONFIG_FILENAME}`);
  }

  const config = JSON.parse(configContent);

  const componentsRoot = config.componentsRoot;

  if (!componentsRoot) {
    throw new Error(`Could not find componentsRoot in ${QWIK_UI_CONFIG_FILENAME}`);
  }

  const kitRoot = joinPathFragments(__dirname, '..', '..');

  const componentsJsonPath = join(kitRoot, 'components.json');

  const componentsJson = readJsonFile<{
    componentsRoot: string;
    components: {
      type: string;
      componentFolder: string;
      files: string[];
    }[];
  }>(componentsJsonPath);

  const componentTypes = componentsJson.components.map((component) => component.type);

  if (componentTypes.indexOf(options.types) === -1) {
    throw new Error(`${options.types} is not a registered component.
Please file an issue if you want it to be implemented.`);
  }

  const selectedComponent = componentsJson.components.find(
    (component) => component.type === options.types,
  );
  if (!selectedComponent) {
    throw new Error(`Could not find ${options.types} in ${componentsJsonPath}`);
  }

  selectedComponent.files.forEach((file: string) => {
    const filePath = joinPathFragments(
      kitRoot,
      componentsJson.componentsRoot,
      selectedComponent.componentFolder,
      file,
    );
    const fileContent = readFileSync(filePath, 'utf-8');
    if (!fileContent) {
      throw new Error(`Could not read ${filePath}`);
    }
    const newFilePath = joinPathFragments(
      componentsRoot,
      selectedComponent.componentFolder,
      file,
    );

    tree.write(newFilePath, fileContent);
  });

  await formatFiles(tree);
}

export default componentGenerator;
