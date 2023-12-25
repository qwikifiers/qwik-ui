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
import yargs, { type CommandModule } from 'yargs';
import { styledPackagesMap } from '../src/generators';
import { StyledKit } from '../src/generators/init/styled-kit.enum';
import { QwikUIConfig } from '../types/qwik-ui-config.type';

const COMMANDS = ['init', 'add'];
const listOfCommands = COMMANDS.join(', ');

main();

async function main() {
  console.clear();

  const command = process.argv[2];

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
  const InitCommand: CommandModule = {
    command: 'init',
    describe: 'Initialize Qwik UI',
    builder: (yargs) =>
      yargs
        .option('projectRoot', {
          description: 'The root of the project (default: "/")',
          type: 'string',
        })
        .option('styledKit', {
          description: 'Preferred styled kit',
          type: 'string',
          choices: [StyledKit.FLUFFY, StyledKit.MINIMAL],
        })
        .option('uiComponentsPath', {
          description: 'Generated components folder',
          type: 'string',
        })
        .option('rootCssPath', {
          description:
            'Global css file location (where you defined your tailwind directives)',
          type: 'string',
        }),
    handler: () => {},
  };

  const args = await parseCommands(InitCommand);

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  await installNx();

  interface InitConfig {
    projectRoot?: string;
    styledKit?: StyledKit;
    uiComponentsPath?: string;
    rootCssPath?: string;
  }

  const config: InitConfig = {
    projectRoot: args['projectRoot'] as string,
    styledKit: args['styledKit'] as StyledKit,
    uiComponentsPath: args['uiComponentsPath'] as string,
    rootCssPath: args['rootCssPath'] as string,
  };

  if (!config.projectRoot) {
    config.projectRoot = cancelable(
      await text({
        message: 'Specify the root of the project (leave empty for "/")',
      }),
    );
  }

  if (!config.styledKit) {
    config.styledKit = cancelable(
      await select({
        message: 'What is your preferred styled kit?',

        options: [
          { label: 'Fluffy', value: StyledKit.FLUFFY },
          { label: 'Minimal', value: StyledKit.MINIMAL },
        ],
        initialValue: 'fluffy',
      }),
    );
  }

  if (!config.uiComponentsPath) {
    config.uiComponentsPath = cancelable(
      await text({
        message: 'UI components folder',
        initialValue: 'src/_components/ui',
      }),
    );
  }

  if (!config.rootCssPath) {
    config.rootCssPath = await collectFileLocationFromUser({
      message:
        'Your global css file location (where you defined your tailwind directives)',
      errorMessageName: 'Global css file',
      initialValue: 'src/global.css',
    });
  }

  // CREATE CONFIG FILE
  execSync(
    `${
      getPackageManagerCommand().exec
    } nx g @qwik-ui/cli:init --interactive false --project-root=${
      config.projectRoot
    } --ui-components-path=${config.uiComponentsPath} --styled-kit=${config.styledKit}`,
    {
      stdio: [0, 1, 2],
    },
  );

  // INSTALL STYLED KIT
  const styledPackage = styledPackagesMap[config.styledKit];

  execSync(`${getPackageManagerCommand().add} ${styledPackage}@latest`, {
    stdio: [0, 1, 2],
  });

  // SETUP TAILWIND
  execSync(
    `${
      getPackageManagerCommand().exec
    } nx g ${styledPackage}:setup-tailwind --interactive false --project-root=${
      config.projectRoot
    }  --root-css-path=${config.rootCssPath}`,
    {
      stdio: [0, 1, 2],
    },
  );
}

async function installNx() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const nxVersion = require('../package.json').dependencies['@nx/devkit'];

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
}

async function handleAdd() {
  if (!existsSync('qwik-ui.config.json')) {
    exitWithError(
      `qwik-ui.config.json not found, please run ${green('qwik-ui init')} first`,
    );
  }
  const config = await readJsonFile<QwikUIConfig>('qwik-ui.config.json');
  const styledPackage = styledPackagesMap[config.styledKit];

  // read config file to collect components and add to description below

  const componentsJsonPath = require.resolve(`${styledPackage}/components.json`);
  const componentsJson = readJsonFile<{
    componentsRoot: string;
    components: {
      name: string;
      type: string;
      componentFolder: string;
      files: string[];
    }[];
  }>(componentsJsonPath);

  const possibleComponents = componentsJson.components;
  const possibleComponentNames = componentsJson.components.map((c) => c.name);
  const componentsMap = componentsJson.components.reduce((acc, curr) => {
    acc[curr.name] = curr;
    return acc;
  }, {} as Record<string, (typeof componentsJson.components)[0]>);

  const AddCommand: CommandModule = {
    command: 'add <components>',
    describe: 'Add components to your project',
    builder: (yargs) =>
      yargs
        .positional('components', {
          description: `Choose which components to add
Options: [${possibleComponentNames.join(', ')}]`,
          type: 'string',
          coerce: (components) => componentTypesFromString(components),
        })
        .option('projectRoot', {
          description: 'The root of the project (default: "/")',
          type: 'string',
          default: '/',
        }),
    handler: () => {},
  };

  function componentTypesFromString(components: string) {
    return components.split(',').map((c) => {
      return componentsMap[c.trim()].type;
    });
  }

  const args = parseCommands(AddCommand);

  let componentsToAdd = args['components'] as string[];
  if (!componentsToAdd) {
    componentsToAdd = cancelable(
      await multiselect({
        message: `Choose which components to add`,
        options: possibleComponents.map((c) => ({
          label: c.name,
          value: c.type,
        })),
      }),
    );
  }
  /*
     
      run the generator with the options as arguments 
      (in the generator, have a map of dependencies per component type to install)
    */

  // CHOOSE COMPONENTS TO ADD

  // GENERATE COMPONENTS
  execSync(
    `${
      getPackageManagerCommand().exec
    } nx g ${styledPackage}:component ${componentsToAdd.join(',')} --interactive false`,
    {
      stdio: [0, 1, 2],
    },
  );
}

function parseCommands(command: CommandModule) {
  return yargs(process.argv.slice(2))
    .strict()
    .scriptName('qwik-ui')
    .usage(bold('Usage: $0 <command> [options]'))
    .demandCommand(1)
    .command(command)
    .help().argv;
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
