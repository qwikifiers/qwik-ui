import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import componentGenerator, { QWIK_UI_CONFIG_FILENAME } from './component-generator';
import { ComponentGeneratorSchema } from './schema';

const DEFAULT_COMPONENTS_LOCATION = 'src/_components/ui';

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
    GIVEN empty workspace
    WHEN generating a button
    THEN it should place the proper button files in the right place`, async () => {
    const { tree, options } = setupWorkspace();

    options.type = 'button';

    await componentGenerator(tree, options);

    expect(tree.exists(`${DEFAULT_COMPONENTS_LOCATION}/button/button.tsx`)).toBeTruthy();
  });
});
