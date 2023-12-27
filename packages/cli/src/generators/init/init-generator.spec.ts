import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { QWIK_UI_CONFIG_FILENAME, initGenerator } from './init-generator';
import * as installStyleKitModule from './install-styled-kit';
import { InitGeneratorSchema } from './schema';
import { StyledKit } from './styled-kit.enum';

describe('init generator', () => {
  function setup() {
    const options: InitGeneratorSchema = {};
    const tree = createTreeWithEmptyWorkspace();
    const installStyledKitSpy = jest
      .spyOn(installStyleKitModule, 'installStyledKit')
      .mockReturnValue();

    return {
      tree,
      options,
      installStyledKitSpy,
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
      "{
        \\"componentsRoot\\": \\"src/components/ui\\",
        \\"styledKit\\": \\"fluffy\\",
        \\"rootCssPath\\": \\"src/global.css\\",
        \\"tailwindConfigPath\\": \\"tailwind.config.js\\"
      }
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

  test(`
    GIVEN selected styled kit is "fluffy"
    WHEN initGenerator is run
    THEN it should add the correct package to package.json`, async () => {
    const { tree, options, installStyledKitSpy } = setup();

    options.styledKit = StyledKit.FLUFFY;
    await initGenerator(tree, options);

    expect(installStyledKitSpy).toHaveBeenCalledWith(`@qwik-ui/fluffy`);
  });

  /*
  CHALLENGES TO SOLVE:
  - run "add" generator right after init (use the yargs to know which one)

  */
});
