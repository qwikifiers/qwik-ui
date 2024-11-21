import { formatFiles, joinPathFragments, readJsonFile, Tree } from '@nx/devkit';
import { readFileSync } from 'fs';
import { join } from 'path';
import {
  COMPONENTS_REGISTRY_FILENAME,
  QWIK_UI_CONFIG_FILENAME,
} from '../../_shared/config-filenames';
import { getKitRoot } from '../../_shared/get-kit-root';
import { ComponentGeneratorSchema } from './schema';

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

  const kitRoot = getKitRoot();

  const componentsJsonPath = join(kitRoot, COMPONENTS_REGISTRY_FILENAME);

  const componentsRegistry = readJsonFile<{
    componentsRoot: string;
    components: ComponentConfig[];
  }>(componentsJsonPath);

  const allComponentTypes = componentsRegistry.components.map(
    (component) => component.type,
  );
  const requestedComponents = options.types.split(',');

  // generate barrel file if does not exist
  const barrelPath = outputComponentsFolder + '/index.ts';
  if (!tree.exists(barrelPath)) {
    tree.write(barrelPath, '');
  }

  let barrelContentToAppend = '';

  requestedComponents.forEach((component) => {
    const indexOfComponent = allComponentTypes.indexOf(component.trim());
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

    specificComponentConfig.files.map((file) => {
      barrelContentToAppend += `export * from './${specificComponentConfig.componentFolder}/${file.split('.')[0]}';\n`;
    });
  });

  // update barrel file
  const barrelContent = tree.read(barrelPath, 'utf-8');
  if (barrelContent !== '' && barrelContent.slice(-1) !== '\n') {
    barrelContentToAppend = '\n' + barrelContentToAppend;
  }
  tree.write(barrelPath, barrelContent + barrelContentToAppend);

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
