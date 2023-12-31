import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { QWIK_UI_CONFIG_FILENAME } from '../../_shared/config-filenames';
import { initGenerator } from './init-generator';
import { InitGeneratorSchema } from './schema';
describe('init generator', () => {
  function setup() {
    const options: InitGeneratorSchema = {};
    const tree = createTreeWithEmptyWorkspace();

    return {
      tree,
      options,
    };
  }

  test(`
    GIVEN empty options and tree 
    WHEN initGenerator is run
    THEN it should create a config file with the default values`, async () => {
    const { tree, options } = setup();

    await initGenerator(tree, options);

    const expectedContents = tree.read(QWIK_UI_CONFIG_FILENAME, 'utf-8');

    expect(expectedContents).toMatchInlineSnapshot(`
      "{ \\"componentsRoot\\": \\"src/components/ui\\", \\"styledKit\\": \\"fluffy\\" }
      "
    `);
  });

  test(`
    GIVEN project root of "/my-project" 
    WHEN initGenerator is run
    THEN it should create the config file inside my-project`, async () => {
    const { tree, options } = setup();

    options.projectRoot = '/my-project';
    await initGenerator(tree, options);

    expect(tree.exists('my-project/qwik-ui.config.json')).toBeTruthy();
  });
});
