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
  multiselect,
  outro,
  select,
  spinner,
  text,
} from '@clack/prompts';
import { getPackageManagerCommand, readJsonFile, workspaceRoot } from '@nx/devkit';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { bold, green, red } from 'kleur/colors';
import yargs from 'yargs';
import { styledPackagesMap } from '../src/generators';
import { StyledKit } from '../src/generators/init/styled-kit.enum';
import { QwikUIConfig } from '../types/qwik-ui-config.type';

interface Args {
  [x: string]: unknown;
  command?: string;
}

const COMMANDS = ['init', 'add'];
const listOfCommands = COMMANDS.join(', ');

async function main() {
  const possibleComponents = [
    'button',
    'input',
    'checkbox',
    'radio',
    'select',
    'textarea',
  ];

  const componentsToAdd = cancelable(
    await multiselect({
      message: `Choose which components to add`,
      options: possibleComponents.map((c) => ({
        label: capitalizeFirstLetter(c),
        value: c,
      })),
    }),
  );

  console.log('componentsToAdd', componentsToAdd);

  const command = process.argv[2];
  const args = yargs(process.argv.slice(2))
    .strict()
    .scriptName('qwik-ui')
    .usage(bold('Usage: $0 <command> [options]'))
    .demandCommand(1)
    .command('init', 'Initialize Qwik UI', (yargs) =>
      yargs
        .positional('components', {
          description: 'Choose which components to add',
          type: 'string',
          coerce: (components) => components.split(',').map((c) => c.trim()),
        })
        .option('projectRoot', {
          description: 'The root of the project (default: "/")',
          type: 'string',
          default: '/',
        })
        .option('styledKit', {
          description: 'What is your preferred styled kit',
          type: 'string',
          default: StyledKit.FLUFFY,
        }),
    )
    .command('add <components>', 'Add components to your project', (yargs) =>
      yargs
        .positional('components', {
          description: 'Choose which components to add',
          type: 'string',
          coerce: (components) => components.split(',').map((c) => c.trim()),
        })
        .option('projectRoot', {
          description: 'The root of the project (default: "/")',
          type: 'string',
          default: '/',
        }),
    )
    .help().argv;

  if (!command) {
    exitWithError(
      `A command is missing, please choose one of the following commands: ${green(
        listOfCommands,
      )}`,
    );
  }

  intro('🐨 Qwik UI');

  if (command === 'init') {
    await handleInit();
  } else if (command === 'add') {
    await handleAdd();
  } else {
    exitWithError(
      `Invalid command: ${red(command)}
Please choose one of the following commands: ${green(listOfCommands)}`,
    );
  }
  outro('Successfully initialized fluffy');
}

main();

function exitWithError(message: string) {
  log.error(message);
  cancel();
  process.exit(1);
}

export function getCwd(): string {
  return process.env.INIT_CWD?.startsWith(workspaceRoot)
    ? process.env.INIT_CWD
    : process.cwd();
}

async function handleInit() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const nxVersion = require('../package.json').dependencies['@nx/devkit'];

  log.info(`Version: ${nxVersion}`);

  if (existsSync('nx.json')) {
    log.info('seems like nx.json already exists. cool!');
  } else {
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
  }

  const projectRoot = cancelable(
    await text({
      message: 'Specify the root of the project (leave empty for "/")',
    }),
  );

  const tailwindConfigPath = await collectFileLocationFromUser({
    message: 'Your tailwind config file location',
    errorMessageName: 'Tailwind config file',
    initialValue: './tailwind.config.js',
  });

  const rootCssPath = await collectFileLocationFromUser({
    message: 'Your global css file location (where you defined your tailwind directives)',
    errorMessageName: 'Global css file',
    initialValue: 'src/global.css',
  });

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
    } nx g ${styledPackage}:setup-tailwind --interactive false --tailwind-config-path=${tailwindConfigPath} --root-css-path=${rootCssPath}`,
    {
      stdio: [0, 1, 2],
    },
  );
}

async function handleAdd() {
  /*
      Collect options from user (which components to generate)
      run the generator with the options as arguments 
      (in the generator, have a map of dependencies per component type to install)
    */

  // READ CONFIG FILE TO GET OPTIONS
  // WRAP LOGIC INTO A FUNCTION THAT ACCEPTS PARAMS SO IT COULD RUN FROM INIT AS WELL

  // CHOOSE COMPONENTS TO ADD

  if (!existsSync('qwik-ui.config.json')) {
    exitWithError(
      `qwik-ui.config.json not found, please run ${green('qwik-ui init')} first`,
    );
  }
  const config = await readJsonFile<QwikUIConfig>('qwik-ui.config.json');
  const styledPackage = styledPackagesMap[config.styledKit];

  // GENERATE COMPONENTS
  execSync(
    `${
      getPackageManagerCommand().exec
    } nx g ${styledPackage}:component --interactive false`,
    {
      stdio: [0, 1, 2],
    },
  );
}

interface FilePromptInfo {
  message: string;
  errorMessageName: string;
  initialValue?: string;
}

async function collectFileLocationFromUser(config: FilePromptInfo) {
  const filePath = cancelable(
    await text({
      message: config.message,
      initialValue: config.initialValue,
    }),
  );

  if (!existsSync(filePath)) {
    log.error(`${config.errorMessageName} not found at ${filePath}, want to try again?`);
    return collectFileLocationFromUser({ ...config, initialValue: filePath });
  }
  return filePath;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cancelable(result: any) {
  if (isCancel(result)) {
    cancel('Operation canceled');
    process.exit(0);
  }
  return result;
}

function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
