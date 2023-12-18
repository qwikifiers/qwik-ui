#!/usr/bin/env node

/*
STEPS

1. Check for the "init" command

  1. Check if nx is present (package.json? nx.json?)

  2. If it isn't present, run nx@latest init

  3. IF it is present (or after installation), run the rest of the init command

  4. Ask questions about component locations etc (css vars?)

  5. create the necessary files

2. Check for the "add" command

  2.1 run the correct generator

*/

import {
  cancel,
  confirm,
  intro,
  isCancel,
  log,
  outro,
  select,
  spinner,
  text,
} from '@clack/prompts';
import { getPackageManagerCommand, workspaceRoot } from '@nx/devkit';
import { execSync } from 'child_process';
import { green, red } from 'kleur/colors';
import { styledPackagesMap } from '../src/generators';
import { StyledKit } from '../src/generators/init/styled-kit.enum';

async function main() {
  const command = process.argv[2]; // TODO: use libraries like yargs or enquirer to set your workspace name
  if (!command) {
    log.error(
      `A command is missing, please choose one of the following commands: ${green(
        'init',
      )}`,
    );
    cancel();
    process.exit(1);
  }

  intro('🐨 Fluffy');

  if (command === 'init') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const nxVersion = require('../package.json').dependencies['@nx/devkit'];

    log.info(`Version: ${nxVersion}`);

    // TODO: CHECK IF NX.JSON EXISTS

    const haveNxInstalled = cancelable(
      await confirm({
        message: 'Do you already have Nx installed? (required)',
        initialValue: false,
      }),
    );

    if (!haveNxInstalled) {
      const initSpinner = spinner();
      initSpinner.start('Installing Nx...');
      execSync(`npx --yes nx@${nxVersion} init --interactive false`, {
        stdio: [0, 1, 2],
      });
      initSpinner.stop('Installed Nx!');
    }
    log.success('nx init done');

    const projectRoot = cancelable(
      await text({
        message: 'Specify the root of the project (leave empty for "/")',
      }),
    );

    const tailwindConfigPath = cancelable(
      await text({
        message: 'Tailwind config location',
        initialValue: './tailwind.config.js',
      }),
    );

    const rootCssPath = cancelable(
      await text({
        message:
          'Your global css file location (where you defined your tailwind directives)',
        initialValue: 'src/global.css',
      }),
    );

    const uiComponentsPath = cancelable(
      await text({
        message: 'UI components folder',
        initialValue: 'src/_components/ui',
      }),
    );

    const selectedStyledKit = cancelable(
      await select({
        message: 'What is your preferred styled kit?',

        options: [
          { label: 'Fluffy', value: StyledKit.FLUFFY },
          { label: 'Minimal', value: StyledKit.MINIMAL },
        ],
        initialValue: 'fluffy',
      }),
    );

    /*
      
      1. Collect options from user
        * Project root (default: root /)
        * tailwind config location (default: ./tailwind.config.js)
        * global css location (default: ./src/global.css)

    */

    // CREATE CONFIG FILE
    execSync(
      `${
        getPackageManagerCommand().exec
      } nx g @qwik-ui/cli:init --interactive false --project-root=${projectRoot} --ui-components-path=${uiComponentsPath} --styled-kit=${selectedStyledKit}`,
      {
        stdio: [0, 1, 2],
      },
    );

    // INSTALL STYLED KIT
    const styledPackage = styledPackagesMap[selectedStyledKit];

    execSync(`${getPackageManagerCommand().add} ${styledPackage}@latest`, {
      stdio: [0, 1, 2],
    });

    // SETUP TAILWIND
    execSync(
      `${
        getPackageManagerCommand().exec
      } nx g ${styledPackage}:setup-tailwind --interactive false  --tailwind-config-path=${tailwindConfigPath} --root-css-path=${rootCssPath}`,
      {
        stdio: [0, 1, 2],
      },
    );

    // RUN ADD COMMAND
  } else if (command === 'add') {
    /*
      Collect options from user (which components to generate)
      run the generator with the options as arguments 
      (in the generator, have a map of dependencies per component type to install)
    */

    // READ CONFIG FILE TO GET OPTIONS
    // WRAP LOGIC INTO A FUNCTION THAT ACCEPTS PARAMS SO IT COULD RUN FROM INIT AS WELL

    // CHOOSE COMPONENTS TO ADD

    // GENERATE COMPONENTS
    execSync(
      `${
        getPackageManagerCommand().exec
      } nx g ${styledPackage}:component --interactive false`,
      {
        stdio: [0, 1, 2],
      },
    );
  } else {
    log.error(
      `Invalid command: ${red(command)}
Please choose one of the following commands: ${green('init')}`,
    );
    cancel();
    process.exit(1);
  }

  outro('Successfully initialized fluffy');
}

main();

export function getCwd(): string {
  return process.env.INIT_CWD?.startsWith(workspaceRoot)
    ? process.env.INIT_CWD
    : process.cwd();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cancelable(result: any) {
  if (isCancel(result)) {
    cancel('Operation canceled');
    process.exit(0);
  }
  return result;
}
