import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import componentGenerator, { QWIK_UI_CONFIG_FILENAME } from './component-generator';
import { ComponentGeneratorSchema } from './schema';

const DEFAULT_COMPONENTS_LOCATION = 'src/components/ui';

describe('Component generator', () => {
  function setupWorkspace() {
    const options: ComponentGeneratorSchema = {};
    const tree = createTreeWithEmptyWorkspace();

    tree.write(
      QWIK_UI_CONFIG_FILENAME,
      JSON.stringify({
        componentsRoot: DEFAULT_COMPONENTS_LOCATION,
        styledKit: 'fluffy',
      }),
    );

    return {
      tree,
      options,
    };
  }

  test(`
    GIVEN workspace with a config file
    WHEN generating a button
    THEN it should create the button file in the right place`, async () => {
    const { tree, options } = setupWorkspace();

    options.types = 'button';

    await componentGenerator(tree, options);

    expect(tree.exists(`${DEFAULT_COMPONENTS_LOCATION}/button/button.tsx`)).toBeTruthy();
  });

  test(`
    GIVEN workspace with a config file
    WHEN generating a button and an input
    THEN it should create the button and input files in the right place`, async () => {
    const { tree, options } = setupWorkspace();

    options.types = 'button, input';

    await componentGenerator(tree, options);

    expect(tree.exists(`${DEFAULT_COMPONENTS_LOCATION}/button/button.tsx`)).toBeTruthy();
    expect(tree.exists(`${DEFAULT_COMPONENTS_LOCATION}/input/input.tsx`)).toBeTruthy();
  });
});
