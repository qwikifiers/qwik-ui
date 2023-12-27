import { formatFiles, joinPathFragments, readJsonFile, Tree } from '@nx/devkit';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ComponentGeneratorSchema } from './schema';

export const QWIK_UI_CONFIG_FILENAME = 'qwik-ui.config.json';

interface ComponentConfig {
  displayName: string;
  type: string;
  componentFolder: string;
  files: string[];
}

export async function componentGenerator(tree: Tree, options: ComponentGeneratorSchema) {
  const configContent = tree.read(QWIK_UI_CONFIG_FILENAME, 'utf-8');

  if (!options.types) {
    throw new Error('You must specify at least one component type');
  }
  if (!configContent) {
    throw new Error(`Could not find ${QWIK_UI_CONFIG_FILENAME}`);
  }

  const config = JSON.parse(configContent);

  const outputComponentsFolder = config.componentsRoot;

  if (!outputComponentsFolder) {
    throw new Error(`Could not find componentsRoot in ${QWIK_UI_CONFIG_FILENAME}`);
  }

  const kitRoot = joinPathFragments(__dirname, '..', '..', '..');

  const componentsJsonPath = join(kitRoot, 'components.json');

  const componentsRegistry = readJsonFile<{
    componentsRoot: string;
    components: ComponentConfig[];
  }>(componentsJsonPath);

  const componentTypes = componentsRegistry.components.map((component) => component.type);
  const requestedComponents = options.types.split(',');

  requestedComponents.forEach((component) => {
    const indexOfComponent = componentTypes.indexOf(component.trim());
    if (indexOfComponent === -1) {
      throw new Error(`${component} is not a registered component.
Please file an issue if you want it to be implemented.`);
    }
    const specificComponentConfig = componentsRegistry.components[indexOfComponent];

    const componentTemplateBasePath = join(
      kitRoot,
      componentsRegistry.componentsRoot,
      specificComponentConfig.componentFolder,
    );

    const outputComponentBasePath = join(
      outputComponentsFolder,
      specificComponentConfig.componentFolder,
    );

    generateComponent(
      tree,
      componentTemplateBasePath,
      outputComponentBasePath,
      specificComponentConfig.files,
    );
  });

  await formatFiles(tree);
}

export default componentGenerator;

function generateComponent(
  tree: Tree,
  baseComponentTemplatePath: string,
  outputComponentBasePath: string,
  templateFiles: string[],
) {
  templateFiles.forEach((file: string) => {
    const filePath = joinPathFragments(baseComponentTemplatePath, file);
    const fileContent = readFileSync(filePath, 'utf-8');
    if (!fileContent) {
      throw new Error(`Could not read ${filePath}`);
    }
    const newFilePath = joinPathFragments(outputComponentBasePath, file);

    tree.write(newFilePath, fileContent);
  });
}
